import { parse } from "npm:node-html-parser";
import * as denoGraph from "https://deno.land/x/deno_graph/mod.ts";
import { toFileUrl } from "https://deno.land/std/path/mod.ts";
import slash from "https://deno.land/x/slash/mod.ts";
import { fromFileUrl } from "https://deno.land/std@0.176.0/path/win32.ts";
import { join } from "https://deno.land/std@0.193.0/path/win32.ts";

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

function isExternalUrl(path: string) {
  if (!path) return false;
  return path.startsWith("http://") || path.startsWith("https://");
}

/*
./path/to/file
/@compiler/path/to/file
https://example.com/path/to/file
/.ultra/vendor/path/to/file
*/

export default async function injectHtmlDeps(
  html: string,
  strategy: HtmlDependencyGraphAdaptor,
): Promise<string> {
  const htmlRoot = parse(html);
  const scripts = htmlRoot.querySelectorAll("script");
  const dependencies = scripts.map((script) => script.attributes.src);

  const dependencyCollection: string[] = [];

  for await (let dependency of dependencies) {
    if (!dependency) continue;
    const resolved = await strategy.graph(dependency);
    for (const dep of resolved) {
      dependencyCollection.push(dep);
    }
  }
  const tagCollection: string[] = [];
  for (const dep of dependencyCollection) {
    tagCollection.push(`<link rel="modulepreload" href="${dep}">`);
  }
  return html.replace("</head>", tagCollection.join("\n") + "</head>");
}

interface HtmlDependencyGraphAdaptor {
  graph(path: string): Promise<string[]>;
}

export class UltraHtmlDependencyInjectorStrategy
  implements HtmlDependencyGraphAdaptor {
  importMap: ImportMap;
  deps: string[];
  constructor(importMap: ImportMap, deps: string[] = []) {
    this.importMap = importMap;
    this.deps = deps;
  }

  graph = async (path: string): Promise<string[]> => {
    let isExternal = false;
    let isCompiled = false;

    let resolvedPath = path;

    if (isExternalUrl(path)) {
      isExternal = true;
    } else {
      if (path.startsWith("/@compiler")) {
        isCompiled = true;
        resolvedPath = path.replace("/@compiler", "");
      }
      resolvedPath = toFileUrl(join(Deno.cwd(), resolvedPath)).toString();
    }

    const graph = await denoGraph.createGraph(
      resolvedPath,
      {
        resolve: (specifier: string, referrer: string): string => {
          if (
            this.importMap && this.importMap.imports &&
            this.importMap.imports[specifier]
          ) {
            return toFileUrl(
              join(Deno.cwd(), this.importMap.imports[specifier]!),
            ).toString();
          }
          return new URL(specifier, referrer).href;
        },
      },
    );

    const array = []
    for (const module of graph.modules) {
      if (isExternal) {
        array.push(module.specifier);
        continue;
      }
      let isVendored = slash(
        fromFileUrl(module.specifier).replace(Deno.cwd(), ""),
      ).startsWith("/.ultra/vendor");
      let prefix = "";
      if (isCompiled && !isVendored) {
        prefix = "/@compiler";
      }
      array.push(
        prefix + slash(fromFileUrl(module.specifier).replace(Deno.cwd(), "")),
      );
    }
    return array;
  };
}
