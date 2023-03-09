import { Schema, model } from "mongoose"

const recipe = new Schema({
    //Schema. value voi olla myös objekti johon voidaan määritellä muita pareja
    id: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    ingredients: [
        {
            amount: String,
            ingredient: String,
            type: { type: String },
            required: false,
        },
    ],
    instructions: {
        type: [String],
        required: false,
    },
    images: {
        type: [String],
        required: false,
    },
})

const Recipe = model("recipe", recipe) //model
export default Recipe
