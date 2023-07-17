import parseImports from "npm:parse-imports";
import slash from "https://deno.land/x/slash/mod.ts";
import {
  basename,
  dirname,
  extname,
  fromFileUrl,
  join,
  relative,
  resolve,
  toFileUrl,
} from "https://deno.land/std@0.176.0/path/mod.ts";

const headers = new Headers({
  "user-agent":
    "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
});

interface SpecifierMap {
  [url: string]: string | null;
}

interface Scopes {
  [url: string]: SpecifierMap;
}

interface ImportMap {
  imports?: SpecifierMap;
  scopes?: Scopes;
}

function isExternalUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

function urlToVendorPath(path: string, vendorPath: string) {
  const url = new URL(path);
  // if no extension, it's a facade. We add /index.js to the end
  if (!extname(url.pathname)) {
    return `${vendorPath}/${url.host}${url.pathname}/index.js`;
  }
  return `${vendorPath}/${url.host}${url.pathname}`;
}

function ensureRelative(path: string) {
  if (path.startsWith("/")) {
    return "." + path;
  } else if (!path.startsWith("./") && !path.startsWith("../")) {
    return "./" + path;
  }
  return path;
}

function replaceInQuotes(input: string, target: string, replacement: string) {
  const doubleQuotesRegex = new RegExp(`"${target}"`);
  const singleQuotesRegex = new RegExp(`'${target}'`);
  let result = input.replace(doubleQuotesRegex, `"${replacement}"`);
  result = result.replace(singleQuotesRegex, `'${replacement}'`);
  return result;
}

async function vendorModule(path: string, vendorPath: string) {
  // if the path is already vendored, return
  try {
    await Deno.stat(urlToVendorPath(path, vendorPath));
    return urlToVendorPath(path, vendorPath);
  } catch { /* continue */ }

  console.log("Vendoring", path, "to", urlToVendorPath(path, vendorPath));

  // get the module contents
  const module = await fetch(path, { headers });
  if (!module.ok) throw new Error(`Unable to fetch module ${path}`);
  let moduleText = await module.text();

  // parse the module for imports
  for await (const module of await parseImports(moduleText)) {
    // importedModulePath is the path of the imported module
    const importedModulePath = module.moduleSpecifier.value!;
    if (!importedModulePath) continue;
    // Path is external
    if (isExternalUrl(importedModulePath)) {
      const currentModuleVendorPath = urlToVendorPath(path, vendorPath);
      const externalModuleVendorPath = urlToVendorPath(
        importedModulePath,
        vendorPath,
      );
      const relativePath = slash(
        relative(dirname(currentModuleVendorPath), externalModuleVendorPath),
      );
      moduleText = moduleText.replace(importedModulePath, relativePath);
      await vendorModule(importedModulePath, vendorPath);
      // Path is absolute
    } else if (importedModulePath.startsWith("/")) {
      const moduleUrl = new URL(path).origin + importedModulePath;
      const currentModuleVendorPath = urlToVendorPath(moduleUrl, vendorPath);
      const absoluteModuleVendorPath = urlToVendorPath(path, vendorPath);
      const relativePath = slash(
        ensureRelative(
          relative(dirname(absoluteModuleVendorPath), currentModuleVendorPath),
        ),
      );
      moduleText = replaceInQuotes(
        moduleText,
        importedModulePath,
        relativePath,
      );
      await vendorModule(moduleUrl, vendorPath);
    }
  }

  let targetPath = urlToVendorPath(path, vendorPath);
  const folderPath = dirname(targetPath);
  await Deno.mkdir(folderPath, { recursive: true });
  const fileName = basename(targetPath);
  await Deno.writeTextFile(folderPath + "/" + fileName, moduleText);
  return targetPath;
}

export default async function vendorImportMap(
  importMap: ImportMap,
  vendorPath: string,
): Promise<ImportMap | undefined> {
  if (!importMap.imports) return;
  if (!vendorPath) throw new Error("vendorPath is required");

  const newImportMap = importMap;

  //TODO: make concurrent
  for await (const [module, specifier] of Object.entries(importMap.imports)) {
    if (!specifier) continue;
    if (isExternalUrl(specifier)) {
      const localPath = await vendorModule(specifier, vendorPath);
      newImportMap.imports![module] = localPath;
    }
  }
  // write the new import map to the vendor folder
  await Deno.writeTextFile(
    join(vendorPath, "import-map.json"),
    JSON.stringify(newImportMap, null, 2),
  );
  return newImportMap;
}
