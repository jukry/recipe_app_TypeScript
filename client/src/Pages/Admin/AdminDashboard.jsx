import { useQuery } from "@tanstack/react-query"
import React from "react"
import fetchRecipes from "../../Hooks/fetchRecipes"
import fetchUsersData from "../../Hooks/fetchUsersData"
import fetchComments from "../../Hooks/fetchComments"
import "./styles/adminDashboard.css"
import { NavLink } from "react-router-dom"

export default function AdminDashboard() {
    const queryResponseRecipes = useQuery(["recipes"], fetchRecipes)
    const queryResponseUsers = useQuery(["users"], fetchUsersData)
    const queryResponseComments = useQuery(["allcomments"], fetchComments)
    const recipeData = queryResponseRecipes?.data?.message ?? []
    const userData = queryResponseUsers?.data?.data ?? []
    const commentData = queryResponseComments?.data?.data ?? []
    return (
        <section id="admin-dashboard-container">
            <NavLink to="./recipes" id="recipes" className="data-wrapper">
                <p className="data-amount">{userData?.length}</p>
                <h3>Reseptiä</h3>
            </NavLink>
            <NavLink to="./users" id="users" className="data-wrapper">
                <p className="data-amount">{recipeData?.length}</p>
                <h3>Käyttäjää</h3>
            </NavLink>
            <NavLink to="./comments" id="comments" className="data-wrapper">
                <p className="data-amount">{commentData.length}</p>
                <h3>Kommenttia</h3>
            </NavLink>
        </section>
    )
}
