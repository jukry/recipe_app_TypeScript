import IngredientInput from "./IngredientInput"
import "../Pages/Account/styles/newRecipe.css"
import { RecipeProps } from "../utils/APIResponseTypes"

export default function RecipeDataInput({ props }: RecipeProps) {
    return (
        <div id="recipe-text-input">
            <IngredientInput
                type="text"
                placeholder="Anna reseptin nimi"
                className="new-recipe-name"
                name="name"
                id="new-recipe-name"
                value={props.recipe?.name || ""}
                onChange={props.handleChange}
                required={true}
            />
            <IngredientInput
                type="text"
                placeholder="Anna reseptin kuvaus"
                className="new-recipe-description"
                id="new-recipe-description"
                name="description"
                value={props.recipe?.description || ""}
                onChange={props.handleChange}
                required={true}
            />
        </div>
    )
}
