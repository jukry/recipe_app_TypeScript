import Fooditem from "./Fooditem"

export default function Results(props) {
    const recipeData = props.props

    const foodItem = recipeData.map((item) => {
        return <Fooditem props={item} key={item.id} />
        // MUUTA PROPS NIIN ETTEI VÄLITETÄ KUIN TARPEELLISET TIEDOT?
    })

    return (
        <div className="results">
            {recipeData.length == 0 ? "Ei mitään" : foodItem}
        </div>
    )
}
