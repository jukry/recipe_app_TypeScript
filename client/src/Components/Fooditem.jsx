import { Link } from "react-router-dom"

export default function Fooditem(props) {
    const data = props.props[0]
    const searchParams = props.props[1]

    function recipesFunc() {
        return (
            <Link
                to={`/recipe/${data.id}`}
                state={{
                    search: `?${searchParams}`,
                }}
                className="food-item"
                key={data.id}
            >
                <div className="img-container">
                    <img
                        src={
                            data.name.includes("Pasta")
                                ? "./public/pexels-engin-akyurt-1437267.jpg"
                                : "./public/istockphoto-474048190-612x612.jpg"
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
