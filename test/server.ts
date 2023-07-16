import Ultra from "ultra";

const app = new Ultra();

app.serveStatic();
app.serveCompiler();

app.get("/", async () => {
  const markup = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
	<title>Ultra</title>
	<script type="module" src="https://cdn.skypack.dev/react"></script>
	<script type="module" src="https://cdn.skypack.dev/react-dom"></script>
	</head>
	<body>
	<div id="root"></div>
	</body>
	</html>
	`;
  const final = await app.injectHtmlDeps(app.injectImportMap(markup));
  return new Response(final, {
    headers: {
      "content-type": "text/html",
    },
  });
});

app.start();
