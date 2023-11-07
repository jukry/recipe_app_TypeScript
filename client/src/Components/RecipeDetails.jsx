import { useParams } from "react-router-dom"
import "./Styles/recipeDetails.css"
import { useMutation, useQuery } from "@tanstack/react-query"
import fetchRecipeById from "../Hooks/fetchRecipeById.js"
import BackButton from "./BackButton"
import RecipeComments from "./RecipeComments"
import fetchRecipeComments from "../Hooks/fetchRecipeComments"
import { postComment } from "../utils/utils"
import { useContext } from "react"
import { UserContext } from "../Context/UserContext"

function RecipeDetails() {
    const params = useParams()
    const queryResponse = useQuery(["recipe", params.id], fetchRecipeById)
    const data = queryResponse?.data?.message ?? []
    const queryResponseComments = useQuery(
        ["comments", params.id],
        fetchRecipeComments
    )
    const {
        user: { email },
    } = useContext(UserContext)
    const mutation = useMutation({
        mutationFn: async ([_, comment, id, userId, setComment]) => {
            const res = await postComment(comment, id, userId, email)
            if (!res.ok) {
                throw new Error(res.status)
            }
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
        <div className="recipe-wrapper">
            <BackButton />
            <section className="recipe-hero">
                {data.images && <img src={data.images} alt="Kuva ateriasta" />}
                <h2>{data.name}</h2>
                <h3>{data.description}</h3>
            </section>
            <div className="recipe-data">
                <section className="instructions">
                    <h3>Valmistusohje</h3>
                    <ol>
                        {data?.instructions?.map((item, i) => {
                            return <li key={i}>{item}</li>
                        })}
                    </ol>
                </section>
                <section className="ingredients">
                    <h3>Ainesosat</h3>
                    {data?.ingredients?.map((item, i) => {
                        return (
                            <div className="ingr-line" key={i}>
                                <p className="ingr-amount">{item.amount}</p>
                                <p>{item.ingredient}</p>
                            </div>
                        )
                    })}
                </section>
            </div>
            <RecipeComments props={[comments, mutation]} />
        </div>
    ) : (
        location.replace("/notfound")
    )
}
export default RecipeDetails
