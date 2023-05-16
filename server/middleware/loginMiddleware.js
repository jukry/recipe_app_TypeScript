import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { refresh } from "../controllers/authController.js"

const protect = async (req, res, next) => {
    if (!req.headers.cookie)
        return res.status(401).json({ Message: "No token" })
    const cookies = req.headers.cookie?.split("; ")
    const token = cookies[0]?.split("=")[1]
    let acc = cookies[1]?.split("=")[1]

    //set if access token has expired
    if (token && !acc) {
        const response = await fetch("http://localhost:5000/auth/refresh", {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Cookie: token,
            },
        })
        acc =
            response?.headers
                ?.get("set-cookie")
                ?.split("=")[1]
                .split("; ")[0] || ""
        res.cookie("acc", acc, {
            maxAge: 60 * 10000, // 10 minutes
            //secure: false, in production, use true
            httpOnly: true,
        })
    }

    try {
        // verify
        const decoded = jwt.verify(acc, process.env.JWT_SECRET)

        //get user from token
        req.user = await User.findById(decoded.id).select("-password")
        next()
    } catch (error) {
        return res.status(401).json({ Message: "Invalid token" })
    }

    if (!token) {
        res.status(401).json({ Message: "No token" })
    }
}

export default protect
