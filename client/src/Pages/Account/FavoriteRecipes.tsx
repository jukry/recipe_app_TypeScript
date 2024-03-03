import React, { useContext } from "react"
import "./styles/account.css"
import { UserContext } from "../../Context/UserContext"
import { useQuery } from "@tanstack/react-query"
import fetchRecipes from "../../Hooks/fetchRecipes"
import Fooditem from "../../Components/Fooditem"
import "./styles/favRecipes.css"
import Loader from "../../Components/Loader"
import { IRecipeDetails, IUserContext } from "../../utils/APIResponseTypes"

function FavoriteRecipes() {
    document.title = "Suosikkireseptisi"
    const queryResponse = useQuery(["recipes"], async () =>
        fetchRecipes({ queryKey: "recipes" })
    )
    const favRecipes: IRecipeDetails[] = queryResponse?.data?.message ?? []
    const context = useContext<IUserContext>(UserContext)
    function favRecipesMap() {
        return favRecipes?.map((item) => {
            if (context?.user?.favrecipes?.includes(item?.id as string)) {
                return <Fooditem item={item} key={item.id} />
            }
        })
    }
    const userFavRecipes = favRecipesMap()

    return (
        <section className="favrecipes-container">
            {queryResponse.isLoading ? (
                <Loader text={"Ladataan käyttäjän suosikkireseptejä"} />
            ) : (
                userFavRecipes
            )}
        </section>
    )
}
export default FavoriteRecipes
