import express from "express"
const recipesRouter = express.Router()
import {
    getAllRecipes,
    getRandomRecipe,
    getRecipeById,
    createRecipe,
    deleteRecipe,
    updateRecipe,
    uploadRecipeImage,
} from "../controllers/recipeController.js"
import { protect } from "../middleware/loginMiddleware.js"
import newRecipeLimiter from "../middleware/newRecipeLimiter.js"
import multer from "multer"
const storage = multer.memoryStorage()
const upload = multer({ storage })
// route for get all recipes and create recipe
recipesRouter
    .route("/")
    .get(getAllRecipes)
    .post(protect, newRecipeLimiter, createRecipe)

// get random recipe
recipesRouter.get("/random", getRandomRecipe)

// route for id based request
recipesRouter
    .route("/:id")
    .get(getRecipeById)
    .delete(protect, deleteRecipe)
    .patch(protect, updateRecipe)

recipesRouter
    .route("/upload")
    .post(upload.single("imageUpload"), async function (req, res) {
        if (!req.file) {
            return res.json({ Message: "No image" })
        }
        try {
            const b64 = Buffer.from(req.file.buffer).toString("base64")
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64
            const cldRes = await uploadRecipeImage(dataURI)
            res.json(cldRes)
        } catch (error) {
            console.log(error)
            res.send({
                message: error.message,
            })
        }
    })

export default recipesRouter
