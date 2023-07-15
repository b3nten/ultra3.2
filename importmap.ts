import * as util from "./util.ts";

interface SpecifierMap {
  [url: string]: string | null;
}
interface Scopes {
  [url: string]: SpecifierMap;
}
export interface ImportMap {
  imports?: SpecifierMap;
  scopes?: Scopes;
}

export function getImportMap(
  path?: string,
): ImportMap | undefined {
  let importMapInternal: ImportMap | undefined;
  path && util.safe(() => {
    importMapInternal = JSON.parse(Deno.readTextFileSync("./import_map.json"));
  });
  !importMapInternal && util.safe(() => {
    importMapInternal = JSON.parse(Deno.readTextFileSync("./import_map.json"));
  });
  !importMapInternal && util.safe(() => {
    importMapInternal = JSON.parse(Deno.readTextFileSync("./importMap.json"));
  });
  !importMapInternal && util.safe(() => {
    const config = Deno.readTextFileSync("./deno.json");
    importMapInternal = JSON.parse(config).importMap;
  });
  !importMapInternal && util.safe(() => {
    const config = JSON.parse(Deno.readTextFileSync("./deno.jsonc"));
    importMapInternal = { imports: config.imports };
  });
  return importMapInternal;
}

export function addDependencies(
  importMap: ImportMap,
  dependencies: SpecifierMap,
): ImportMap {
  if (!importMap.imports) {
    importMap.imports = {};
  }
  for (const [key, value] of Object.entries(dependencies)) {
    importMap.imports[key] = value;
  }
  return importMap;
}

export function deleteDependencies(
	importMap: ImportMap,
	dependencies: string[],
): ImportMap {
	if (!importMap.imports) {
		return importMap;
	}
	for (const dependency of dependencies) {
		delete importMap.imports[dependency];
	}
	return importMap;
}