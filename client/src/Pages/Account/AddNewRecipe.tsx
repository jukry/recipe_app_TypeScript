import "./styles/newRecipe.css"
import RecipeDataContainer from "../../Components/RecipeDataContainer"
import { ChangeEvent, FormEvent, useState } from "react"

function AddNewRecipe() {
    document.title = "Lisää uusi resepti"
    const [recipe, setRecipe] = useState({})
    const [file, setFile] = useState<Blob | undefined>()
    const [previewFile, setPreviewFile] = useState<string | undefined>()
    const [isLoading, setIsLoading] = useState(false)
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    console.log(recipe)
    function handleIngredientDelete(e: ChangeEvent<HTMLInputElement>) {
        const index = e?.target?.id.split("ingButton")[1]
        setRecipe((prev: {}) => {
            const amountProperty: string = `amount${index}`
            const ingredientProperty: string = `ingredient${index}`
            delete prev[amountProperty as keyof {}]
            delete prev[ingredientProperty as keyof {}]
            return prev
        })
    }

    function handleStepDelete(e: ChangeEvent<HTMLInputElement>) {
        const index = e.target.id.split("stepButton")[1]
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
        const imageFile: Blob = e.target.files[0]
        if (
            e.target.files?.length === 0 ||
            e.target.id === "delete-image-button"
        ) {
            setFile(undefined)
            setPreviewFile(undefined)
            return
        }
        const URLImageObject = URL.createObjectURL(imageFile)
        setFile(imageFile)
        setPreviewFile(URLImageObject)
        console.log(URLImageObject)
    }

    async function handleSubmit(e: FormEvent) {
        setIsLoading(true)
        e.preventDefault()
        const formData = new FormData()
        console.log(file)
        if (file) {
            console.log("IF FILE")
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
            //location.replace("/account/myrecipes")
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
                    }}
                    /* recipe={recipe}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    previewFile={previewFile}
                    file={file}
                    setRecipe={setRecipe}
                    handleIngredientDelete={handleIngredientDelete}
                    handleStepDelete={handleStepDelete} */
                />
                <button disabled={isLoading}>
                    {!isLoading ? "Lähetä resepti" : "Lähetetään..."}
                </button>
            </form>
        </div>
    )
}
export default AddNewRecipe
