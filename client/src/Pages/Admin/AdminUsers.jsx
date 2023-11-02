import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import fetchUsersData from "../../Hooks/fetchUsersData"
import { NavLink, useSearchParams } from "react-router-dom"
import "./styles/adminUsers.css"
import Paginate from "../../Components/Paginate"
import { createPortal } from "react-dom"
import DeleteModal from "../../Components/DeleteModal"
import {
    handleDeleteFromAdmin,
    handleRoleChangeFromAdmin,
    sortUser,
} from "../../utils/utils"
export default function AdminUsers() {
    const queryResponseUsers = useQuery(["users"], fetchUsersData)
    const userData = queryResponseUsers?.data?.data ?? []
    const [currentPage, setCurrentPage] = useState(1)
    const initialUsers = 20
    const [userSearchParams, setUserSearchParams] = useSearchParams()
    const [filter, setFilter] = useState(userSearchParams?.get("search") || "")
    const [sortFilter, setSortFilter] = useState("emailAsc")
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [userToDelete, setUserToDelete] = useState({
        email: "",
        _id: "",
        role: "",
    }) //TODO refactor to modal context?
    const adminAmount = userData.filter((user) => {
        return user.role === "Admin"
    }).length

    const users = userData

        .sort((a, b) => {
            return sortUser(sortFilter, a, b)
        })
        .filter((user) => {
            return user.email.toLowerCase().includes(filter.toLowerCase())
        })

        .map((user) => {
            return (
                <section className="admin-user-container" key={user._id}>
                    <section className="admin-userdata-container">
                        <h4>
                            {user.email} <span>|</span> {user.role}
                        </h4>
                        <p>
                            Käyttäjä luotu:{" "}
                            {new Date(user?.createdAt)?.toLocaleDateString(
                                "fi-FI"
                            )}
                        </p>
                        <p>
                            Viimeksi kirjautunut:{" "}
                            {new Date(user?.lastlogins[0])?.toLocaleDateString(
                                "fi-FI"
                            )}
                        </p>
                        <p>
                            <NavLink
                                to={`../recipes?email=${user.email}`}
                                className="navlink-to"
                            >
                                Omia reseptejä: {user.recipes.length}
                            </NavLink>
                        </p>
                        <p>
                            <NavLink
                                to={`../comments?email=${user.email}`}
                                className="navlink-to"
                            >
                                Käyttäjällä kommentteja: {user.comments?.length}
                            </NavLink>
                        </p>
                    </section>
                    <section className="admin-user-management-container">
                        <button
                            className="admin-delete-user"
                            onClick={() => {
                                setUserToDelete({
                                    email: user.email,
                                    _id: user._id,
                                    role: user.role,
                                })
                                setShowDeleteModal(true)
                            }}
                        >
                            Poista käyttäjä
                        </button>
                        <p>Muuta roolia</p>
                        <select
                            className="admin-change-user-role"
                            onChange={async (event) => {
                                const res = await handleRoleChangeFromAdmin(
                                    event.target.value,
                                    user._id,
                                    user.role
                                )

                                if (res.ok) {
                                    queryResponseUsers.refetch()
                                } else if (!res.ok) {
                                    document
                                }
                            }}
                            name="userRole"
                            defaultValue={user.role}
                        >
                            <option value="Admin">Admin</option>
                            <option value="User">Käyttäjä</option>
                        </select>
                    </section>
                </section>
            )
        })
    const maxPages = Math.ceil(users.length / initialUsers)

    const slicedUsers = users.slice(
        (currentPage - 1) * initialUsers,
        initialUsers * currentPage
    )

    return (
        <section id="admin-users-container">
            <h3>Käyttäjät</h3>
            <section id="admin-users-pagination-container">
                <Paginate
                    currentPage={currentPage}
                    maxPages={maxPages}
                    containerId="admin-users-nav-container"
                    backBtnId="admin-users-nav-back"
                    forwardBtnId="admin-users-nav-forward"
                    setCurrentPage={setCurrentPage}
                />
            </section>
            <section id="admin-users-filter-container">
                <section id="admin-users-email-filter-container">
                    <label
                        htmlFor="admin-user-filter-email"
                        id="admin-user-filter-email-label"
                    >
                        Suodata sähköpostilla
                    </label>
                    <input
                        type="search"
                        id="admin-user-filter-email"
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value)
                            setUserSearchParams({ search: e.target.value })
                        }}
                    />
                </section>
                <label htmlFor="admin-users-sort" id="admin-users-sort-label">
                    Lajittele tulokset
                </label>
                <select
                    id="admin-users-sort"
                    value={sortFilter}
                    onChange={(e) => {
                        setSortFilter(e.target.value)
                    }}
                >
                    <option value="emailAsc">Sähköposti: nouseva</option>
                    <option value="emailDesc">Sähköposti: laskeva</option>
                    <option value="createdAsc">
                        Luontipäivämäärä: nouseva
                    </option>
                    <option value="createdDesc">
                        Luontipäivämäärä: laskeva
                    </option>
                    <option value="recipesAsc">Reseptit: nouseva</option>
                    <option value="recipesDesc">Reseptit: laskeva</option>
                    <option value="commentsAsc">Kommentit: nouseva</option>
                    <option value="commentsDesc">Kommentit: laskeva</option>
                </select>
                <p>Tuloksia: {slicedUsers.length}</p>
            </section>

            <section id="admin-users-wrapper">{slicedUsers}</section>
            {showDeleteModal &&
                createPortal(
                    <DeleteModal
                        props={{
                            text: "Haluatko varmasti poistaa käyttäjän ",
                            name: userToDelete.email,
                        }}
                        onDelete={async () => {
                            const res = await handleDeleteFromAdmin(
                                userToDelete._id,
                                userToDelete.role,
                                adminAmount
                            )

                            if (res.ok) {
                                queryResponseUsers.refetch()
                            } else if (!res.ok) {
                                document
                            }
                        }}
                        onClose={(event) => {
                            if (event.target.className !== "delete-modal") {
                                event.preventDefault()
                                setShowDeleteModal(false)
                            }
                        }}
                    />,
                    document.getElementById("container")
                )}
        </section>
    )
}
