import React from "react"
import Fooditem from "../../Components/Fooditem"
import "./styles/userRecipes.css"
import { useQuery } from "@tanstack/react-query"
import fetchUserRecipes from "../../Hooks/fetchUserRecipes"
import Loader from "../../Components/Loader"
import AddNewRecipe from "./AddNewRecipe"
import "./styles/newRecipe.css"

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
