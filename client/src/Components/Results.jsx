import recipes from "../assets/recipe-data"
import Fooditem from "./Fooditem"

export default function Results() {
    console.log(recipes)
    const foodItem = recipes.map((item) => {
        return <Fooditem props={item} key={item.id} />
    })

    return <section className="results">{foodItem}</section>
}
