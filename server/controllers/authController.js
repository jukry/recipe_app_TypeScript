import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ Message: "Please fill all fields" })
    }
    const found = await User.findOne({ email })
    if (!found) {
        return res.status(401).json({ Message: "Unauthorized" })
    }
    const id = found._id.toString()

    const match = await bcrypt.compare(password, found.password)

    if (!match) {
        return res.status(401).json({ Message: "Unauthorized" })
    }

    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "10m",
    })

    const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, {
        expiresIn: "7d",
    })
    return res
        .cookie("token", refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
            //secure: false, in production, use true
            httpOnly: true,
        })
        .cookie("acc", accessToken, {
            maxAge: 60 * 10000, // 10 minutes
            //secure: false, in production, use true
            httpOnly: true,
        })
        .json({ accessToken })
}

const refresh = async (req, res) => {
    const token = req.headers.cookie
    if (!token) return res.status(401).json({ Message: "Unauthorized" })

    const refreshToken = token

    try {
        const { id } = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
        const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "10m",
        })
        return res
            .cookie("acc", accessToken, {
                maxAge: 60 * 10000, // 10 minutes
                //secure: false, in production, use true
                httpOnly: true,
            })
            .json({ accessToken })
    } catch (err) {
        res.status(401).json({ Message: err })
    }
}

const logout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies.token) return res.sendStatus(204)
    res.clearCookie("token", { httpOnly: true })
    res.clearCookie("acc", { httpOnly: true })
    res.json({ Message: "Cookie cleared" })
}

export { login, refresh, logout }
