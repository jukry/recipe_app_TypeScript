import express from "express"
const recipesRouter = express.Router()
import Recipe from "../models/Recipe.js"

recipesRouter.get("/", async (req, res) => {
    res.send("HELLO")
    res.status(200)
})

recipesRouter.post("/", async (req, res) => {
    const recipe = req.body
    console.log("RESEPTI", recipe)
    try {
        console.log("TRY POST")
        const resu = await Recipe.create(recipe)
        res.send(resu)
    } catch (err) {
        console.log("ERROR POST")
        res.status(500).send(err)
    }
})

export default recipesRouter
