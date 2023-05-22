import React from "react"
import { useLoaderData } from "react-router-dom"
import Fooditem from "../../Components/Fooditem"
import "./styles/userRecipes.css"

export async function loader({ request, params }) {
    const userRecipes = await fetch(
        import.meta.env.VITE_USER_RECIPES_ENDPOINT,
        {
            method: "GET",
            credentials: "include",
        }
    )
    return userRecipes
}

export default function UserRecipes() {
    const loaderData = useLoaderData()
    function userRecipesMap() {
        return loaderData.data.map((item) => {
            return <Fooditem props={[item]} key={item._id} />
        })
    }
    const userRecipes = userRecipesMap()
    return <section className="user-recipes-container">{userRecipes}</section>
}
