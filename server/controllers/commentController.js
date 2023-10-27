import Comment from "../models/Comment.js"
import Recipe from "../models/Recipe.js"
import User from "../models/User.js"

const postComment = async (req, res) => {
    const recipeId = req.body.id
    const commentData = req.body.commentData
    const userId = req.body.userId

    if (!userId) {
        return res.status(401).json({ Message: "Not authorized" })
    } else if (!recipeId) {
        return res.status(404).json({ Message: "No such recipe" })
    }

    try {
        const newComment = await Comment.create({
            user: userId,
            recipe: recipeId,
            username: commentData.username,
            content: commentData.content,
            createdAt: Date.now(),
        })
        await Recipe.findByIdAndUpdate(recipeId, {
            $push: {
                comments: newComment._id,
            },
        }).exec()
        await User.findByIdAndUpdate(userId, {
            $push: { comments: newComment._id },
        })
        return res.sendStatus(201)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const getComments = async (req, res) => {
    const recipeId = req.params.id
    //TODO
    // sad path
    const comments = await Comment.find({ recipe: recipeId }).sort({
        createdAt: -1,
    })

    return res.status(200).json(comments)
}
const getAllComments = async (req, res) => {
    const comments = await Comment.find().sort({ createdAt: -1 })
    //TODO
    // sad path
    return res.status(200).json({ data: comments })
}
const deleteComment = async (req, res) => {
    const { id } = req.body

    const foundComment = await Comment.findById(id)
    if (!foundComment) {
        return res.status(404).json({ Message: "No such comment" })
    }

    try {
        await foundComment.deleteOne()
        await Recipe.updateOne({ comments: id }, { $pull: { comments: id } })

        await User.updateOne({ comments: id }, { $pull: { comments: id } })

        return res.status(200).json({ Message: "Comment deleted" })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ Message: err })
    }
}

export { postComment, getComments, getAllComments, deleteComment }
