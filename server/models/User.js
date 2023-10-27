import { Schema, model } from "mongoose"

const user = new Schema(
    {
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },
        lastlogins: [
            {
                type: Date,
                default: () => Date.now(),
            },
        ],
        recipes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Recipe",
            },
        ],
        favrecipes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Recipe",
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        role: {
            type: String,
            default: "User",
        },
    },
    {
        timestamps: true,
    }
)

const User = model("user", user) //model
export default User
