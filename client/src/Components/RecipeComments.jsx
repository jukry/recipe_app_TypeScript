import React from "react"
import CommentForm from "./CommentForm"
import Comments from "./Comments"

function RecipeComments({ comments }) {
    return (
        <section id="comment-section">
            <CommentForm />
            <Comments comments={comments} />
        </section>
    )
}

export default RecipeComments
