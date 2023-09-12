import "./styles/newRecipe.css"
import { Form, redirect, useActionData, useNavigation } from "react-router-dom"
import RecipeDataContainer from "../../Components/RecipeDataContainer"

export async function action({ request }) {
    const formData = Object.fromEntries(await request.formData())

    async function sendRecipeData() {
        return await fetch(import.meta.env.VITE_RECIPE_ENDPOINT, {
            method: "POST",
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

    const res = await sendRecipeData()
    if (!res.ok) {
        return res.status
    } else {
        return redirect("/account/myrecipes")
    }
}

export default function AddNewRecipe() {
    const navigation = useNavigation()
    const actionData = "asd"
    return (
        <section id="new-recipe-container">
            <Form method="post" replace="true" id="new-recipe-form">
                {actionData && (
                    <h3 className="check-recipe-input">
                        Jotain meni pieleen, tarkista syöttämäsi tiedot
                    </h3>
                )}
                <RecipeDataContainer />
                <button disabled={navigation.state === "submitting"}>
                    {navigation.state === "idle"
                        ? "Lähetä resepti"
                        : "Lähetetään..."}
                </button>
            </Form>
        </section>
    )
}
