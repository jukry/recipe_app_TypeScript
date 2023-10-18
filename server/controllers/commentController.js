import Comment from "../models/Comment.js"
import Recipe from "../models/Recipe.js"

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
        return res.status(201).json({ newComment })
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

export { postComment, getComments }
