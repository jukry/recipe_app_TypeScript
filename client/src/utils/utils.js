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
        newStepField.setAttribute("id", `step${stepListLength + 1}`)
        newStepField.setAttribute("name", `step${stepListLength + 1}`)

        stepList.append(newStepField)
    } else if (button === "button-add-step-edit") {
        const stepList = document.getElementById("instructions-edit")
        const stepListLength =
            stepList.getElementsByClassName("recipe-step-edit").length
        const stepListIndex =
            Number(
                stepList.lastChild.className
                    .split("recipe-step-container-")[1]
                    .split(" ")[0]
            ) + 1
        if (stepListLength >= 50) {
            return null //viesti ettei enempää rivejä voi lisätä
        }
        const newStepField = document.createElement("input")
        newStepField.setAttribute("class", "recipe-step-edit")
        newStepField.setAttribute("type", "text")
        newStepField.setAttribute("placeholder", "Kirjoita vaihe")
        newStepField.setAttribute("id", `step${stepListIndex}`)
        newStepField.setAttribute("name", `step${stepListIndex}`)

        const newStepFieldContainer = document.createElement("section")
        newStepFieldContainer.setAttribute(
            "class",
            `recipe-step-container-${stepListIndex} recipe-step-container`
        )

        const deleteRowButton = document.createElement("button")
        deleteRowButton.setAttribute(
            "class",
            `delete-button-${stepListIndex} delete-step-button`
        )
        deleteRowButton.setAttribute(
            "id",
            `delete-step-button-${stepListIndex}`
        )
        deleteRowButton.setAttribute("type", "button")
        deleteRowButton.innerHTML = "-"
        deleteRowButton.addEventListener("click", deleteStepRow)
        stepList.append(newStepFieldContainer)
        newStepFieldContainer.append(newStepField)
        newStepFieldContainer.append(deleteRowButton)
    } else if (button === "button-add-ingredient-edit") {
        const ingredientList = document.getElementById("ingredients-edit")
        const ingredientListLength =
            ingredientList.getElementsByClassName("ingr-line-edit").length
        const ingredientListIndex =
            Number(
                ingredientList.lastChild.className
                    .split("ingr-line-edit-")[1]
                    .split(" ")[0]
            ) + 1
        if (ingredientListLength >= 50) {
            return null //viesti ettei enempää rivejä voi lisätä
        }
        const newSection = document.createElement("div")
        newSection.setAttribute(
            "class",
            `ingr-line-edit-${ingredientListIndex} ingr-line-edit`
        )
        newSection.setAttribute(
            "id",
            `ingr-line-container-${ingredientListIndex}`
        )
        ingredientList.append(newSection)

        const newAmountField = document.createElement("input")
        newAmountField.setAttribute("class", "ingr-amount-edit")
        newAmountField.setAttribute("type", "text")
        newAmountField.setAttribute(
            "placeholder",
            "Anna ainesosan määrä (esim. 200g)"
        )
        newAmountField.setAttribute("id", `amount-${ingredientListIndex}`)
        newAmountField.setAttribute("name", `amount${ingredientListIndex}`)

        const newIngredientField = document.createElement("input")
        newIngredientField.setAttribute("class", "ingr-edit")
        newIngredientField.setAttribute("type", "text")
        newIngredientField.setAttribute("placeholder", "Anna ainesosa")
        newIngredientField.setAttribute(
            "id",
            `ingredient-${ingredientListIndex}`
        )
        newIngredientField.setAttribute(
            "name",
            `ingredient${ingredientListIndex}`
        )

        newSection.append(newAmountField, newIngredientField)
    }
}
export function deleteStepRow(e) {
    const id = e.target.className.split("delete-button-")[1].split(" ")[0]
    const allInputs = document
        .getElementById("instructions-edit")
        .querySelectorAll("input")
    for (const [_, entry] of allInputs.entries()) {
        const entryId = entry.name.split("step")[1]
        if (entryId > id && entry.value) {
            entry.setAttribute("name", `step${entryId - 1}`)
            entry.setAttribute("id", `step${entryId - 1}`)
            entry.parentElement.setAttribute(
                "class",
                `recipe-step-container-${entryId - 1} recipe-step-container`
            )
            const deleteButton = document.getElementById(
                `delete-step-button-${entryId}`
            )

            deleteButton.setAttribute("id", `delete-step-button-${entryId - 1}`)
            deleteButton.setAttribute(
                "class",
                `delete-button-${entryId - 1} delete-step-button`
            )
        }
    }
    const recipeStep = document.getElementById(`step${id}`)
    const elementId = e.target.parentElement.parentElement.id
    const stepList = document.getElementById(elementId)

    recipeStep.parentElement.remove()
}
export function deleteIngredientRow(e) {
    const elementId = e.target.parentElement.id
    const parentElement = document.getElementById(elementId)
    parentElement.remove()
}

export async function handleFavorite(data) {
    const event = data[0]
    const id = data[1]
    const dispatch = data[2]
    const user = data[3]
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
        dispatch({
            type: "UPDATEFAV",
            payload: [{ ...user, favrecipes: newFavRecipes }],
        })
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
        dispatch({
            type: "UPDATEFAV",
            payload: [{ ...user, favrecipes: newFavRecipes }],
        })
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

export function commentTime(timeDelta) {
    return timeDelta * 60 < 60 // < 1 minute ago
        ? "Juuri nyt"
        : timeDelta >= 1 && timeDelta < 2 // 1 minute ago
        ? "1 minuutti sitten"
        : timeDelta < 60 //x minutes ago
        ? `${Math.round(timeDelta)} minuuttia sitten`
        : timeDelta / 60 < 24 //x hours ago
        ? `${Math.round(timeDelta / 60)} tuntia sitten`
        : timeDelta / 60 >= 24 && //1 day ago
          timeDelta / 60 <= 48
        ? `${Math.round(timeDelta / 60 / 24)} päivä sitten`
        : timeDelta / 60 >= 48 && //2-30 days ago
          timeDelta / 60 / 24 < 30
        ? `${Math.round(timeDelta / 60 / 24)} päivää sitten`
        : timeDelta / 60 / 24 >= 30 && // 1 month ago
          timeDelta / 60 / 24 < 60
        ? `${Math.round(timeDelta / 60 / 24 / 30)} kuukausi sitten`
        : timeDelta / 60 / 24 >= 60 && //x months ago
          timeDelta / 60 / 24 < 365
        ? `${Math.round(timeDelta / 60 / 24 / 30)} kuukautta sitten`
        : timeDelta / 60 / 24 >= 365 && //1 year ago
          timeDelta / 60 / 24 < 730
        ? "1 vuosi sitten"
        : `${Math.floor(
              timeDelta / 60 / 24 / 30 / 12 //x years ago
          )} vuotta sitten`
}
export async function postComment(commentData, id, userId) {
    return await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_COMMENTS_ENDPOINT}`
            : `${import.meta.env.VITE_COMMENTS_ENDPOINT_DEV}`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                commentData,
                id,
                userId,
            }),
        }
    )
}
export async function changeEmail(formData) {
    return await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_USERDATA_ENDPOINT}/changeemail`
            : `${import.meta.env.VITE_USERDATA_ENDPOINT_DEV}/changeemail`,
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
export const handleDeleteFromAdmin = async (id, role, adminAmount) => {
    return await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_USERDATA_ENDPOINT}/${id}`
            : `${import.meta.env.VITE_USERDATA_ENDPOINT_DEV}/${id}`,
        {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                role: role,
                adminAmount: adminAmount,
            }),
        }
    )
}
export const handleRoleChangeFromAdmin = async (
    newRole,
    id,
    role,
    adminAmount
) => {
    return await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_USERDATA_ENDPOINT}/${id}`
            : `${import.meta.env.VITE_USERDATA_ENDPOINT_DEV}/${id}`,
        {
            method: "PATCH",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                role: role,
                newRole: newRole,
                adminAmount: adminAmount,
            }),
        }
    )
}
