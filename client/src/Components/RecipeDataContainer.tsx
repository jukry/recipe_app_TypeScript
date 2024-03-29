import IngredientInputWrapper from "./IngredientInputWrapper"
import RecipeStepsInput from "./RecipeStepsInput"
import RecipeDataInput from "./RecipeDataInput"
import RecipeImageInput from "./RecipeImageInput"
import RecipeTagsInput from "./RecipeTagsInput"
import { RecipeProps } from "../utils/APIResponseTypes"

export default function RecipeDataContainer({ props }: RecipeProps) {
    return (
        <div id="recipe-data-container">
            <RecipeDataInput props={props} />
            <RecipeTagsInput props={[props.recipe, props.setRecipe]} />
            <div id="recipe-ingredient-steps-wrapper">
                <IngredientInputWrapper props={props} />
                <RecipeStepsInput props={props} />
                <RecipeImageInput props={props} />
            </div>
        </div>
    )
}
