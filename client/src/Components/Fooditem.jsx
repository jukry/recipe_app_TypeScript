import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import { createPortal } from "react-dom"
import DeleteModal from "./DeleteModal"
import { handleFavorite } from "../utils/utils"
import { useMutation } from "@tanstack/react-query"
import { RecipesShownContext } from "../Context/RecipesShownContext"

export default function Fooditem(props) {
    const data = props.props[0]
    const searchParams = props.props[1] ?? ""
    const handleDelete = props.props[2]
    const { setCurrentRecipe } = useContext(RecipesShownContext)
    const [showModal, setShowModal] = useState(false)
    const { user, dispatch } = useContext(UserContext)
    const { favrecipes } = user

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
                        setCurrentRecipe(data.id)
                    }}
                    className="food-item"
                    id={data.id || data._id}
                    key={data.id || data._id}
                >
                    <div className="img-container">
                        <img src={data.images} alt="Kuva tulossa" />
                    </div>
                    <div className="recipe-info">
                        <h2>{data.name}</h2>
                        <p>{data.description}</p>
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
                            {favrecipes?.includes(data.id || data._id) ? (
                                <p
                                    title="Poista resepti suosikeista"
                                    id="isfav"
                                    key={data.id || data._id}
                                >
                                    &#x2665;
                                </p>
                            ) : (
                                <p
                                    title="Lisää resepti suosikkeihin"
                                    id="notfav"
                                    key={data.id || data._id}
                                >
                                    &#x2661;
                                </p>
                            )}
                        </button>
                    </div>
                </Link>
                <section className="recipe-management">
                    {location.href.includes("account/myrecipes") ? (
                        <Link
                            to={`/recipe/edit/${data._id || data.id}`}
                            className="edit-button"
                            title="Muokkaa reseptiä"
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
                        createPortal(
                            <DeleteModal
                                props={{
                                    text: "Haluatko poistaa reseptin ",
                                    name: data.name,
                                    id: data._id,
                                }}
                                onDelete={(event) => {
                                    if (event.target.id === "delete-yes") {
                                        handleDelete(data._id)
                                    }
                                }}
                                onClose={(event) => {
                                    if (
                                        event.target.className !==
                                        "delete-modal"
                                    ) {
                                        event.preventDefault()
                                        setShowModal(false)
                                    }
                                }}
                            />,
                            document.getElementById("container")
                        )}
                </section>
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
