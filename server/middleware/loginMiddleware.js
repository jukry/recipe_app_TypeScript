import jwt from "jsonwebtoken"
import User from "../models/User.js"

const protect = async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // get token from header
            token = req.headers.authorization.split(" ")[1]
            // verify
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from token
            req.user = await User.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            return res.status(401).json({ Message: "Not authorized" })
        }
    }
    if (!token) {
        res.status(401).json({ Message: "No token" })
    }
}

export default protect
