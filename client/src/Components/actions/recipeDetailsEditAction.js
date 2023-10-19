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
