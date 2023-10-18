import React, { useState } from "react"
import "./Styles/recipeComments.css"

function CommentForm() {
    const [comment, setComment] = useState("")

    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }
    return (
        <section id="comment-form-container">
            {comment ? (
                <p id="comment-length-field">{comment.length}/1000 merkkiä</p>
            ) : (
                ""
            )}
            <form action="post" id="comment-form">
                <label htmlFor="comment-box"></label>
                <textarea
                    name="commentbox"
                    id="comment-box"
                    cols="30"
                    rows="5"
                    form="comment-form"
                    placeholder="Kirjoita kommenttisi"
                    maxLength={1000}
                    value={comment}
                    onChange={handleCommentChange}
                    required
                ></textarea>
                <button type="submit" id="comment-submit-button">
                    Lisää kommentti
                </button>
            </form>
        </section>
    )
}

export default CommentForm
