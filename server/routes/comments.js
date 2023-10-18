import express from "express"
const commentsRouter = express.Router()

import protect from "../middleware/loginMiddleware.js"
import { getComments, postComment } from "../controllers/commentController.js"
import newCommentLimiter from "../middleware/newCommentLimiter.js"

// route for comment requests
commentsRouter.route("/").post(protect, newCommentLimiter, postComment)

commentsRouter.route("/:id").get(getComments)

export default commentsRouter
