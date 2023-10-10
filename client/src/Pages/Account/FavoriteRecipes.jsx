import React, { useContext } from "react"
import "./styles/account.css"
import { getUserData } from "../../utils/utils"
import { redirect, useLoaderData } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"
import { useQuery } from "@tanstack/react-query"
import fetchRecipes from "../../Hooks/fetchRecipes"
import Fooditem from "../../Components/Fooditem"
import "./styles/favRecipes.css"

export async function loader({ request }) {
    const res = await getUserData({ request })
    if (!res.id) {
        return redirect("/login")
    }
    return res
}

export default function FavoriteRecipes() {
    document.title = "Suosikkireseptisi"
    const queryResponse = useQuery(["recipes"], fetchRecipes)
    const favRecipes = queryResponse?.data?.message ?? []
    const context = useContext(UserContext)
    function favRecipesMap() {
        return favRecipes?.map((item) => {
            if (context.user.favrecipes.includes(item.id)) {
                return <Fooditem props={[item]} key={item.id} />
            }
        })
    }
    const userFavRecipes = favRecipesMap()

    return <section className="favrecipes-container">{userFavRecipes}</section>
}
