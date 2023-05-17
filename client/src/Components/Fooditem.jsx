import { Link } from "react-router-dom"

export default function Fooditem(props) {
    const data = props.props[0]
    const searchParams = props.props[1] ?? ""

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
                </div>
            </Link>
        )
    }
    const recipes = recipesFunc()

    return <div className="fooditem-container">{recipes}</div>
}
