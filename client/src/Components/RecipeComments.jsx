import React from "react"
import CommentForm from "./CommentForm"
import Comments from "./Comments"

function RecipeComments(props) {
    const comments = props.props[0]
    const handleSubmit = props.props[1]
    return (
        <div id="comment-section">
            <CommentForm props={handleSubmit} />
            <Comments comments={comments} />
        </div>
    )
}

export default RecipeComments
