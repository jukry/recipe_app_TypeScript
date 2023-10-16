import { Form, redirect, useNavigation, useParams } from "react-router-dom"
import "./Styles/recipeDetailsEdit.css"
import { useQuery } from "@tanstack/react-query"
import fetchRecipeById from "../Hooks/fetchRecipeById.js"
import {
    addRow,
    deleteIngredientRow,
    deleteStepRow,
    getUserData,
} from "../utils/utils"

export async function action({ request }) {
    const id = request.url.split("edit/")[1]
    const formData = Object.fromEntries(await request.formData())
    async function sendUpdatedRecipe() {
        return await fetch(
            process.env.NODE_ENV === "production"
                ? `${import.meta.env.VITE_RECIPE_ENDPOINT}/${id}`
                : `${import.meta.env.VITE_RECIPE_ENDPOINT_DEV}/${id}`,
            {
                method: "PATCH",
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

    const res = await sendUpdatedRecipe()
    if (!res.ok) {
        return res.status
    } else {
        location.replace("/account/myrecipes")
        return null
    }
}

export async function loader({ request }) {
    const res = await getUserData({ request })
    if (!res.id) {
        return redirect("/forbidden")
    }
    return null
}

export default function RecipeDetailsEdit() {
    const params = useParams()
    const queryResponse = useQuery(["recipe", params.id], fetchRecipeById)
    const data = queryResponse?.data?.message ?? []
    const navigation = useNavigation()
    document.title = data.name

    return data !== undefined ? (
        <Form method="post" replace="true" className="recipe-wrapper-edit">
            <div className="recipe-hero-edit">
                <img src={`../${data.images}`} alt="Kuva tulossa" />
                <input
                    name="name"
                    id="recipe-name"
                    placeholder={`Reseptin nimi: ${data.name}`}
                ></input>
                <input
                    name="description"
                    id="recipe-description"
                    placeholder={`Reseptin kuvaus: ${data.description}`}
                ></input>
            </div>
            <div className="recipe-data-edit">
                <div id="instructions-edit">
                    <h3>Valmistusohje</h3>
                    <button
                        type="button"
                        id="button-add-step-edit"
                        onClick={addRow}
                    >
                        Lisää vaihe
                    </button>
                    {data?.instructions?.map((item, i) => {
                        return (
                            <section
                                className={`recipe-step-container-${
                                    i + 1
                                } recipe-step-container`}
                                key={i}
                            >
                                <input
                                    name={`step${i + 1}`}
                                    placeholder={`Vaihe ${i + 1}: ${item}`}
                                    className="recipe-step-edit"
                                    id={`step${i + 1}`}
                                    type="text"
                                ></input>
                                {i >= 1 ? (
                                    <button
                                        className={`delete-button-${
                                            i + 1
                                        } delete-step-button`}
                                        type="button"
                                        onClick={deleteStepRow}
                                        id={`delete-step-button-${i + 1}`}
                                    >
                                        -
                                    </button>
                                ) : (
                                    ""
                                )}
                            </section>
                        )
                    })}
                </div>
                <div id="ingredients-edit">
                    <h3>Ainesosat</h3>
                    <button
                        type="button"
                        id="button-add-ingredient-edit"
                        onClick={addRow}
                    >
                        Lisää ainesosa
                    </button>
                    {data?.ingredients?.map((item, i) => {
                        return (
                            <div
                                className={`ingr-line-edit-${
                                    i + 1
                                } ingr-line-edit`}
                                key={i}
                                id={`ingr-line-container-${i + 1}`}
                            >
                                <input
                                    name={`amount${i + 1}`}
                                    placeholder={`Aineosa ${i + 1} määrä: ${
                                        item.amount
                                    }`}
                                    className="ingr-amount-edit"
                                    id={`amount${i + 1}`}
                                ></input>
                                <input
                                    name={`ingredient${i + 1}`}
                                    placeholder={`Aineosa ${i + 1}: ${
                                        item.ingredient
                                    }`}
                                    className="ingr-edit"
                                    id={`ingredient${i + 1}`}
                                ></input>
                                {i >= 1 ? (
                                    <button
                                        className={`delete-ingredient-button-${
                                            i + 1
                                        } delete-ingredient-button`}
                                        type="button"
                                        onClick={deleteIngredientRow}
                                    >
                                        -
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
            <button
                id="update-recipe"
                disabled={navigation.state === "submitting"}
            >
                {navigation.state === "idle"
                    ? "Päivitä resepti"
                    : "Päivitetään..."}
            </button>
        </Form>
    ) : (
        <h3>Ei mtn</h3>
    )
}
