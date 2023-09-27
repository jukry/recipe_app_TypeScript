import React, { useContext } from "react"
import Fooditem from "../../Components/Fooditem"
import "./styles/userRecipes.css"
import { useMutation, useQuery } from "@tanstack/react-query"
import fetchUserRecipes from "../../Hooks/fetchUserRecipes"
import Loader from "../../Components/Loader"
import AddNewRecipe from "./AddNewRecipe"
import "./styles/newRecipe.css"
import { getUserData } from "../../utils/utils"
import { UserContext } from "../../Context/UserContext"

export async function loader({ request }) {
    const res = await getUserData({ request })
    if (!res.id) {
        return redirect("/forbidden")
    }
    return null
}

export default function UserRecipes({ props }) {
    document.title = "Omat reseptisi"
    const queryResponse = useQuery(["userRecipes"], fetchUserRecipes)
    const recipes = queryResponse?.data?.data ?? []
    const { user, setUser } = useContext(UserContext)

    const mutation = useMutation({
        mutationFn: (id) => {
            return fetch(`${import.meta.env.VITE_RECIPE_ENDPOINT}/${id}`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ id: id }),
            })
        },
        onSuccess: async (data) => {
            queryResponse.refetch()
            const res = await data.json()
            const recipeMap = res.map((item) => item._id)
            setUser((prev) => ({
                ...prev,
                recipes: recipeMap,
            }))
        },
    })

    function userRecipesMap() {
        return recipes?.map((item) => {
            return (
                <Fooditem
                    props={[item, props, mutation.mutate]}
                    key={item._id}
                />
            )
        })
    }
    const userRecipes = userRecipesMap()

    return (
        <>
            {queryResponse.isLoading ? (
                <Loader />
            ) : recipes.length > 0 ? (
                <section className="user-recipes-container">
                    {userRecipes}
                </section>
            ) : (
                <>
                    <h3 id="no-recipes">
                        Omia reseptejä ei löytynyt, voit lisätä tästä uuden
                        reseptin
                    </h3>
                    <AddNewRecipe />
                </>
            )}
        </>
    )
}
