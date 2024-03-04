import { useQuery } from "@tanstack/react-query"
import React from "react"
import fetchAllRecipeData from "../../Hooks/fetchAllRecipeData"
import fetchUsersData from "../../Hooks/fetchUsersData"
import fetchComments from "../../Hooks/fetchComments"
import "./styles/adminDashboard.css"
import { NavLink } from "react-router-dom"
import { IComment, IRecipeDetails, User } from "../../utils/APIResponseTypes"

export default function AdminDashboard() {
    const queryResponseRecipes = useQuery(["allrecipes"], async () =>
        fetchAllRecipeData({ queryKey: "allrecipes" })
    )
    const queryResponseUsers = useQuery(["users"], async () =>
        fetchUsersData({ queryKey: "comments" })
    )
    const queryResponseComments = useQuery(["comments"], async () =>
        fetchComments({ queryKey: "comments" })
    )
    const recipeData: IRecipeDetails[] =
        queryResponseRecipes?.data?.message ?? []
    const userData: User[] = queryResponseUsers?.data?.data ?? []
    const commentData: IComment[] = queryResponseComments?.data?.data ?? []
    return (
        <section id="admin-dashboard-container">
            <NavLink to="./recipes" id="recipes" className="data-wrapper">
                <p className="data-amount">{recipeData?.length}</p>
                <h3>Reseptiä</h3>
            </NavLink>
            <NavLink to="./users" id="users" className="data-wrapper">
                <p className="data-amount">{userData?.length}</p>
                <h3>Käyttäjää</h3>
            </NavLink>
            <NavLink to="./comments" id="comments" className="data-wrapper">
                <p className="data-amount">{commentData.length}</p>
                <h3>Kommenttia</h3>
            </NavLink>
        </section>
    )
}
