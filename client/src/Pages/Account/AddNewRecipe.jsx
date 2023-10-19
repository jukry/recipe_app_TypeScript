import "./styles/newRecipe.css"
import { Form, useActionData, useNavigation } from "react-router-dom"
import RecipeDataContainer from "../../Components/RecipeDataContainer"

function AddNewRecipe() {
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
export default AddNewRecipe
