import React, { useEffect, useRef, useState } from "react"
import "./Styles/comments.css"
import { commentTime } from "../utils/utils"

export default function Comments({ comments }) {
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
    const handlePagination = (event) => {
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
            let timeDelta = (Date.now() - new Date(comment.createdAt)) / 1000
            timeDelta = timeDelta / 60
            const getCommentTime = commentTime(timeDelta)
            return (
                <div className="comment-container" key={comment._id}>
                    <div className="comment-poster-container">
                        <p className="comment-user">{comment.username}</p>
                        <span className="comment-separator">|</span>
                        <p
                            className="comment-date"
                            title={new Date(comment.createdAt).toLocaleString(
                                "fi-FI"
                            )}
                        >
                            {getCommentTime}
                        </p>
                    </div>
                    <p className="comment-content">{comment.content}</p>
                </div>
            )
        })
    useEffect(() => {
        if (
            pagesArr?.length - currentPage === 1 &&
            event?.target?.id === "comment-nav-back"
        ) {
            ref.current?.scrollIntoView({ behavior: "instant" })
        }
    }, [currentPage])

    return (
        <section id="comment-section-container">
            <h3>Kommentit</h3>
            {comments?.length > 0 ? (
                <section id="comments-container">{commentList}</section>
            ) : (
                <p id="no-comments-text">Ei vielä kommentteja</p>
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
