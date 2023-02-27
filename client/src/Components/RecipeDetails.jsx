import { useParams } from "react-router-dom"
import "./recipeDetails.css"
import recipes from "../assets/recipe-data"

export default function RecipeDetails() {
    const { id } = useParams()
    const { name, description, instructions, ingredients, images } =
        recipes.find((obj) => obj.id === parseInt(id))
    return (
        <section>
            <div className="recipe-hero">
                <img src={`../${images}`} alt="img" />
            </div>
            <div>
                <h1>{name}</h1>
                <h2>{description}</h2>
                <h3>
                    {instructions.map((item, i) => {
                        return <li key={i}>{item}</li>
                    })}
                </h3>
            </div>
        </section>
    )
}
