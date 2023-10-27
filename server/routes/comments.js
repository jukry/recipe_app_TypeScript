import express from "express"
const commentsRouter = express.Router()

import protect from "../middleware/loginMiddleware.js"
import {
    deleteComment,
    getAllComments,
    getComments,
    postComment,
} from "../controllers/commentController.js"
import newCommentLimiter from "../middleware/newCommentLimiter.js"

// route for comment requests
commentsRouter.route("/").post(protect, newCommentLimiter, postComment)
commentsRouter.route("/").get(getAllComments)

commentsRouter.route("/:id").get(getComments).delete(deleteComment)

export default commentsRouter
