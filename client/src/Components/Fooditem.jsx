export default function Fooditem({ props }) {
    return (
        <div className="food-item">
            <div className="img-container">
                <img src={props.images[0]} alt={props.description} />
            </div>
            <div className="recipe-info">
                <h2>{props.name}</h2>
                <p>{props.description}</p>
            </div>
        </div>
    )
}
