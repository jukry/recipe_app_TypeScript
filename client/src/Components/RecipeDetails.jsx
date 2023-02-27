import { useParams } from "react-router-dom"
import "./recipeDetails.css"
import recipes from "../assets/recipe-data"

export default function RecipeDetails() {
    const { id } = useParams()
    const { name, description, instructions, ingredients, images } =
        recipes.find((obj) => obj.id === parseInt(id))

    return (
        <section className="recipe-wrapper">
            <div className="recipe-hero">
                <img src={`../${images}`} alt="img" />
                <h1>{name}</h1>
                <h3>{description}</h3>
            </div>
            <div className="recipe-data">
                <div className="instructions">
                    <ol>
                        {instructions.map((item, i) => {
                            return <li key={i}>{item}</li>
                        })}
                    </ol>
                </div>
                <div className="ingredients">
                    {ingredients.map(([amount, ingredient], i) => {
                        return (
                            <div className="ingr-line">
                                <p>{amount}</p>
                                <p>{ingredient}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
