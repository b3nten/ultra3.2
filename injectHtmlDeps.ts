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

export default async function injectHtmlDeps(
  html: string,
  strategy: HtmlDependencyGraphAdaptor,
): Promise<string> {
  const root = parse(html);
  const scripts = root.querySelectorAll("script");
  const dependencies = scripts.map((script) => script.attributes.src);

  const allDeps: string[] = [];

  for await (let dependency of dependencies) {
    if (!dependency) continue;
    const resolved = await strategy.graph(dependency);
    for (const dep of resolved) {
      allDeps.push(dep);
    }
  }
  const tags: string[] = [];
  for (const dep of allDeps) {
    tags.push(`<link rel="modulepreload" href="${dep}">`);
  }
  return html.replace("</head>", tags.join("\n") + "</head>");
}

interface HtmlDependencyGraphAdaptor {
  graph(path: string): Promise<string[]>;
}

export class DenoHtmlDependencyGraphAdaptor
  implements HtmlDependencyGraphAdaptor {
  importMap: ImportMap;
  constructor(importMap: ImportMap) {
    this.importMap = importMap;
  }
  graph = async (path: string): Promise<string[]> => {
    const resolvedPath = isExternalUrl(path)
      ? path
      : toFileUrl(join(Deno.cwd(), path)).toString();
    const graph = await denoGraph.createGraph(
      resolvedPath,
      {
        resolve: (specifier: string, referrer: string): string => {
          if (isExternalUrl(specifier)) return specifier;
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
    console.log({ graph });
    const array = [];
    for (const module of graph.modules) {
      if (isExternalUrl(module.specifier)) {
        array.push(module.specifier);
        continue;
      }
      array.push(slash(fromFileUrl(module.specifier).replace(Deno.cwd(), "")));
    }
    return array;
  };
}
