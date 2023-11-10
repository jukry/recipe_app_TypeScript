import { Schema, model } from "mongoose"

const recipe = new Schema({
    user: {
        type: Object,
        _id: Schema.Types.ObjectId,
        email: String,
        ref: "User",
        required: true,
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
        type: String,
        required: false,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    tags: { type: [String] },
})

const Recipe = model("recipe", recipe) //model
export default Recipe
