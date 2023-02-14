import express from "express"
import livereload from "connect-livereload"

const app = express()

app.get("/", (req, res) => res.send("Hello ssWorld"))

const port = process.env.port || 8082

app.listen(port, () => console.log(`Server running on port ${port}`))
