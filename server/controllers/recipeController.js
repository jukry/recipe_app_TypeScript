import Recipe from "../models/Recipe.js"
import User from "../models/User.js"
import Comment from "../models/Comment.js"
import { v2 as cloudinary } from "cloudinary"

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
        res.sendStatus(404)
    }
}
const adminGetAllRecipes = async (req, res) => {
    try {
        let recipes = await Recipe.find()
        return res.status(200).json({ message: recipes })
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
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
    const recipeFound = await Recipe.findById(id).select(
        "name description ingredients instructions comments images"
    )
    if (!recipeFound) {
        return res.status(404).json({ Message: "No such recipe" })
    }
    try {
        return res.status(200).json({ message: recipeFound })
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

const uploadRecipeImage = async (file) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    const res = await cloudinary.uploader.upload(
        file,
        { resource_type: "auto" },
        function (error, result) {
            // console.log(error)
            // console.log(result)
        }
    )
    return res
}

const createRecipe = async (req, res) => {
    const recipe = req.body
    const userId = req.user._id.toString()
    const user = req.user

    const newRecipe = {
        name: recipe.name,
        description: recipe.description,
        ingredients: [],
        instructions: [],
    }
    const ingredients = []
    const instructions = []
    function iterateRecipe() {
        for (const [key, value] of Object.entries(recipe)) {
            if (key.includes("amount") && value !== "") {
                ingredients.push({ amount: value })
            } else if (key.includes("ingredient") && value !== "") {
                const id = Number(key.split("ingredient")[1]) - 1

                try {
                    if (!ingredients[id]) {
                        ingredients.push({
                            amount: " ",
                            ingredient: value,
                        })
                    } else {
                        Object.assign(ingredients[id], {
                            ingredient: value,
                        })
                    }
                } catch (err) {
                    console.log(err)
                    return res.status(200).json(err)
                }
            } else if (key.includes("step") && value !== "") {
                instructions.push(value)
            }
        }
    }
    iterateRecipe()
    Object.assign(newRecipe.ingredients, ingredients)
    Object.assign(newRecipe.instructions, instructions)

    if (userId !== user._id.toString()) {
        return res.status(400).json({ Message: "Not authorized" })
    }

    try {
        const createdRecipe = await Recipe.create({
            user: { _id: userId, email: req.user.email },
            name: newRecipe.name,
            description: newRecipe.description,
            ingredients: newRecipe.ingredients,
            instructions: newRecipe.instructions,
            images: recipe.images[0],
        })
        await User.findOneAndUpdate(
            { _id: userId }, //filter
            { $push: { recipes: createdRecipe._id.toString() } } //update
        )
        return res.status(201).json({ message: createdRecipe })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
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

    if (userId !== recipe.user._id.toString()) {
        return res.status(400).json({ Message: "Not authorized" })
    }

    try {
        //delete recipe
        await Recipe.findById(id).deleteOne()
        //get updated recipe array
        const updated = await Recipe.find({ "user._id": userId })
            .select("_id")
            .exec()
        console.log(updated)
        //update user's recipe array
        await User.findOneAndUpdate(
            { _id: userId },
            { $set: { recipes: updated } }
        )
        //delete recipe from user's who have it as favorite
        await User.updateMany(
            { favrecipes: id },
            {
                $pull: {
                    favrecipes: id,
                },
            }
        ).exec()
        //delete comments
        await Comment.find({ recipe: id }).deleteMany()
        return res.status(200).json(updated)
    } catch (error) {
        return res.status(400).json({ Message: "Bad request" })
    }
}

const adminDeleteRecipe = async (req, res) => {
    const { id, userId } = req.body
    const recipe = await Recipe.findById(id)

    if (!recipe) {
        return res.status(404).json({ Message: "No recipe with such id" })
    }
    try {
        //delete recipe
        await Recipe.findById(id).deleteOne()

        //get updated recipe array
        const updated = await Recipe.find({ "user._id": userId })
            .select("_id")
            .exec()
        //update user's recipe array
        await User.findOneAndUpdate(
            { _id: userId },
            { $set: { recipes: updated } }
        )
        //delete recipe from user's who have it as favorite
        await User.updateMany(
            { favrecipes: id },
            {
                $pull: {
                    favrecipes: id,
                },
            }
        ).exec()
        //delete comments
        await Comment.find({ recipe: id }).deleteMany()

        const updatedComments = await Comment.find({
            "user._id": userId,
        }).select("_id")
        await User.findOneAndUpdate(
            {
                _id: userId,
            },
            {
                $set: {
                    comments: updatedComments,
                },
            }
        )

        return res.status(200).json(updated)
    } catch (error) {
        return res.status(400).json({ Message: "Bad request" })
    }
}

const updateRecipe = async (req, res) => {
    const { id } = req.params
    const updated = req.body.formData
    const userId = req.user.id
    const recipe = await Recipe.findById(id)

    if (!recipe) {
        return res.status(404).json({ Message: `No recipe with id ${id}` })
    }

    if (userId !== recipe.user._id.toString()) {
        return res.status(400).json({ Message: "Not authorized" })
    }

    //array for holding used ingredient indexes
    const arrOfIndexes = []
    function iterateRecipe() {
        if (updated.name !== recipe.name && updated.name !== "") {
            recipe.name = updated.name
        }
        if (
            updated.description !== recipe.description &&
            updated.description !== ""
        ) {
            recipe.description = updated.description
        }
        //create object from amount + ingredient
        for (const [key, value] of Object.entries(updated)) {
            if (key.includes("amount")) {
                const ingredientId = Number(key.split("amount")[1]) - 1
                if (
                    value !== "" &&
                    recipe?.ingredients[ingredientId]?.amount &&
                    recipe?.ingredients[ingredientId]?.ingredient
                ) {
                    //if amount is changed on an existing object
                    Object.assign(recipe.ingredients[ingredientId], {
                        amount: value,
                    })
                } else if (value !== "" && recipe.ingredients[ingredientId]) {
                    //if amount is changed of existing object and ingredient is empty
                    Object.assign(recipe.ingredients[ingredientId], {
                        amount: value,
                    })
                } else if (value !== "") {
                    //if amount is given and it is a new ingredient line
                    recipe.ingredients.push({
                        amount: value,
                        ingredient: "",
                    })
                } else if (value === "" && !recipe.ingredients[ingredientId]) {
                    //if amount is missing and is new line
                    recipe.ingredients.push({
                        amount: "",
                    })
                } else {
                    //do nothing
                }
                arrOfIndexes.push(ingredientId)
            } else if (key.includes("ingredient")) {
                const ingredientId = Number(key.split("ingredient")[1]) - 1
                if (
                    value === "" &&
                    recipe?.ingredients[ingredientId]?.ingredient
                ) {
                    //if ingredient is empty and ingredient already exists
                } else
                    try {
                        if (value !== "" && recipe.ingredients[ingredientId]) {
                            //if ingredient value is given and it already exists
                            Object.assign(recipe.ingredients[ingredientId], {
                                ...recipe.ingredients[ingredientId],
                                ingredient: value,
                            })
                        } else {
                            //if ingredient, assign it to corresponding amount
                            Object.assign(recipe.ingredients[ingredientId], {
                                ingredient: value,
                            })
                        }
                    } catch (err) {
                        console.log(err)
                        return res.status(200).json(err)
                    }
            }
        }
    }

    //create array from step indexes
    const stepIndexes = []
    const newSteps = Object.entries(updated)
        .filter((item) => {
            if (item[0].includes("step")) {
                stepIndexes.push(Number(item[0].split("step")[1]) - 1)
            }
            return item[0].includes("step")
        })
        .map((item) => {
            return item[1]
        })
    const currentSteps = recipe.instructions

    iterateRecipe()
    const updatedStepsArr = []
    stepIndexes.map((index) => {
        if (newSteps[index] === undefined) {
            updatedStepsArr.push(currentSteps[index])
        } else if (newSteps[index] === "" && !currentSteps[index]) {
            updatedStepsArr.push(newSteps[index])
        } else if (newSteps[index] === "" && currentSteps[index]) {
            updatedStepsArr.push(currentSteps[index])
        } else {
            updatedStepsArr.push(newSteps[index])
        }
    })

    recipe.ingredients = arrOfIndexes
        .map((index) => {
            return recipe.ingredients[index]
        })
        .filter((item) => {
            if (item.amount !== "" || item.ingredient !== "") return item
        })
    recipe.instructions = updatedStepsArr.filter((item) => {
        return item !== ""
    })
    try {
        await Recipe.findByIdAndUpdate(recipe._id, {
            $set: {
                name: recipe.name,
                description: recipe.description,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
            },
        })
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
    uploadRecipeImage,
    adminGetAllRecipes,
    adminDeleteRecipe,
}
