import Recipe from "../models/Recipe.js"

const getAllRecipes = async (req, res) => {
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
}

const getRandomRecipe = async (req, res) => {
    const randomRecipe = await Recipe.aggregate([{ $sample: { size: 1 } }])
    res.status(200).json(randomRecipe)
}

const getRecipeById = async (req, res) => {
    const { id } = req.params
    try {
        const recipeById = await Recipe.findById(id)
        res.status(200).send(recipeById)
    } catch (error) {
        res.sendStatus(404)
    }
}

const createRecipe = async (req, res) => {
    const recipe = req.body
    try {
        const resu = await Recipe.create(recipe)
        res.send(resu)
    } catch (err) {
        res.status(500).send(err)
    }
}

const deleteRecipe = async (req, res) => {
    const { id } = req.params
    try {
        await Recipe.findById(id).deleteOne()
        console.log(`Document ${id} removed`)
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }
    res.sendStatus(200)
}

const updateRecipe = async (req, res) => {
    const { id } = req.params
    const updated = req.body

    try {
        await Recipe.findById(id).updateOne({ $set: updated })
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }
    res.sendStatus(200)
}

export {
    getAllRecipes,
    getRandomRecipe,
    getRecipeById,
    createRecipe,
    deleteRecipe,
    updateRecipe,
}
