import { BaseSyntheticEvent } from "react"
import { redirect } from "react-router-dom"
import { IRecipe, User, UserContextAction } from "./APIResponseTypes"

export async function getUserData({ request }: { request: Request }) {
    const pathname = new URL(request.url).pathname
    try {
        const data = await fetch(
            process.env.NODE_ENV === "production"
                ? import.meta.env.VITE_USERDATA_ENDPOINT
                : import.meta.env.VITE_USERDATA_ENDPOINT_DEV,
            {
                method: "get",
                credentials: "include",
                referrerPolicy: "origin",
            }
        )
        const body = await data.json()
        if (pathname.includes("recipe/edit/")) {
            const recipeId = pathname.split("edit/")[1]
            if (body?.recipes?.includes(recipeId)) {
                return body
            } else {
                return {}
            }
        } else if (!body.id) {
            return redirect(
                `/login?message=Kirjaudu ensin sisään&redirectTo=${pathname}`
            )
        }
        return body
    } catch (error: unknown) {
        throw error
    }
}

export async function handleFavorite(
    data: [
        BaseSyntheticEvent,
        string | undefined,
        React.Dispatch<React.SetStateAction<UserContextAction>> | undefined,
        User | undefined
    ]
) {
    const event = data[0]
    const id = data[1]
    const dispatch = data[2]
    const user = data[3]
    const isfav = event.target.className
    if (isfav === "isfav") {
        async function deleteFav() {
            return await fetch(
                process.env.NODE_ENV === "production"
                    ? import.meta.env.VITE_USERFAVRECIPES_ENDPOINT
                    : import.meta.env.VITE_USERFAVRECIPES_ENDPOINT_DEV,
                {
                    method: "DELETE",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ id: id }),
                }
            )
        }

        const body = await deleteFav()
        const message = await body.json()
        const newFavRecipes = message.Message
        if (!dispatch) return null
        dispatch({
            type: "UPDATEFAV",
            payload: { ...user, favrecipes: newFavRecipes },
        })
    } else {
        async function addFav() {
            return await fetch(
                process.env.NODE_ENV === "production"
                    ? import.meta.env.VITE_USERFAVRECIPES_ENDPOINT
                    : import.meta.env.VITE_USERFAVRECIPES_ENDPOINT_DEV,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ id: id }),
                }
            )
        }

        const body = await addFav()
        const message = await body.json()
        const newFavRecipes = message.Message
        if (!dispatch) return null

        dispatch({
            type: "UPDATEFAV",
            payload: { ...user, favrecipes: newFavRecipes },
        })
    }
}
export async function changePassword(formData: FormData) {
    return await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_USERDATA_ENDPOINT}/newpassword`
            : `${import.meta.env.VITE_USERDATA_ENDPOINT_DEV}/newpassword`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                formData,
            }),
        }
    )
}

export async function deleteUser() {
    await fetch(
        process.env.NODE_ENV === "production"
            ? import.meta.env.VITE_USERDATA_ENDPOINT
            : import.meta.env.VITE_USERDATA_ENDPOINT_DEV,
        {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }
    )
    await fetch(
        process.env.NODE_ENV === "production"
            ? import.meta.env.VITE_LOGOUT_ENDPOINT
            : import.meta.env.VITE_LOGOUT_ENDPOINT_DEV,
        {
            method: "POST",
            credentials: "include",
        }
    )
    return location.replace("/")
}

export function commentTime(timeDelta: number) {
    const minutes = timeDelta / 60000
    return minutes < 1 // < 1 minute ago
        ? "Juuri nyt"
        : minutes < 2 // 1 minute ago
        ? "1 minuutti sitten"
        : minutes < 60 //x minutes ago
        ? `${Math.round(minutes)} minuuttia sitten`
        : minutes / 60 < 24 //x hours ago
        ? `${Math.round(minutes / 60)} tuntia sitten`
        : minutes / 60 < 48 //1 day ago
        ? `${Math.round(minutes / 60 / 24)} päivä sitten`
        : minutes / 60 / 24 < 30 //2-30 days ago
        ? `${Math.round(minutes / 60 / 24)} päivää sitten`
        : minutes / 60 / 24 < 60 // 1 month ago
        ? `${Math.round(minutes / 60 / 24 / 30)} kuukausi sitten`
        : minutes / 60 / 24 < 365 //x months ago
        ? `${Math.round(minutes / 60 / 24 / 30)} kuukautta sitten`
        : minutes / 60 / 24 < 730 //1 year ago
        ? "1 vuosi sitten"
        : `${Math.floor(minutes / 60 / 24 / 30 / 12)} vuotta sitten` //x years ago
}

export async function postComment(
    commentData: {
        content: string
        username: string
    },
    id: string,
    userId: string,
    email: string
) {
    return await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_COMMENTS_ENDPOINT}`
            : `${import.meta.env.VITE_COMMENTS_ENDPOINT_DEV}`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                commentData,
                id,
                userId,
                email,
            }),
        }
    )
}
export async function changeEmail(formData: FormData) {
    return await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_USERDATA_ENDPOINT}/changeemail`
            : `${import.meta.env.VITE_USERDATA_ENDPOINT_DEV}/changeemail`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                formData,
            }),
        }
    )
}
export const handleDeleteFromAdmin = async (
    id: string,
    role: string,
    adminAmount: number
) => {
    return await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_USERDATA_ENDPOINT}/${id}`
            : `${import.meta.env.VITE_USERDATA_ENDPOINT_DEV}/${id}`,
        {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                role: role,
                adminAmount: adminAmount,
            }),
        }
    )
}
export const handleRoleChangeFromAdmin = async (
    newRole: string,
    id: string,
    role: string,
    adminAmount: number
) => {
    return await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_USERDATA_ENDPOINT}/${id}`
            : `${import.meta.env.VITE_USERDATA_ENDPOINT_DEV}/${id}`,
        {
            method: "PATCH",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                role: role,
                newRole: newRole,
                adminAmount: adminAmount,
            }),
        }
    )
}

export const handleRecipeDeleteFromAdmin = async (
    id: string,
    userId: string
) => {
    return await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_RECIPE_ENDPOINT}/admin/${id}`
            : `${import.meta.env.VITE_RECIPE_ENDPOINT_DEV}/admin/${id}`,
        {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                userId,
            }),
        }
    )
}

export const sortRecipes = (sortFilter: string, a: IRecipe, b: IRecipe) => {
    switch (sortFilter) {
        case "dateDesc": {
            const dateA = a.createdAt as Date
            const dateB = b.createdAt as Date
            if (dateA < dateB) {
                return 1
            }
            if (dateA > dateB) {
                return -1
            }
            return 0
        }
        case "dateAsc": {
            const dateA = a.createdAt as Date
            const dateB = b.createdAt as Date
            if (dateA < dateB) {
                return -1
            }
            if (dateA > dateB) {
                return 1
            }
            return 0
        }
        case "commentsAsc": {
            const commentsA = a?.comments?.length as number
            const commentsB = b?.comments?.length as number
            if (commentsA < commentsB) {
                return -1
            }
            if (commentsA > commentsB) {
                return 1
            }
            return 0
        }
        case "commentsDesc": {
            const commentsA = a?.comments?.length as number
            const commentsB = b?.comments?.length as number
            if (commentsA < commentsB) {
                return 1
            }
            if (commentsA > commentsB) {
                return -1
            }
            return 0
        }
        default:
            return 0
    }
}
export const sortUser = (sortFilter: string, a: User, b: User) => {
    switch (sortFilter) {
        case "emailDesc": {
            const emailA = a?.email?.toLowerCase() as string
            const emailB = b?.email?.toLowerCase() as string
            if (emailA < emailB) {
                return 1
            }
            if (emailA > emailB) {
                return -1
            }
            return 0
        }
        case "recipesAsc": {
            const recipesA = a?.recipes?.length as number
            const recipesB = b?.recipes?.length as number
            if (recipesA < recipesB) {
                return -1
            }
            if (recipesA > recipesB) {
                return 1
            }
            return 0
        }
        case "recipesDesc": {
            const recipesA = a?.recipes?.length as number
            const recipesB = b?.recipes?.length as number
            if (recipesA < recipesB) {
                return 1
            }
            if (recipesA > recipesB) {
                return -1
            }
            return 0
        }
        case "commentsAsc": {
            const commentsA = a?.comments?.length as number
            const commentsB = b?.comments?.length as number
            if (commentsA < commentsB) {
                return -1
            }
            if (commentsA > commentsB) {
                return 1
            }
            return 0
        }
        case "commentsDesc": {
            const commentsA = a?.comments?.length as number
            const commentsB = b?.comments?.length as number
            if (commentsA < commentsB) {
                return 1
            }
            if (commentsA > commentsB) {
                return -1
            }
            return 0
        }
        case "createdAsc": {
            const createdA = a.createdAt as Date
            const createdB = b.createdAt as Date
            if (createdA < createdB) {
                return -1
            }
            if (createdA > createdB) {
                return 1
            }
            return 0
        }
        case "createdDesc": {
            const createdA = a.createdAt as Date
            const createdB = b.createdAt as Date
            if (createdA < createdB) {
                return 1
            }
            if (createdA > createdB) {
                return -1
            }
            return 0
        }
        default:
            return 0
    }
}

export function handleCapsLockDetection(event: KeyboardEvent): boolean {
    if (!event.getModifierState) return false
    if (event?.getModifierState("CapsLock")) {
        return true
    } else {
        return false
    }
}
export function validatePassword(event: BaseSyntheticEvent) {
    const passwordInput = event.target.value
    const passwordLength = passwordInput.length
    const specials = /[!@#$%^&*]/
    const hasSpecial = specials.test(passwordInput)
    const lowerCase = /[a-z]/
    const hasLowerCase = lowerCase.test(passwordInput)
    const upperCase = /[A-Z]/
    const hasUpperCase = upperCase.test(passwordInput)
    const numbers = /[0-9]/
    const hasNumbers = numbers.test(passwordInput)
    if (
        passwordLength >= 8 &&
        hasSpecial &&
        hasLowerCase &&
        hasUpperCase &&
        hasNumbers
    ) {
        return true
    } else {
        return false
    }
}
