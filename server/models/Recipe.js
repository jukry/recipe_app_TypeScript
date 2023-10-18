import { Schema, model } from "mongoose"

const recipe = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
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
    ingredients: {
        amount: String,
        ingredient: String,
        type: Array,
        required: true,
    },

    instructions: {
        type: [String],
        required: true,
    },
    images: {
        type: [String],
        required: false,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
})

const Recipe = model("recipe", recipe) //model
export default Recipe
