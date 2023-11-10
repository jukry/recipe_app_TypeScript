import Results from "./Results"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import fetchRecipes from "../Hooks/fetchRecipes"
import Loader from "./Loader"
import RecipeTagsFilter from "./RecipeTagsFilter"

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams?.get("search") || "")
    const [tagFilterParams, setTagFilterParams] = useState(
        searchParams?.getAll("tags") || []
    )
    const queryResponse = useQuery(["recipes"], fetchRecipes)
    const queryRecipes = queryResponse?.data?.message ?? []

    function handleSubmit(e) {
        e.preventDefault()
    }
    function handleFilter(e) {
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
                .includes(searchParam?.toLowerCase())
            const ingredientMatch = item?.ingredients?.some((ingredient) =>
                ingredient?.ingredient
                    ?.toLowerCase()
                    .includes(searchParam?.toLowerCase())
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
                    props={[
                        tagFilterParams,
                        setTagFilterParams,
                        setSearchParams,
                    ]}
                />
            </section>
            {queryResponse.isLoading ? (
                <Loader text={"Ladataan reseptejä"} />
            ) : (
                <Results props={[recipes, searchParams]} />
            )}
        </div>
    )
}
