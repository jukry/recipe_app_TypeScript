import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react"

export type User = {
    id?: string
    email?: string
    favrecipes?: string[]
    lastlogins?: string[]
    recipes?: string[]
    role?: string
    comments?: string[]
}

export interface IRecipeDetails {
    _id?: string
    id?: string
    name: string
    description: string
    images: string
    tags: string[]
    ingredients: { ingredient: string }[]
    instructions: string[]
    comments: string[]
}
export interface IRecipe {
    _id?: string
    id?: string
    name: string
    description: string
    images: string
    tags: string[]
    ingredients: {}[]
    instructions: string[]
    comments: string[]
    user: {
        email: string
        id: string
    }
}

export interface INewRecipe {
    name?: string
    description?: string
    images?: string[]
    tags?: string[]
    ingredients?: {}[]
    instructions?: {
        step1?: string
        step2?: string
        step3?: string
        step4?: string
    }
}

export type RecipeProps = {
    props: {
        recipe: INewRecipe
        file: File | undefined
        handleChange: (e: ChangeEvent<HTMLInputElement>) => void
        handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
        handleFileDelete: (e: MouseEvent<HTMLButtonElement>) => void
        handleIngredientDelete: (e: ChangeEvent<HTMLInputElement>) => void
        handleStepDelete: (e: string) => void
        previewFile: string | undefined
        setRecipe: React.Dispatch<React.SetStateAction<{}>>
    }
}

export interface IUserContext {
    user?: User
    isLoggedIn?: boolean
    isLoading?: boolean
    dispatch?: Dispatch<SetStateAction<DispatchActions>>
}

type UserContextAction = {
    type: string
    payload?: User | boolean
}
export type DispatchActions = UserContextAction

export interface IRecipesShownContext {
    initialRecipes: number
    currentRecipe: string | null
    recipesShown?: number
    setCurrentRecipe?: React.Dispatch<React.SetStateAction<string | null>>
    setRecipesShown?: React.Dispatch<React.SetStateAction<number>>
}
