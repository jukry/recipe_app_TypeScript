import { Link } from "react-router-dom"

export default function Fooditem(props) {
    const data = props.props[0]
    const searchParams = props.props[1]

    function recipesFunc() {
        return (
            <Link
                to={`/recipes/${data.id}`}
                props={props}
                state={{
                    search: `?${searchParams}`,
                }}
                className="food-item"
                key={data.id}
            >
                <div className="img-container">
                    <img src={data.images[0]} alt={data.description} />
                </div>
                <div className="recipe-info">
                    <h2>{data.name}</h2>
                    <p>{data.description}</p>
                </div>
            </Link>
        )
    }
    const recipes = recipesFunc()

    return <section className="recipe-list">{recipes}</section>
}
