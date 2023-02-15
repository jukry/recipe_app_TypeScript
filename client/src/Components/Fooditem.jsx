export default function Fooditem({ props }) {
    return (
        <div>
            <img src={props.images[0]} alt={props.description} />
            <h2>{props.name}</h2>
            <p>Tietoa reseptistä</p>
        </div>
    )
}
