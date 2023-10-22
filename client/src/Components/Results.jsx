import { useContext, useEffect } from "react"
import Fooditem from "./Fooditem"
import { RecipesShownContext } from "../Context/RecipesShownContext"

export default function Results(props) {
    const recipeData = props.props[0]
    const { recipesShown, setRecipesShown } = useContext(RecipesShownContext)
    const { currentRecipe } = useContext(RecipesShownContext)
    const searchParams = props.props[1]
    document.title = "Reseptit"
    function scrollToId(itemId) {
        document.getElementById(itemId).scrollIntoView({
            behavior: "instant",
        })
    }
    useEffect(() => {
        if (currentRecipe) scrollToId(currentRecipe)
    }, [])

    const foodItem = recipeData.slice(0, recipesShown).map((item) => {
        return <Fooditem props={[item, searchParams]} key={item.id} />
    })

    function loadMore() {
        setRecipesShown((prev) => prev + 8)
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
