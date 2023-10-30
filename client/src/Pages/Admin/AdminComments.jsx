import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import fetchComments from "../../Hooks/fetchComments"
import { commentTime } from "../../utils/utils"
import "./styles/adminComments.css"
import Paginate from "../../Components/Paginate"

export default function AdminComments() {
    const queryResponseComments = useQuery(["allcomments"], fetchComments)
    const comments = queryResponseComments?.data?.data || []
    const initialComments = 20
    const [currentPage, setCurrentPage] = useState(1)
    const [dateFilter, setDateFilter] = useState({
        startDate: "",
        endDate: "",
    })

    const handleDelete = async (e, id) => {
        const res = await fetch(
            process.env.NODE_ENV === "production"
                ? `${import.meta.env.VITE_COMMENTS_ENDPOINT}/${id}`
                : `${import.meta.env.VITE_COMMENTS_ENDPOINT_DEV}/${id}`,
            {
                method: "DELETE",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id }),
            }
        )
        if (res.ok) {
            queryResponseComments.refetch()
        }
    }

    const commentList = comments?.filter((comment) => {
        return (
            (!dateFilter.startDate ||
                comment.createdAt >= dateFilter?.startDate) &&
            (!dateFilter.endDate || comment.createdAt <= dateFilter?.endDate)
        )
    })
    const maxPages = Math.ceil(commentList.length / initialComments)

    const slicedList = commentList
        .slice(
            (currentPage - 1) * initialComments,
            initialComments * currentPage
        )
        .map((comment) => {
            let timeDelta =
                (Date.now() - new Date(comment.createdAt)) / 1000 / 60 // delta in minutes

            const getCommentTime = commentTime(timeDelta)
            {
                return (
                    <section
                        className="admin-comment-container"
                        key={comment._id}
                    >
                        <section className="admin-comment-wrapper">
                            <section className="admin-comment-poster-container">
                                <p className="admin-comment-user">
                                    {comment.username}
                                </p>
                                <span className="admin-comment-separator">
                                    |
                                </span>
                                <p
                                    className="admin-comment-date"
                                    title={new Date(
                                        comment.createdAt
                                    ).toLocaleString("fi-FI")}
                                >
                                    {getCommentTime}
                                </p>
                            </section>

                            <p className="admin-comment-content">
                                {comment.content}
                            </p>
                        </section>
                        <button
                            id="admin-delete-comment"
                            onClick={(event) =>
                                handleDelete(event, comment._id)
                            }
                        >
                            Poista kommentti
                        </button>
                    </section>
                )
            }
        })
    const handleDateFilter = (e) => {
        e.preventDefault()
        const filterTime = e.target.value
        if (e.target.id === "start-date-filter") {
            if (filterTime.toString() === "Invalid Date") {
                setDateFilter((prev) => ({
                    ...prev,
                    startDate: "",
                }))
            } else {
                setDateFilter((prev) => ({
                    ...prev,
                    startDate: filterTime,
                }))
            }
        }
        if (e.target.id === "end-date-filter") {
            if (filterTime.toString() === "Invalid Date") {
                setDateFilter((prev) => ({
                    ...prev,
                    endDate: "",
                }))
            } else {
                setDateFilter((prev) => ({
                    ...prev,
                    endDate: filterTime,
                }))
            }
        }
    }

    return (
        <section id="admin-comment-section-container">
            <h3>Kommentit</h3>
            {comments?.length > initialComments ? (
                <section id="admin-comment-page-container">
                    <Paginate
                        currentPage={currentPage}
                        maxPages={maxPages}
                        containerId="admin-comment-nav-container"
                        backBtnId="admin-comment-nav-back"
                        forwardBtnId="admin-comment-nav-forward"
                        setCurrentPage={setCurrentPage}
                    />
                </section>
            ) : (
                ""
            )}
            <section id="admin-comment-filter-container">
                <input
                    type="datetime-local"
                    max={dateFilter.endDate}
                    id="start-date-filter"
                    onChange={(event) => handleDateFilter(event)}
                    value={dateFilter.startDate}
                />
                <input
                    type="datetime-local"
                    min={dateFilter.startDate}
                    id="end-date-filter"
                    onChange={(event) => handleDateFilter(event)}
                    value={dateFilter.endDate}
                />
                <button
                    type="reset"
                    id="comment-filter-reset-button"
                    onClick={() => {
                        setDateFilter(() => ({
                            startDate: "",
                            endDate: "",
                        }))
                    }}
                >
                    Poista suodatin
                </button>
            </section>
            {comments?.length > 0 ? (
                <section id="admin-comments-container">{slicedList}</section>
            ) : (
                <p id="no-comments-text">Ei vielä kommentteja</p>
            )}
        </section>
    )
}
