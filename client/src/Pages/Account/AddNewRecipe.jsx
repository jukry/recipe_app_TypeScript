import "./styles/newRecipe.css"
import { Form, redirect, useActionData, useNavigation } from "react-router-dom"
import RecipeDataContainer from "../../Components/RecipeDataContainer"
import { getUserData } from "../../utils/utils"

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

export default function AddNewRecipe() {
    document.title = "Lisää uusi resepti"

    const navigation = useNavigation()
    const actionData = useActionData()
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
