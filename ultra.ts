import { resolve } from "https://deno.land/std@0.176.0/path/win32.ts";
import { esbuild, getMimeType, Hono, slash } from "./deps.ts";
import * as importmap from "./importmap.ts";
import Logger from "./log.ts";
import * as util from "./util.ts";

type FetchFileResult = {
  path: string;
  file: Uint8Array;
  mimeType: string;
} | null;

export default class Ultra {
  public hono = new Hono();
  public importMap?: importmap.ImportMap;
  public vendorImportMap?: importmap.ImportMap;

  public get = this.hono.get.bind(this.hono);
  public post = this.hono.post.bind(this.hono);
  public put = this.hono.put.bind(this.hono);
  public patch = this.hono.patch.bind(this.hono);
  public delete = this.hono.delete.bind(this.hono);
  public all = this.hono.all.bind(this.hono);
  public use = this.hono.use.bind(this.hono);

  static log = new Logger("DEBUG");

  constructor({
    importMap,
  }: {
    importMap?: string;
  } = {}) {
    this.importMap = importmap.getImportMap(importMap);
  }

  public async fetchFile(url: string): Promise<FetchFileResult> {
    const resolvedURL = resolve(Deno.cwd() + new URL(url).pathname);
    if (!resolvedURL) {
      return null;
    }
    // Prevent access to files outside of the current working directory
    if (!resolvedURL.startsWith(Deno.cwd())) {
      return null;
    }
    // Prevent access to files outside of the public/client/vendor directories
    // Todo: make this configurable
    // Todo: parse entry point module graph and allow all files in the graph
    const path = slash(resolvedURL.replace(Deno.cwd(), ""));
    const possibleDirectories = [
      "/public",
      "/client",
      "/.ultra/vendor",
      "./ultra/public",
      "./ultra/client",
    ];
    if (!possibleDirectories.some((directory) => path.startsWith(directory))) {
      return null;
    }
    // Fetch the file.
    const file = await util.safeAsync(() => Deno.readFile(resolvedURL));
    if (file instanceof Error) {
      return null;
    }
    const mimeType = getMimeType(resolvedURL) ?? "text/plain";
    return {
      path,
      file,
      mimeType,
    };
  }

  public serveStatic() {
    this.hono.use(async (ctx, next) => {
      const file = await this.fetchFile(ctx.req.raw.url);
      if (file) {
        Ultra.log.info(`Static: Serving ${file.path}`);
        return new Response(file.file, {
          headers: {
            "content-type": file.mimeType,
          },
        });
      }
      await next();
    });
  }

  public serveCompiler() {
    this.hono.use(async (ctx, next) => {
      // starts with '/🛠️/' :D
      if (
        !new URL(ctx.req.url).pathname.startsWith(`/%F0%9F%9B%A0%EF%B8%8F/`)
      ) {
        await next();
        return;
      }
      // Path without the emoji
      const path = slash(ctx.req.url.replace(`/%F0%9F%9B%A0%EF%B8%8F`, ""));
      const file = await this.fetchFile(path);
      if (!file) {
        await next();
        return;
      }
      // default compiler
      const code = new TextDecoder().decode(file.file);
      const result = await util.safeAsync(() => {
        return esbuild.transform(code, {
          loader: "tsx",
          format: "esm",
          target: "es2018",
          jsx: "automatic",
          jsxImportSource: "ultra",
        });
      });
      if (result instanceof Error) {
        await next();
        return;
      }
      Ultra.log.info(`Compiler: Serving ${file.path}`);
      return new Response(result.code, {
        headers: {
          "content-type": "application/javascript",
        },
      });
    });
  }

  public start({ port }: { port?: number } = {}) {
    Ultra.log.success(`Ultra is running on http://localhost:${port ?? 8000}`);
    Deno.serve({ port: port ?? 8000, handler: this.hono.fetch });
  }
}
