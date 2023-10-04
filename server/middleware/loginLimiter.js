import { rateLimit } from "express-rate-limit"
const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: "Too many login attempts",

    handler: (req, res, next, options) => {
        res.status(options.statusCode).send(options.message)
        next()
    },
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
})

export default loginLimiter
