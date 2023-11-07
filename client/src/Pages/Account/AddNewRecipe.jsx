import "./styles/newRecipe.css"
import RecipeDataContainer from "../../Components/RecipeDataContainer"
import { useState } from "react"

function AddNewRecipe() {
    document.title = "Lisää uusi resepti"
    const [recipe, setRecipe] = useState([])
    const [file, setFile] = useState({})
    const [previewFile, setPreviewFile] = useState()
    const [isLoading, setIsLoading] = useState(false)

    function handleChange(e) {
        setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleIngredientDelete(e) {
        const index = e.target.id.split("ingButton")[1]
        setRecipe((prev) => {
            delete prev[`amount${index}`]
            delete prev[`ingredient${index}`]
            return prev
        })
    }

    function handleStepDelete(e) {
        const index = e.target.id.split("stepButton")[1]
        setRecipe((prev) => {
            const step = `step${index}`
            delete prev[step]
            return prev
        })
    }

    function handleFileChange(e) {
        e.preventDefault()
        if (
            e.target.files?.length === 0 ||
            e.target.id === "delete-image-button"
        ) {
            setFile({})
            setPreviewFile(undefined)
            return
        }
        setFile(e.target.files[0])
        setPreviewFile(URL.createObjectURL(e.target.files[0]))
    }

    async function handleSubmit(e) {
        setIsLoading(true)
        e.preventDefault()
        const formData = new FormData()
        formData.append("imageUpload", file)

        const imageSend = await fetch(
            process.env.NODE_ENV === "production"
                ? `${import.meta.env.VITE_RECIPE_ENDPOINT}/upload`
                : `${import.meta.env.VITE_RECIPE_ENDPOINT_DEV}/upload`,
            {
                method: "POST",
                mode: "cors",
                credentials: "include",
                body: formData,
            }
        )
        const imageRes = await imageSend.json()
        const recipeRes = await fetch(
            process.env.NODE_ENV === "production"
                ? import.meta.env.VITE_RECIPE_ENDPOINT
                : import.meta.env.VITE_RECIPE_ENDPOINT_DEV,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    ...recipe,
                    images: [imageRes.secure_url || ""],
                }),
            }
        )
        if (!recipeRes.ok) {
            return recipeRes.status
        } else {
            location.replace("/account/myrecipes")
        }
    }
    return (
        <div id="new-recipe-container">
            <form
                method="post"
                id="new-recipe-form"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <RecipeDataContainer
                    props={{
                        recipe,
                        handleChange,
                        handleFileChange,
                        previewFile,
                        file,
                        setRecipe,
                        handleIngredientDelete,
                        handleStepDelete,
                    }}
                />
                <button disabled={isLoading}>
                    {!isLoading ? "Lähetä resepti" : "Lähetetään..."}
                </button>
            </form>
        </div>
    )
}
export default AddNewRecipe
