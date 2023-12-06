import { ChangeEvent, MouseEvent } from "react"

export interface IUser {
    id: string
    email: string
    favrecipes: string[]
    lastlogins: string[]
    recipes: string[]
    role: string
    comments: string[]
}

export type RecipeProps = {
    props: {
        recipe: {}
        file: File | undefined
        handleChange: (e: ChangeEvent<HTMLInputElement>) => void
        handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
        handleFileDelete: (e: MouseEvent<HTMLButtonElement>) => void
        handleIngredientDelete: (e: ChangeEvent<HTMLInputElement>) => void
        handleStepDelete: (e: ChangeEvent<HTMLInputElement>) => void
        previewFile: string | undefined
        setRecipe: React.Dispatch<React.SetStateAction<{}>>
    }
}
