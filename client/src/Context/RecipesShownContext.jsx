import { createContext, useState } from "react"

export const RecipesShownContext = createContext()

export const RecipesShownContextProvider = ({ children }) => {
    const initialRecipes = 8
    const [recipesShown, setRecipesShown] = useState(initialRecipes)
    const [currentRecipe, setCurrentRecipe] = useState()
    return (
        <RecipesShownContext.Provider
            value={{
                initialRecipes,
                recipesShown,
                setRecipesShown,
                currentRecipe,
                setCurrentRecipe,
            }}
        >
            {children}
        </RecipesShownContext.Provider>
    )
}
