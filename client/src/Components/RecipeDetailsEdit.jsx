import { Form, redirect, useNavigation, useParams } from "react-router-dom"
import "./recipeDetailsEdit.css"
import { useQuery } from "@tanstack/react-query"
import fetchRecipeById from "../Hooks/fetchRecipeById.js"
import { getUserData } from "../utils/utils"

export async function action({ request }) {
    const id = request.url.split("edit/")[1]
    const formData = Object.fromEntries(await request.formData())
    async function sendUpdatedRecipe() {
        return await fetch(`${import.meta.env.VITE_RECIPE_ENDPOINT}/${id}`, {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                formData,
            }),
        })
    }

    const res = await sendUpdatedRecipe()
    if (!res.ok) {
        return res.status
    } else {
        location.replace("/account/myrecipes")
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
                <div className="instructions-edit">
                    <h3>Valmistusohje</h3>

                    {data?.instructions?.map((item, i) => {
                        return (
                            <input
                                name={`step${i + 1}`}
                                placeholder={`Vaihe ${i + 1}: ${item}`}
                                key={i}
                            ></input>
                        )
                    })}
                </div>
                <div className="ingredients-edit">
                    <h3>Ainesosat</h3>
                    {data?.ingredients?.map((item, i) => {
                        return (
                            <div className="ingr-line-edit" key={i}>
                                <input
                                    name={`amount${i + 1}`}
                                    placeholder={`Aineosa ${i + 1} määrä: ${
                                        item.amount
                                    }`}
                                    className="ingr-amount-edit"
                                ></input>
                                <input
                                    name={`ingredient${i + 1}`}
                                    placeholder={`Aineosa ${i + 1}: ${
                                        item.ingredient
                                    }`}
                                ></input>
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
