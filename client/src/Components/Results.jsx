import Fooditem from "./Fooditem"

export default function Results(props) {
    const recipeData = props.props
    console.log(recipeData)

    const foodItem = recipeData.map((item) => {
        return <Fooditem props={item} key={item.id} />
        // MUUTA PROPS NIIN ETTEI VÄLITETÄ KUIN TARPEELLISET TIEDOT?
    })

    return <div className="results">{foodItem}</div>
}
