import Recipe from "../models/Recipe.js"

const getAllRecipes = async (req, res) => {
    try {
        let recipes = await Recipe.find()
        recipes = recipes.map((item) => {
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                ingredients: item.ingredients,
                instructions: item.instructions,
                images: item.images,
            }
        })
        res.status(200).json({ message: recipes })
    } catch (error) {
        console.log(error)
        res.send(404)
    }
}

const getRandomRecipe = async (req, res) => {
    try {
        const randomRecipe = await Recipe.aggregate([{ $sample: { size: 1 } }])
        res.status(200).json(randomRecipe)
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }
}

const getRecipeById = async (req, res) => {
    const { id } = req.params
    try {
        const recipeById = await Recipe.findById(id)
        res.status(200).json({ message: recipeById })
    } catch (error) {
        res.status(404).json({ message: "No such recipe" })
    }
}

const createRecipe = async (req, res) => {
    const recipe = req.body
    try {
        const createdRecipe = await Recipe.create(recipe)
        res.status(201).json({ message: createdRecipe })
    } catch (err) {
        res.sendStatus(500)
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
