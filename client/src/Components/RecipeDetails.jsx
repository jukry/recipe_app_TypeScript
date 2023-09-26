import { useParams } from "react-router-dom"
import "./recipeDetails.css"
import { useQuery } from "@tanstack/react-query"
import fetchRecipeById from "../Hooks/fetchRecipeById.js"

export default function RecipeDetails() {
    const params = useParams()
    const queryResponse = useQuery(["recipe", params.id], fetchRecipeById)
    const data = queryResponse?.data?.message ?? []
    document.title = data.name

    return data !== undefined ? (
        <section className="recipe-wrapper">
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
        </section>
    ) : (
        <h3>Ei mtn</h3>
    )
}
