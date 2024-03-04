import { useQuery } from "@tanstack/react-query"
import React, { BaseSyntheticEvent, useState } from "react"
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
import { User } from "../../utils/APIResponseTypes"
export default function AdminUsers() {
    const container: HTMLElement | null = document.getElementById("container")
    if (!container) {
        throw new Error("No container")
    }
    const queryResponseUsers = useQuery(["users"], async () =>
        fetchUsersData({ queryKey: "users" })
    )
    const userData: User[] = queryResponseUsers?.data?.data ?? []
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
            return user?.email?.toLowerCase().includes(filter.toLowerCase())
        })

        .map((user) => {
            const createdAt = user?.createdAt
                ? new Date(user.createdAt)
                : new Date()
            return (
                <div className="admin-user-container" key={user._id}>
                    <section className="admin-userdata-container">
                        <h4 tabIndex={0}>
                            <span className="visuallyhidden">
                                Käyttäjän sähköpostiosoite{" "}
                            </span>
                            {user.email} <span>|</span>{" "}
                            <span className="visuallyhidden">
                                Käyttäjän rooli
                            </span>{" "}
                            {user.role}
                        </h4>
                        <p tabIndex={0}>
                            Käyttäjä luotu:{" "}
                            {createdAt.toLocaleDateString("fi-FI")}
                        </p>
                        {user?.lastlogins && (
                            <p tabIndex={0}>
                                Viimeksi kirjautunut:{" "}
                                {new Date(
                                    user?.lastlogins[0]
                                )?.toLocaleDateString("fi-FI")}
                            </p>
                        )}
                        <p>
                            <NavLink
                                to={`../recipes?email=${user.email}`}
                                className="navlink-to"
                            >
                                Omia reseptejä: {user?.recipes?.length}
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
                    <div className="admin-user-management-container">
                        <button
                            className="admin-delete-user"
                            onClick={() => {
                                setUserToDelete({
                                    email: user.email as string,
                                    _id: user._id as string,
                                    role: user.role as string,
                                })
                                setShowDeleteModal(true)
                            }}
                        >
                            Poista käyttäjä
                        </button>
                        <p id="aria-change-role">Muuta roolia</p>
                        <select
                            className="admin-change-user-role"
                            aria-labelledby="aria-change-role"
                            onChange={async (event) => {
                                const res = await handleRoleChangeFromAdmin(
                                    event.target.value,
                                    user._id as string,
                                    user.role as string,
                                    adminAmount
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
                    </div>
                </div>
            )
        })
    const maxPages = Math.ceil(users.length / initialUsers)

    const slicedUsers = users.slice(
        (currentPage - 1) * initialUsers,
        initialUsers * currentPage
    )

    return (
        <section id="admin-users-container">
            <h3 tabIndex={0}>Käyttäjät</h3>
            <div id="admin-users-pagination-container">
                <Paginate
                    currentPage={currentPage}
                    maxPages={maxPages}
                    containerId="admin-users-nav-container"
                    backBtnId="admin-users-nav-back"
                    forwardBtnId="admin-users-nav-forward"
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <div id="admin-users-filter-container">
                <div id="admin-users-email-filter-container">
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
                </div>
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
                <p tabIndex={0}>Tuloksia: {userData.length}</p>
            </div>

            <div id="admin-users-wrapper">{slicedUsers}</div>
            {showDeleteModal &&
                createPortal(
                    <DeleteModal
                        data={{
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
                        onClose={(event: BaseSyntheticEvent) => {
                            if (event.target.className !== "delete-modal") {
                                event.preventDefault()
                                setShowDeleteModal(false)
                            }
                        }}
                    />,
                    container
                )}
        </section>
    )
}
