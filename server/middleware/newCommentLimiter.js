import { rateLimit } from "express-rate-limit"
const newCommentLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 2,
    message: "You can only comment 2 times in 10 minutes",

    handler: (req, res, next, options) => {
        return res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
})

export default newCommentLimiter
