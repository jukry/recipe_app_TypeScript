import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./recipeDetails.css"
import UseFetch from "./UseFetch"
//import recipes from "../assets/recipe-data"

export default function RecipeDetails() {
    const { id } = useParams()
    const data = UseFetch(`http://localhost:5000/api/recipes/${id}`)

    return data !== undefined ? (
        <section className="recipe-wrapper">
            <div className="recipe-hero">
                <img src={`../${data.images}`} alt="img" />
                <h1>{data.name}</h1>
                <h3>{data.description}</h3>
            </div>
            <div className="recipe-data">
                <div className="instructions">
                    <h3>Valmistusohje</h3>
                    <ol>
                        {data.instructions.map((item, i) => {
                            return <li key={i}>{item}</li>
                        })}
                    </ol>
                </div>
                <div className="ingredients">
                    <h3>Ainesosat</h3>
                    {data.ingredients.map((item, i) => {
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
        []
    )
}
