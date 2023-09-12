import { redirect } from "react-router-dom"

export async function getUserData({ request }) {
    const pathname = new URL(request.url).pathname
    try {
        const data = await fetch(import.meta.env.VITE_USERDATA_ENDPOINT, {
            method: "get",
            credentials: "include",
        })
        const body = await data.json()
        if (!body.id) {
            return redirect(
                `/login?message=Kirjaudu ensin sisään&redirectTo=${pathname}`
            )
        }
        return body
    } catch (error) {
        throw new Error(error)
    }
}

export function addRow(e) {
    const button = e.target.id

    if (button === "button-add-ingredient") {
        const ingredientList = document.getElementById("ingredients")
        const ingredientListLength =
            ingredientList.getElementsByClassName("ingredient-wrapper").length
        if (ingredientListLength >= 50) {
            return null //viesti ettei enempää rivejä voi lisätä
        }
        const newSection = document.createElement("section")
        newSection.setAttribute("class", "ingredient-wrapper")
        ingredientList.append(newSection)

        const newAmountField = document.createElement("input")
        newAmountField.setAttribute("class", "new-recipe-ingredient-amount")
        newAmountField.setAttribute("type", "text")
        newAmountField.setAttribute(
            "placeholder",
            "Anna ainesosan määrä (esim. 200g)"
        )
        newAmountField.setAttribute("id", `amount-${ingredientListLength + 1}`)
        newAmountField.setAttribute("name", `amount${ingredientListLength + 1}`)

        const newIngredientField = document.createElement("input")
        newIngredientField.setAttribute("class", "new-recipe-ingredient")
        newIngredientField.setAttribute("type", "text")
        newIngredientField.setAttribute("placeholder", "Anna ainesosa")
        newIngredientField.setAttribute(
            "id",
            `ingredient-${ingredientListLength + 1}`
        )
        newIngredientField.setAttribute(
            "name",
            `ingredient${ingredientListLength + 1}`
        )

        newSection.append(newAmountField, newIngredientField)
    } else if (button === "button-add-step") {
        const stepList = document.getElementById("recipe-steps")
        const stepListLength =
            stepList.getElementsByClassName("new-recipe-step").length
        if (stepListLength >= 50) {
            return null //viesti ettei enempää rivejä voi lisätä
        }
        const newStepField = document.createElement("input")
        newStepField.setAttribute("class", "new-recipe-step")
        newStepField.setAttribute("type", "text")
        newStepField.setAttribute("placeholder", "Kirjoita vaihe")
        newStepField.setAttribute("id", `step-${stepListLength + 1}`)
        newStepField.setAttribute("name", `step${stepListLength + 1}`)

        stepList.append(newStepField)
    }

    return null
}
