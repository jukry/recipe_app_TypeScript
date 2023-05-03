import User from "../models/User.js"

const registerUser = (req, res) => {
    return res.json({ Message: "Register" })
}
const authenticateUser = (req, res) => {
    return res.json({ Message: "Authenticate" })
}
const getUserData = (req, res) => {
    return res.json({ Message: "Get user data" })
}

export { registerUser, authenticateUser, getUserData }
