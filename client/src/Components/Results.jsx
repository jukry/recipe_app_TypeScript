import recipes from "../assets/recipe-data"
import Fooditem from "./Fooditem"

export default function Results() {
    const foodItem = recipes.map((item) => {
        return <Fooditem props={item} key={item.id} />
        // MUUTA PROPS NIIN ETTEI VÄLITETÄ KUIN TARPEELLISET TIEDOT?
    })

    return (
        <section className="results-container">
            <div className="results">{foodItem}</div>
        </section>
    )
}
