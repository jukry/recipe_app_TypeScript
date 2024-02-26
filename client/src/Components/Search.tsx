import Results from "./Results"
import { useSearchParams } from "react-router-dom"
import { ChangeEvent, FormEvent, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import fetchRecipes from "../Hooks/fetchRecipes"
import Loader from "./Loader"
import RecipeTagsFilter from "./RecipeTagsFilter"
import { IRecipeDetails } from "../utils/APIResponseTypes"

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState<string>(
        searchParams?.get("search") || ""
    )
    const [tagFilterParams, setTagFilterParams] = useState(
        searchParams?.getAll("tags") || []
    )
    const queryResponse = useQuery(["recipes"], async () =>
        fetchRecipes({ queryKey: "recipes" })
    )
    const queryRecipes: IRecipeDetails[] = queryResponse?.data?.message ?? []
    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    }
    function handleFilter(e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
        setSearchParams((prev) => {
            prev.set("search", e.target.value)
            return prev
        })
    }
    const searchParam = searchParams.get("search")
    const tagParams = searchParams.getAll("tags")

    const recipes = queryRecipes.filter((item) => {
        if (searchParam === null && tagParams?.length === 0) {
            return queryRecipes
        } else {
            const nameMatch = item.name
                ?.toLowerCase()
                .includes(searchParam?.toLowerCase() as string)
            const ingredientMatch = item?.ingredients?.some((ingredient) =>
                ingredient?.ingredient
                    ?.toLowerCase()
                    .includes(searchParam?.toLowerCase() as string)
            )
            const filterMatch = tagParams?.every((tag) => {
                return item.tags.includes(tag)
            })
            if (tagParams.length > 0) {
                if (searchParam === null) {
                    return filterMatch
                } else {
                    return filterMatch && (nameMatch || ingredientMatch)
                }
            } else {
                return nameMatch || ingredientMatch
            }
        }
    })

    return (
        <div className="results-container">
            <section className="search-container">
                <h1>Etsi reseptiä nimellä tai ainesosalla</h1>
                <div className="input-wrapper">
                    <span className="search-icon">&#x1F50E;&#xFE0E;</span>
                    <form onSubmit={handleSubmit} id="search-form">
                        <label
                            htmlFor="recipe-search"
                            className="visuallyhidden"
                        >
                            Hae reseptiä
                        </label>
                        <input
                            onChange={handleFilter}
                            type="text"
                            placeholder="Hae reseptiä"
                            className="recipe-search"
                            id="recipe-search"
                            name="recipesearch"
                            value={search}
                        />
                    </form>
                </div>
                <RecipeTagsFilter
                    tagFilterParams={tagFilterParams}
                    setTagFilterParams={setTagFilterParams}
                    setSearchParams={setSearchParams}
                />
            </section>
            {queryResponse.isLoading ? (
                <Loader text={"Ladataan reseptejä"} />
            ) : (
                <Results recipes={recipes} searchParams={searchParams} />
            )}
        </div>
    )
}
