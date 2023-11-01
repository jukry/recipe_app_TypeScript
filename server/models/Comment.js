import { Schema, model } from "mongoose"

const comment = new Schema(
    {
        user: {
            type: Object,
            _id: Schema.Types.ObjectId,
            email: String,
            ref: "User",
            required: true,
        },
        recipe: {
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: true,
    }
)

const Comment = model("comment", comment)
export default Comment
