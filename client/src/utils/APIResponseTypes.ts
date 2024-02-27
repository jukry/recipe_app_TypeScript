import { UseMutationResult } from "@tanstack/react-query"
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
    ingredients: { ingredient: string; amount: string }[]
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
    ingredients: { ingredient: string; amount: string }[]
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
    setIsLoggedIn?: Dispatch<SetStateAction<boolean>>
    setIsLoading?: Dispatch<SetStateAction<boolean>>
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

export interface IComment {
    content: string
    username: string
    createdAt: Date
    _id: string
    recipe: string
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
