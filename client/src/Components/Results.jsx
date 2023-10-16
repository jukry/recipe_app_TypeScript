import { useState } from "react"
import Fooditem from "./Fooditem"

export default function Results(props) {
    const initialRecipes = 6
    const recipeData = props.props[0]
    const [recipesShown, setRecipesShown] = useState(initialRecipes)
    const searchParams = props.props[1]
    document.title = "Reseptit"
    const foodItem = recipeData.slice(0, recipesShown).map((item) => {
        return <Fooditem props={[item, searchParams]} key={item.id} />
    })

    function loadMore() {
        setRecipesShown((prev) => prev + 6)
    }

    return (
        <>
            <div className="results">
                {recipeData.length == 0 ? (
                    <h2>Reseptejä ei löytynyt hakusanalla</h2>
                ) : (
                    foodItem
                )}
                {recipeData.length > recipesShown ? (
                    <button onClick={loadMore} id="load-more-button">
                        Lisää reseptejä
                    </button>
                ) : (
                    ""
                )}
            </div>
        </>
    )
}
