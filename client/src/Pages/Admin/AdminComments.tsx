import { useQuery } from "@tanstack/react-query"
import React, { BaseSyntheticEvent, useState } from "react"
import fetchComments from "../../Hooks/fetchComments"
import { commentTime } from "../../utils/utils"
import "./styles/adminComments.css"
import Paginate from "../../Components/Paginate"
import { useSearchParams } from "react-router-dom"
import { IComment } from "../../utils/APIResponseTypes"

export default function AdminComments() {
    const queryResponseComments = useQuery(["comments"], async () =>
        fetchComments({ queryKey: "comments" })
    )
    const comments: IComment[] = queryResponseComments?.data?.data || []
    const initialComments = 20
    const [currentPage, setCurrentPage] = useState(1)
    const [dateFilter, setDateFilter] = useState({
        startDate: "",
        endDate: "",
    })
    const [commentSearchParams, setCommentSearchParams] = useSearchParams()
    const [emailFilter, setEmailFilter] = useState(
        commentSearchParams.get("email") || ""
    )
    const [recipeIdFilter, setRecipeIdFilter] = useState(
        commentSearchParams.get("recipeId") || ""
    )

    const handleDelete = async (id: string) => {
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
                new Date(comment.createdAt).getTime() >=
                    new Date(dateFilter?.startDate).getTime()) &&
            (!dateFilter.endDate ||
                new Date(comment.createdAt).getTime() <=
                    new Date(dateFilter?.endDate).getTime())
        )
    })
    const maxPages = Math.ceil(commentList.length / initialComments)

    const slicedList = commentList
        .filter((comment) => {
            return comment?.user?.email
                ?.toLowerCase()
                .includes(emailFilter.toLowerCase())
        })
        .filter((comment) => {
            return comment.recipe.includes(recipeIdFilter)
        })
        .slice(
            (currentPage - 1) * initialComments,
            initialComments * currentPage
        )
        .map((comment) => {
            const commentCreatedAt = new Date(comment.createdAt).getTime()
            let timeDelta = new Date().getTime() - commentCreatedAt
            const getCommentTime = commentTime(timeDelta)
            {
                return (
                    <div className="admin-comment-container" key={comment._id}>
                        <div className="admin-comment-wrapper">
                            <div className="admin-comment-poster-container">
                                <p className="admin-comment-user" tabIndex={0}>
                                    <span className="visuallyhidden">
                                        Kommentin lähettäjä
                                    </span>
                                    {comment.username}
                                </p>
                                <span className="admin-comment-separator">
                                    |
                                </span>
                                <p
                                    tabIndex={0}
                                    className="admin-comment-date"
                                    title={new Date(
                                        comment.createdAt
                                    ).toLocaleString("fi-FI")}
                                >
                                    {getCommentTime}
                                </p>
                            </div>
                            <p tabIndex={0}>Käyttäjä: {comment?.user?.email}</p>

                            <p tabIndex={0} className="admin-comment-content">
                                {comment.content}
                            </p>
                        </div>
                        <button
                            className="admin-delete-comment"
                            onClick={() => handleDelete(comment._id)}
                        >
                            Poista kommentti
                        </button>
                    </div>
                )
            }
        })
    const handleDateFilter = (e: BaseSyntheticEvent) => {
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
            <h3 tabIndex={0}>Kommentit</h3>
            <div id="admin-comment-page-container">
                <Paginate
                    currentPage={currentPage}
                    maxPages={maxPages}
                    containerId="admin-comment-nav-container"
                    backBtnId="admin-comment-nav-back"
                    forwardBtnId="admin-comment-nav-forward"
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <div id="admin-comment-filter-container">
                <label htmlFor="start-date-filter" className="visuallyhidden">
                    Rajaa kommenttien alkupäivämäärä
                </label>
                <input
                    type="datetime-local"
                    max={dateFilter.endDate}
                    id="start-date-filter"
                    onChange={(event) => handleDateFilter(event)}
                    value={dateFilter.startDate}
                    aria-labelledby="start-date-filter"
                />
                <label htmlFor="end-date-filter" className="visuallyhidden">
                    Rajaa kommenttien loppupäivämäärä
                </label>
                <input
                    type="datetime-local"
                    min={dateFilter.startDate}
                    id="end-date-filter"
                    onChange={(event) => handleDateFilter(event)}
                    value={dateFilter.endDate}
                    aria-labelledby="end-date-filter"
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
                    Poista päivämääräsuodatin
                </button>
                <label
                    htmlFor="admin-comment-filter-email"
                    id="admin-comment-filter-email-label"
                >
                    Suodata sähköpostilla
                </label>
                <input
                    type="search"
                    id="admin-comment-filter-email"
                    value={emailFilter}
                    onChange={(e) => {
                        setEmailFilter(e.target.value)
                        setCommentSearchParams((searchParams) => {
                            searchParams.set("email", e.target.value)
                            return searchParams
                        })
                    }}
                />
                <label
                    htmlFor="admin-comment-filter-id"
                    id="admin-comment-filter-id-label"
                >
                    Suodata reseptin ID:lla
                </label>
                <input
                    type="search"
                    id="admin-comment-filter-id"
                    value={recipeIdFilter}
                    onChange={(e) => {
                        setRecipeIdFilter(e.target.value)
                        setCommentSearchParams((searchParams) => {
                            searchParams.set("recipeId", e.target.value)
                            return searchParams
                        })
                    }}
                />
                <p tabIndex={0}>Tuloksia: {commentList.length}</p>
            </div>
            {comments?.length > 0 ? (
                <div id="admin-comments-container">{slicedList}</div>
            ) : (
                <p id="no-comments-text">Ei vielä kommentteja</p>
            )}
        </section>
    )
}
