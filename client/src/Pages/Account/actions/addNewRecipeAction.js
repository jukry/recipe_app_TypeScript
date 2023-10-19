export async function action({ request }) {
    const formData = Object.fromEntries(await request.formData())

    async function sendRecipeData() {
        return await fetch(
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
                    formData,
                }),
            }
        )
    }

    const res = await sendRecipeData()
    if (!res.ok) {
        return res.status
    } else {
        location.replace("/account/myrecipes")
        return null
    }
}
