import Ultra from "ultra";

const app = new Ultra();

await app.build()

app.serveStatic();
app.serveCompiler();

app.get("/react", async () => {
	const markup = await Deno.readTextFile("./pages/react.html");
  const final = await app.injectHtmlDeps(app.injectImportMap(markup), ["@ultra/jsx-runtime"]);
  return new Response(final, {
    headers: {
      "content-type": "text/html",
    },
  });
});

app.start();
