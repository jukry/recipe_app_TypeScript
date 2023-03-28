import Fooditem from "./Fooditem"
import { Routes } from "react-router-dom"

export default function Results(props) {
    //const recipeData = props.props

    /* const foodItem = recipeData.map((item) => {
        return <Fooditem props={item} key={item.id} />
        // MUUTA PROPS NIIN ETTEI VÄLITETÄ KUIN TARPEELLISET TIEDOT?
    }) */

    return (
        <h1>Reseptit</h1>
        /* <div className="results">
            {recipeData.length == 0 ? (
                <h2>Reseptejä ei löytynyt hakusanalla</h2>
            ) : (
                foodItem
            )}
        </div> */
    )
}
