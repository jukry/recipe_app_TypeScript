import express from "express"
const recipesRouter = express.Router()
import Recipe from "../models/Recipe.js"

// get all recipes
recipesRouter.get("/", async (req, res) => {
    const recipes = await Recipe.find()
    res.status(200).json(
        recipes.map((item) => {
            return [
                item.name,
                item.description,
                item.ingredients,
                item.instructions,
            ]
        })
    )
})

// get random recipe
recipesRouter.get("/random", async (req, res) => {
    const randomRecipe = await Recipe.aggregate([{ $sample: { size: 1 } }])
    res.status(200).json(randomRecipe)
})

// create a new recipe
recipesRouter.post("/", async (req, res) => {
    const recipe = req.body
    try {
        const resu = await Recipe.create(recipe)
        res.send(resu)
    } catch (err) {
        res.status(500).send(err)
    }
})

// delete a recipe by id
recipesRouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        await Recipe.findById(id).deleteOne()
        console.log(`Document ${id} removed`)
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }
    res.sendStatus(200)
})

export default recipesRouter
