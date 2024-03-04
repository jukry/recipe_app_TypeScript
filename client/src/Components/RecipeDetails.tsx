import { useParams } from "react-router-dom"
import "./Styles/recipeDetails.css"
import { useMutation, useQuery } from "@tanstack/react-query"
import fetchRecipeById from "../Hooks/fetchRecipeById.js"
import BackButton from "./BackButton"
import RecipeComments from "./RecipeComments"
import fetchRecipeComments from "../Hooks/fetchRecipeComments"
import { postComment } from "../utils/utils"
import React, { useContext } from "react"
import { UserContext } from "../Context/UserContext"
import "./Styles/recipeTagsInput.css"
import {
    CommentMutation,
    IRecipeDetails,
    IUserContext,
} from "../utils/APIResponseTypes"

function RecipeDetails() {
    const params = useParams()
    const queryResponse = useQuery(["recipe", params.id], async () =>
        fetchRecipeById({ queryKey: ["recipe", params.id as string] })
    )
    const data: IRecipeDetails = queryResponse?.data?.message ?? []
    const queryResponseComments = useQuery(["comments", params.id], async () =>
        fetchRecipeComments({ queryParams: ["comments", params.id as string] })
    )
    const { user } = useContext<IUserContext>(UserContext)
    const mutation: CommentMutation = useMutation({
        mutationFn: async ({
            event: _,
            comment,
            id,
            userId,
            setComment,
        }: {
            event?: any
            comment: { content: string; username: string }
            id: string
            userId: string
            setComment: React.Dispatch<
                React.SetStateAction<{ content: string; username: string }>
            >
        }) => {
            console.log(comment, id, userId, user?.email)
            const res = await postComment(
                comment,
                id,
                userId,
                user?.email as string
            )
            console.log(res)
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return { res, setComment }
        },
        onSuccess: async ({ res, setComment }) => {
            const commentBox = document.getElementById(
                "comment-box"
            ) as HTMLTextAreaElement
            const usernameBox = document.getElementById(
                "comment-username"
            ) as HTMLInputElement
            if (!commentBox || !usernameBox) {
                return null
            }
            console.log(res)
            commentBox.value = ""
            usernameBox.value = ""
            setComment({
                content: "",
                username: "",
            })
            queryResponseComments.refetch()
        },
    })

    const comments = queryResponseComments?.data ?? []
    document.title = data.name
    return data !== undefined || data !== null ? (
        <div className="recipe-wrapper">
            <BackButton />
            <section className="recipe-hero">
                {data.images && <img src={data.images} alt="Kuva ateriasta" />}
                <h2 tabIndex={0}>{data.name}</h2>
                <h3 tabIndex={0}>{data.description}</h3>
            </section>
            <div id="recipe-tags">
                <div id="tag-container">
                    {data?.tags?.map((tag) => {
                        if (tag) {
                            return (
                                <span
                                    key={tag}
                                    tabIndex={0}
                                    className="recipe-tag"
                                >
                                    {tag}
                                </span>
                            )
                        }
                    })}
                </div>
            </div>
            <div className="recipe-data">
                <section className="instructions">
                    <h3 tabIndex={0}>Valmistusohje</h3>
                    <ol>
                        {data?.instructions?.map((item, i) => {
                            return (
                                <li key={i} tabIndex={0}>
                                    {item}
                                </li>
                            )
                        })}
                    </ol>
                </section>
                <section className="ingredients">
                    <h3 tabIndex={0}>Ainesosat</h3>
                    {data?.ingredients?.map((item, i) => {
                        return (
                            <ul className="ingr-line" key={i}>
                                <li className="ingr-item">
                                    <span className="ingr-amount" tabIndex={0}>
                                        <span className="visuallyhidden">
                                            Ainesosan {i + 1} määrä
                                        </span>
                                        {item.amount}
                                    </span>
                                    <span tabIndex={0}>
                                        <span className="visuallyhidden">
                                            Ainesosa {i + 1}
                                        </span>
                                        {item.ingredient}
                                    </span>
                                </li>
                            </ul>
                        )
                    })}
                </section>
            </div>
            <RecipeComments comments={comments} handleSubmit={mutation} />
        </div>
    ) : (
        location.replace("/notfound")
    )
}
export default RecipeDetails
