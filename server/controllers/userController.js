import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import Recipe from "../models/Recipe.js"
const saltRounds = 10

const registerUser = async (req, res) => {
    const { email, password, repassword } = req.body

    if (password !== repassword) {
        return res.status(200).json({ Message: "Passwords do not match" })
    }

    if (!email || !password || !repassword) {
        return res.status(401).json({ Message: "Please fill all fields" })
    }
    const found = await User.find({ email: email }).count()
    if (found) {
        return res.status(403).json({ Message: "Email already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await User.create({
        email: email,
        password: hashedPassword,
    })

    user
        ? res.status(201).json({
              _id: user.id,
              email: user.email,
              token: generateToken(user._id),
          })
        : res
              .status(400)
              .json({ Message: "Something went wrong, please try again" })
}
const authenticateUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user && bcrypt.compareSync(password, user.password)) {
        let generatedToken = generateToken(user._id)
        return res
            .cookie("token", generatedToken, {
                expires: new Date(Date.now() + 600000),
                //secure: false, in production, use true
                httpOnly: true,
            })
            .status(200)
            .json({
                _id: user.id,
                email: user.email,
            })
    } else {
        return res.status(404).json({ Message: "Login not succesful" })
    }
}
const getUserData = async (req, res) => {
    const { _id, email, recipes, favrecipes } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        email,
        recipes,
        favrecipes,
    })
}

// Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
}

const getUserRecipes = async (req, res) => {
    const { _id } = req.user
    const userId = _id.toString()
    const recipes = await Recipe.find({ user: userId }).exec()
    return res.status(200).json({ data: recipes })
}

export { registerUser, authenticateUser, getUserData, getUserRecipes }
