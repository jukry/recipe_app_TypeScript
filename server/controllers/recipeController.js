import Recipe from "../models/Recipe.js"
import User from "../models/User.js"

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
    const userId = req.user.id
    const { user } = req.body
    if (userId !== user) {
        return res.status(400).json({ Message: "Not authorized" })
    }

    try {
        const createdRecipe = await Recipe.create(recipe)
        await User.findOneAndUpdate(
            { _id: user }, //filter
            { $push: { recipes: createdRecipe._id.toString() } } //update
        )
        res.status(201).json({ message: createdRecipe })
    } catch (err) {
        res.status(400).json({
            Message: "Something went wrong, please check your input",
        })
    }
}

const deleteRecipe = async (req, res) => {
    const { id } = req.params
    const userId = req.user.id
    const recipe = await Recipe.findById(id)
    if (!recipe) {
        return res.status(404).json({ Message: `No recipe with id ${id}` })
    }

    if (userId !== recipe.user.toString()) {
        return res.status(400).json({ Message: "Not authorized" })
    }

    try {
        await Recipe.findById(id).deleteOne()
        return res.status(200).json({ Message: `Document ${id} removed` })
    } catch (error) {
        return res.status(400).json({ Message: "Bad request" })
    }
}

const updateRecipe = async (req, res) => {
    const { id } = req.params
    const updated = req.body
    const userId = req.user.id
    const recipe = await Recipe.findById(id)

    if (!recipe) {
        return res.status(404).json({ Message: `No recipe with id ${id}` })
    }

    if (userId !== recipe.user.toString()) {
        return res.status(400).json({ Message: "Not authorized" })
    }

    try {
        await Recipe.findById(id).updateOne({ $set: updated })
        return res.status(200).json({ Message: "Recipe updated" })
    } catch (error) {
        return res.status(400).json({ Message: "Bad request" })
    }
}

export {
    getAllRecipes,
    getRandomRecipe,
    getRecipeById,
    createRecipe,
    deleteRecipe,
    updateRecipe,
}
