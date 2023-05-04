import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const saltRounds = 10

const registerUser = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ Message: "Please fill all fields" })
    }
    const found = await User.find({ email: email }).count()
    if (found) {
        return res.status(400).json({ Message: "Email already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = User.create({
        username: username,
        email: email,
        password: hashedPassword,
    })

    user
        ? res.status(200).json({ message: "User created" })
        : res
              .status(400)
              .json({ Message: "Something went wrong, please try again" })
}
const authenticateUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user && bcrypt.compareSync(password, user.password)) {
        return res.status(200).json({ Message: "Login succesful" })
    } else {
        return res.status(404).json({ Message: "Login not succesful" })
    }
}
const getUserData = async (req, res) => {
    return res.json({ Message: "Get user data" })
}

export { registerUser, authenticateUser, getUserData }
