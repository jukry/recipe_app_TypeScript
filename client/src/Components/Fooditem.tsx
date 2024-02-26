import { BaseSyntheticEvent, useContext, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import { createPortal } from "react-dom"
import DeleteModal from "./DeleteModal"
import { handleFavorite } from "../utils/utils"
import { UseMutationResult, useMutation } from "@tanstack/react-query"
import { RecipesShownContext } from "../Context/RecipesShownContext"
import {
    IRecipe,
    IRecipeDetails,
    IUserContext,
} from "../utils/APIResponseTypes"

export default function Fooditem(props: {
    item: IRecipeDetails | IRecipe
    searchParams?: URLSearchParams
    handleDelete?: UseMutationResult<
        Response,
        unknown,
        { id: string | undefined }
    >
}) {
    const data = props.item
    const searchParams = props.searchParams ?? ""
    const handleDelete = props.handleDelete
    const { setCurrentRecipe } = useContext(RecipesShownContext)
    const [showModal, setShowModal] = useState(false)
    const { user, dispatch } = useContext<IUserContext>(UserContext)
    const favrecipes = user?.favrecipes
    const container = document.getElementById("container")
    const { mutate, isLoading } = useMutation({
        //TODO optimistic update
        mutationFn: handleFavorite,
    })

    function recipesFunc() {
        return (
            <>
                <Link
                    to={`/recipe/${data.id || data._id}`}
                    state={{
                        search: `?${searchParams}`,
                        referrer: location.pathname,
                    }}
                    onClick={() => {
                        if (!setCurrentRecipe) return null
                        setCurrentRecipe(data.id as string)
                    }}
                    className="food-item"
                    id={data.id || data._id}
                    key={data.id || data._id}
                    aria-label={`Resepti ${data.name}`}
                >
                    <div className="img-container">
                        <img
                            src={data.images || "/pexels-jane-doan-1099680.jpg"}
                            alt={data.images ? "Kuva ateriasta" : "Vakiokuva"}
                            className={
                                data.images ? "" : "fooditem-stock-image"
                            }
                        />
                    </div>
                    <div className="recipe-info">
                        <h2>{data.name}</h2>
                        <div>
                            <p className="recipe-description">
                                {data.description}
                            </p>
                        </div>
                        <button
                            className="fav-heart"
                            onClick={(event) => {
                                event.stopPropagation()
                                event.preventDefault()
                                mutate([
                                    event,
                                    data._id || data.id,
                                    dispatch,
                                    user,
                                ])
                            }}
                            disabled={isLoading}
                        >
                            {favrecipes?.includes(
                                (data.id as string) || (data._id as string)
                            ) ? (
                                <span
                                    title="Poista resepti suosikeista"
                                    className="isfav"
                                    aria-label="Poista resepti suosikeista"
                                    key={data.id || data._id}
                                    tabIndex={0}
                                >
                                    &#x2665;
                                </span>
                            ) : (
                                <span
                                    title="Lisää resepti suosikkeihin"
                                    className="notfav"
                                    aria-label="Lisää resepti suosikkeihin"
                                    key={data.id || data._id}
                                    tabIndex={0}
                                >
                                    &#x2661;
                                </span>
                            )}
                        </button>
                    </div>
                </Link>
                <div className="recipe-management">
                    {location.href.includes("account/myrecipes") ? (
                        <Link
                            to={`/recipe/edit/${data._id || data.id}`}
                            className="edit-button"
                            title="Muokkaa reseptiä"
                            aria-label="Muokkaa reseptiä"
                        >
                            &#9998;
                        </Link>
                    ) : (
                        ""
                    )}
                    {location.href.includes("account/myrecipes") ? (
                        <button
                            className="delete-button"
                            title="Poista resepti"
                            aria-label="Poista resepti"
                            onClick={() => {
                                setShowModal((prev) => !prev)
                            }}
                        >
                            &#128465;
                        </button>
                    ) : (
                        ""
                    )}
                    {showModal &&
                        container &&
                        createPortal(
                            <DeleteModal
                                data={{
                                    text: "Haluatko poistaa reseptin ",
                                    name: data.name + "?",
                                }}
                                onDelete={(event: BaseSyntheticEvent) => {
                                    if (event.target.id === "delete-yes") {
                                        if (!handleDelete) return null
                                        handleDelete.mutateAsync({
                                            id: data._id,
                                        })
                                    }
                                }}
                                onClose={(event: BaseSyntheticEvent) => {
                                    if (
                                        event.target.className !==
                                        "delete-modal"
                                    ) {
                                        event.preventDefault()
                                        setShowModal(false)
                                    }
                                }}
                            />,
                            container
                        )}
                </div>
            </>
        )
    }

    const recipes = recipesFunc()

    return (
        <div
            className="fooditem-container"
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    setShowModal(false)
                }
            }}
        >
            {recipes}
        </div>
    )
}
