import express from "express"
const commentsRouter = express.Router()

import protect from "../middleware/loginMiddleware.js"
import { getComments, postComment } from "../controllers/commentController.js"

// route for comment requests
commentsRouter.route("/").post(protect, postComment)

commentsRouter.route("/:id").get(getComments)
//TODO /* newCommentLimiter,  */

export default commentsRouter
