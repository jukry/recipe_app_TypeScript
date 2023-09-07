import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../Context/UserContext"

export default function Fooditem(props) {
    const data = props.props[0]
    const searchParams = props.props[1] ?? ""
    const { user, setUser } = useContext(UserContext)
    const { favrecipes } = user

    async function handleFavorite(event) {
        const isfav = event.target.id
        if (isfav === "isfav") {
            async function deleteFav() {
                return await fetch(
                    import.meta.env.VITE_USERFAVRECIPES_ENDPOINT,
                    {
                        method: "DELETE",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({ id: data.id || data._id }),
                    }
                )
            }

            const body = await deleteFav()
            const message = await body.json()
            const newFavRecipes = message.Message
            setUser((prev) => ({
                ...prev,
                favrecipes: newFavRecipes,
            }))
        } else {
            async function addFav() {
                return await fetch(
                    import.meta.env.VITE_USERFAVRECIPES_ENDPOINT,
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({ id: data.id || data._id }),
                    }
                )
            }

            const body = await addFav()
            const message = await body.json()
            const newFavRecipes = message.Message
            setUser((prev) => ({
                ...prev,
                favrecipes: newFavRecipes,
            }))
        }
    }

    function recipesFunc() {
        return (
            <Link
                to={`/recipe/${data.id || data._id}`}
                state={{
                    search: `?${searchParams}`,
                }}
                className="food-item"
                key={data.id || data._id}
            >
                <div className="img-container">
                    <img
                        src={
                            data.name.includes("Pasta")
                                ? "https://images.pexels.com/photos/10966377/pexels-photo-10966377.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                                : "https://images.pexels.com/photos/10480245/pexels-photo-10480245.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                        }
                        alt="Kuva tulossa"
                    />
                </div>
                <div className="recipe-info">
                    <h2>{data.name}</h2>
                    <p>{data.description}</p>
                    <button
                        className="fav-heart"
                        onClick={(event) => {
                            event.stopPropagation()
                            event.preventDefault()
                            handleFavorite(event, data._id)
                        }}
                    >
                        {favrecipes?.includes(data.id || data._id) ? (
                            <p id="isfav" key={data.id || data._id}>
                                &#x2665;
                            </p>
                        ) : (
                            <p id="notfav" key={data.id}>
                                &#x2661;
                            </p>
                        )}
                    </button>
                </div>
            </Link>
        )
    }
    const recipes = recipesFunc()

    return <div className="fooditem-container">{recipes}</div>
}
