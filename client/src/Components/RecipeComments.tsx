import React from "react"
import CommentForm from "./CommentForm"
import Comments from "./Comments"
import { CommentMutation, IComment } from "../utils/APIResponseTypes"

function RecipeComments(props: {
    comments: IComment[]
    handleSubmit: CommentMutation
}) {
    const comments = props.comments
    const handleSubmit = props.handleSubmit
    return (
        <div id="comment-section">
            <CommentForm handleSubmit={handleSubmit} />
            <Comments comments={comments} />
        </div>
    )
}

export default RecipeComments
