import { Schema, model } from "mongoose"

const user = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },
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
    },
    {
        timestamps: true,
    }
)

const User = model("user", user) //model
export default User
