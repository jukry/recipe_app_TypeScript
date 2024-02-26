import { useContext, useEffect } from "react"
import Fooditem from "./Fooditem.jsx"
import { RecipesShownContext } from "../Context/RecipesShownContext"
import { IRecipeDetails } from "../utils/APIResponseTypes.js"

export default function Results(props: {
    recipes: IRecipeDetails[]
    searchParams: URLSearchParams
}) {
    const recipeData = props.recipes
    const { recipesShown, setRecipesShown } = useContext(RecipesShownContext)
    const { currentRecipe } = useContext(RecipesShownContext)
    const searchParams = props.searchParams
    document.title = "Reseptit"
    function scrollToId(itemId: string) {
        document?.getElementById(itemId)?.scrollIntoView({
            behavior: "instant",
        })
    }
    const firstRowRecipe = recipeData
        .slice(0, window.innerWidth <= 950 ? 2 : 4)
        .some((recipe) => recipe.id === currentRecipe)
    useEffect(() => {
        if (currentRecipe && !firstRowRecipe && window.innerWidth <= 950)
            scrollToId(currentRecipe)
    }, [])

    const foodItem = recipeData.slice(0, recipesShown).map((item) => {
        return (
            <Fooditem item={item} searchParams={searchParams} key={item.id} />
        )
    })

    function loadMore() {
        if (!setRecipesShown) return null
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
                {recipeData.length > (recipesShown as number) ? (
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
