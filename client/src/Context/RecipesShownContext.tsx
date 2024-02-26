import { ReactElement, createContext, useState } from "react"

export const RecipesShownContext = createContext({})

export const RecipesShownContextProvider = ({
    children,
}: {
    children: ReactElement
}) => {
    const initialRecipes = 8
    const [recipesShown, setRecipesShown] = useState<number>(initialRecipes)
    const [currentRecipe, setCurrentRecipe] = useState<string | null>(null)
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
