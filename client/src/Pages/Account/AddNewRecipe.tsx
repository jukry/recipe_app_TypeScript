import "./styles/newRecipe.css"
import RecipeDataContainer from "../../Components/RecipeDataContainer"
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react"
import { INewRecipe } from "../../utils/APIResponseTypes"

function AddNewRecipe() {
    document.title = "Lisää uusi resepti"
    const [recipe, setRecipe] = useState<INewRecipe>({})
    const [file, setFile] = useState<File | undefined>()
    const [previewFile, setPreviewFile] = useState<string | undefined>()
    const [isLoading, setIsLoading] = useState(false)
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    function handleIngredientDelete(e: string) {
        const index = e?.split("ingButton")[1]
        setRecipe((prev: {}) => {
            const amountProperty: string = `amount${index}`
            const ingredientProperty: string = `ingredient${index}`
            delete prev[amountProperty as keyof {}]
            delete prev[ingredientProperty as keyof {}]
            return prev
        })
    }

    function handleStepDelete(e: string) {
        const index = e.split("stepButton")[1]
        setRecipe((prev: {}) => {
            const step = `step${index}`
            delete prev[step as keyof {}]
            return prev
        })
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        if (!e.target.files) {
            return
        }
        const imageFile: File = e.target.files[0]
        const URLImageObject = URL.createObjectURL(imageFile)
        setFile(imageFile)
        setPreviewFile(URLImageObject)
    }

    function handleFileDelete(e: MouseEvent) {
        setFile(undefined)
        setPreviewFile(undefined)
        return
    }

    async function handleSubmit(e: FormEvent) {
        setIsLoading(true)
        e.preventDefault()
        const formData = new FormData()
        if (file) {
            formData.append("imageUpload", file)
        }

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
                        recipe: recipe,
                        handleChange: handleChange,
                        handleFileChange: handleFileChange,
                        previewFile: previewFile,
                        file: file,
                        setRecipe: setRecipe,
                        handleIngredientDelete: handleIngredientDelete,
                        handleStepDelete: handleStepDelete,
                        handleFileDelete: handleFileDelete,
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
