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
    },
    {
        timestamps: true,
    }
)

const User = model("user", user) //model
export default User
