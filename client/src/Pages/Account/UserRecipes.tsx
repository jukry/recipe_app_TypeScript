import { useContext } from "react"
import Fooditem from "../../Components/Fooditem"
import "./styles/userRecipes.css"
import { useMutation, useQuery } from "@tanstack/react-query"
import fetchUserRecipes from "../../Hooks/fetchUserRecipes"
import Loader from "../../Components/Loader"
import "./styles/newRecipe.css"
import { UserContext } from "../../Context/UserContext"
import { IRecipe, IUserContext } from "../../utils/APIResponseTypes"

function UserRecipes() {
    document.title = "Omat reseptisi"
    const queryResponse = useQuery(["userRecipes"], async () =>
        fetchUserRecipes({ queryKey: "userRecipes" })
    )
    const recipes: IRecipe[] = queryResponse?.data?.data ?? []
    const { user, dispatch } = useContext<IUserContext>(UserContext)

    const mutation = useMutation({
        mutationFn: async ({ id }: { id: string | undefined }) => {
            return fetch(
                process.env.NODE_ENV === "production"
                    ? `${import.meta.env.VITE_RECIPE_ENDPOINT}/${id}`
                    : `${import.meta.env.VITE_RECIPE_ENDPOINT_DEV}/${id}`,
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
        },
        onSuccess: async (data) => {
            queryResponse.refetch()
            const res: { _id: string }[] = await data.json()
            const recipeMap = res.map((item) => item._id)
            if (!dispatch) return null
            dispatch({
                type: "DELETERECIPE",
                payload: { ...user, recipes: recipeMap },
            })
        },
    })
    function userRecipesMap() {
        return recipes?.map((item) => {
            return (
                <Fooditem item={item} handleDelete={mutation} key={item._id} />
            )
        })
    }
    const userRecipes = userRecipesMap()
    return (
        <>
            {queryResponse.isLoading ? (
                <Loader text={"Ladataan käyttäjän reseptejä"} />
            ) : recipes.length > 0 ? (
                <section className="user-recipes-container">
                    {userRecipes}
                </section>
            ) : (
                location.replace("/account/addnewrecipe")
            )}
        </>
    )
}
export default UserRecipes
