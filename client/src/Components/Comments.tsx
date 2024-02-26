import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react"
import "./Styles/comments.css"
import { commentTime } from "../utils/utils"
import { IComment } from "../utils/APIResponseTypes"

export default function Comments({ comments }: { comments: IComment[] }) {
    const initialComments = 8
    const [currentPage, setCurrentPage] = useState(1)
    const ref = useRef(null)
    const pagesArr = comments
        ? [...Array(Math.ceil(comments?.length / initialComments)).keys()]
        : []

    const paginate = () => {
        return (
            <section id="comment-nav-container">
                <button
                    onClick={(event) => {
                        handlePagination(event)
                    }}
                    id="comment-nav-back"
                >
                    {"<"}
                </button>
                <p>
                    {currentPage} / {pagesArr.length}
                </p>
                <button
                    onClick={(event) => handlePagination(event)}
                    id="comment-nav-forward"
                >
                    {">"}
                </button>
            </section>
        )
    }

    const pagination = paginate()
    const handlePagination = (event: BaseSyntheticEvent) => {
        event.stopPropagation()
        event.preventDefault()
        const navButtonPressed = event.target.id
        navButtonPressed === "comment-nav-forward"
            ? setCurrentPage((prev) => {
                  if (prev < pagesArr?.length) return prev + 1
                  else return prev
              })
            : setCurrentPage((prev) => {
                  if (prev > 1) return prev - 1
                  else return prev
              })
    }
    const commentList = comments
        ?.slice(
            (currentPage - 1) * initialComments,
            initialComments * currentPage
        )
        .map((comment) => {
            const commentCreatedAt = new Date(comment.createdAt).getTime()
            let timeDelta = new Date().getTime() - commentCreatedAt
            const getCommentTime = commentTime(timeDelta)
            return (
                <div className="comment-container" key={comment._id}>
                    <div className="comment-poster-container">
                        <p className="comment-user" tabIndex={0}>
                            <span className="visuallyhidden">
                                Kommentin lähettäjä
                            </span>
                            {comment.username}
                        </p>
                        <span className="comment-separator">|</span>
                        <p
                            tabIndex={0}
                            className="comment-date"
                            title={new Date(comment.createdAt).toLocaleString(
                                "fi-FI"
                            )}
                        >
                            {getCommentTime}
                        </p>
                    </div>
                    <p className="comment-content" tabIndex={0}>
                        {comment.content}
                    </p>
                </div>
            )
        })
    const handleScrollIntoView = () => {
        const navBack = document.getElementById("comment-nav-back")
        navBack?.scrollIntoView({ behavior: "instant" })
    }
    useEffect(() => {
        handleScrollIntoView()
    }, [currentPage])

    return (
        <section id="comment-section-container">
            <h3 tabIndex={0}>Kommentit</h3>
            {comments?.length > 0 ? (
                <section id="comments-container">{commentList}</section>
            ) : (
                <p id="no-comments-text" tabIndex={0}>
                    Ei vielä kommentteja
                </p>
            )}
            {comments?.length > initialComments ? (
                <section id="comment-page-container" ref={ref}>
                    {pagination}
                </section>
            ) : (
                ""
            )}
        </section>
    )
}
