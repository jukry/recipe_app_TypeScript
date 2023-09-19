import React from "react"
import { useLoaderData } from "react-router-dom"
import Fooditem from "../../Components/Fooditem"
import "./styles/userRecipes.css"
import { useQuery } from "@tanstack/react-query"
import fetchUserRecipes from "../../Hooks/fetchUserRecipes"

export default function UserRecipes() {
    document.title = "Omat reseptisi"

    const queryResponse = useQuery(["userRecipes"], fetchUserRecipes)
    const recipes = queryResponse?.data?.data ?? []
    function userRecipesMap() {
        return recipes.map((item) => {
            return <Fooditem props={[item]} key={item._id} />
        })
    }
    const userRecipes = userRecipesMap()

    return <section className="user-recipes-container">{userRecipes}</section>
}
