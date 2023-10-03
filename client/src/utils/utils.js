import { redirect } from "react-router-dom"

export async function getUserData({ request }) {
    const pathname = new URL(request.url).pathname
    try {
        const data = await fetch(
            process.env.NODE_ENV === "production"
                ? import.meta.env.VITE_USERDATA_ENDPOINT
                : import.meta.env.VITE_USERDATA_ENDPOINT_DEV,
            {
                method: "get",
                credentials: "include",
                referrerPolicy: "origin",
            }
        )
        const body = await data.json()
        if (pathname.includes("recipe/edit/")) {
            const recipeId = pathname.split("edit/")[1]
            if (body?.recipes?.includes(recipeId)) {
                return body
            } else {
                return {}
            }
        } else if (!body.id) {
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

export async function handleFavorite(data) {
    const event = data[0]
    const id = data[1]
    const setUser = data[2]
    const isfav = event.target.id
    if (isfav === "isfav") {
        async function deleteFav() {
            return await fetch(
                process.env.NODE_ENV === "production"
                    ? import.meta.env.VITE_USERFAVRECIPES_ENDPOINT
                    : import.meta.env.VITE_USERFAVRECIPES_ENDPOINT_DEV,
                {
                    method: "DELETE",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ id: id }),
                }
            )
        }

        const body = await deleteFav()
        const message = await body.json()
        const newFavRecipes = message.Message
        setUser((prev) => ({
            ...prev,
            favrecipes: newFavRecipes,
        }))
    } else {
        async function addFav() {
            return await fetch(
                process.env.NODE_ENV === "production"
                    ? import.meta.env.VITE_USERFAVRECIPES_ENDPOINT
                    : import.meta.env.VITE_USERFAVRECIPES_ENDPOINT_DEV,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ id: id }),
                }
            )
        }

        const body = await addFav()
        const message = await body.json()
        const newFavRecipes = message.Message
        setUser((prev) => ({
            ...prev,
            favrecipes: newFavRecipes,
        }))
    }
}
export async function changePassword(formData) {
    return await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_USERDATA_ENDPOINT}/newpassword`
            : `${import.meta.env.VITE_USERDATA_ENDPOINT_DEV}/newpassword`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                formData,
            }),
        }
    )
}

export async function deleteUser() {
    await fetch(
        process.env.NODE_ENV === "production"
            ? import.meta.env.VITE_USERDATA_ENDPOINT
            : import.meta.env.VITE_USERDATA_ENDPOINT_DEV,
        {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }
    )
    await fetch(
        process.env.NODE_ENV === "production"
            ? import.meta.env.VITE_LOGOUT_ENDPOINT
            : import.meta.env.VITE_LOGOUT_ENDPOINT_DEV,
        {
            method: "POST",
            credentials: "include",
        }
    )
    return location.replace("/")
}
