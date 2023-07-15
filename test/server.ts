import Ultra from "ultra"

const app = new Ultra()
app.serveStatic()
app.serveCompiler()

app.start()


