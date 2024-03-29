import { UseMutationResult } from "@tanstack/react-query"
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react"

export type User = {
    id?: string
    _id?: string
    email?: string
    favrecipes?: string[]
    lastlogins?: string[]
    recipes?: string[]
    role?: string
    comments?: string[]
    createdAt?: Date
}

export interface IRecipeDetails {
    _id?: string
    id?: string
    name: string
    description: string
    images: string
    tags: string[]
    ingredients: { ingredient: string; amount: string }[]
    instructions: string[]
    comments?: string[]
}
export interface IRecipe {
    _id?: string
    id?: string
    name: string
    description: string
    images: string
    tags: string[]
    ingredients: { ingredient: string; amount: string }[]
    instructions: string[]
    comments: string[]
    user: {
        email: string
        id?: string
        _id?: string
    }
    createdAt?: Date
}

export interface INewRecipe {
    name?: string
    description?: string
    images?: string[]
    tags?: string[]
    ingredients?: {
        ingredient1: string
        amount1: string
        ingredient2: string
        amount2: string
        ingredient3: string
        amount3: string
        ingredient4: string
        amount4: string
    }
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
        handleIngredientDelete: (e: string) => void
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
    setIsLoggedIn?: Dispatch<SetStateAction<boolean>>
    setIsLoading?: Dispatch<SetStateAction<boolean>>
    adminMode?: boolean
    setAdminMode?: Dispatch<SetStateAction<boolean>>
}

export type UserContextAction = {
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

export interface IComment {
    content: string
    username: string
    createdAt: Date
    _id: string
    recipe: string
    user?: {
        _id: string
        email: string
    }
}

export type CommentMutation = UseMutationResult<
    {
        res: Response
        setComment: React.Dispatch<
            React.SetStateAction<{
                content: string
                username: string
            }>
        >
    },
    unknown,
    {
        event?: any
        comment: {
            content: string
            username: string
        }
        id: string
        userId: string
        setComment: React.Dispatch<
            React.SetStateAction<{
                content: string
                username: string
            }>
        >
    },
    unknown
>
