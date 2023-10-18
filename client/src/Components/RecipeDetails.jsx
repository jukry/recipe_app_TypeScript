import { useParams } from "react-router-dom"
import "./Styles/recipeDetails.css"
import { useMutation, useQuery } from "@tanstack/react-query"
import fetchRecipeById from "../Hooks/fetchRecipeById.js"
import BackButton from "./BackButton"
import RecipeComments from "./RecipeComments"
import fetchRecipeComments from "../Hooks/fetchRecipeComments"
import { postComment } from "../utils/utils"

export default function RecipeDetails() {
    const params = useParams()
    const queryResponse = useQuery(["recipe", params.id], fetchRecipeById)
    const data = queryResponse?.data?.message ?? []
    const queryResponseComments = useQuery(
        ["comments", params.id],
        fetchRecipeComments
    )

    const mutation = useMutation({
        mutationFn: async ([_, comment, id, userId, setComment]) => {
            const res = await postComment(comment, id, userId)
            return [res, setComment]
        },
        onSuccess: async ([res, setComment]) => {
            const commentBox = document.getElementById("comment-box")
            const usernameBox = document.getElementById("comment-username")
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
        <section className="recipe-wrapper">
            <BackButton />
            <div className="recipe-hero">
                <img src={`../${data.images}`} alt="Kuva tulossa" />
                <h1>{data.name}</h1>
                <h3>{data.description}</h3>
            </div>
            <div className="recipe-data">
                <div className="instructions">
                    <h3>Valmistusohje</h3>
                    <ol>
                        {data?.instructions?.map((item, i) => {
                            return <li key={i}>{item}</li>
                        })}
                    </ol>
                </div>
                <div className="ingredients">
                    <h3>Ainesosat</h3>
                    {data?.ingredients?.map((item, i) => {
                        return (
                            <div className="ingr-line" key={i}>
                                <p className="ingr-amount">{item.amount}</p>
                                <p>{item.ingredient}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <RecipeComments props={[comments, mutation.mutate]} />
        </section>
    ) : (
        location.replace("/notfound")
    )
}
