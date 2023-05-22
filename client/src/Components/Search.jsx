import Results from "./Results"
//import recipes from "../assets/recipe-data"
import { useLoaderData, useSearchParams } from "react-router-dom"
import { useState, Suspense } from "react"
import { useQuery } from "@tanstack/react-query"
import fetchRecipes from "../Hooks/fetchRecipes"

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams?.get("search") || "")
    const queryResponse = useQuery(["recipes"], fetchRecipes)
    const queryRecipes = queryResponse?.data?.message ?? []

    function handleSubmit(e) {
        e.preventDefault()
    }
    function handleFilter(e) {
        setSearch(e.target.value)
        setSearchParams({ search: e.target.value })
    }

    const recipes = queryRecipes.filter((item) => {
        if (searchParams.get("search") === null) {
            return queryRecipes
        } else {
            return item.name
                .toLowerCase()
                .includes(searchParams.get("search").toLowerCase())
        }
    })

    return (
        <section className="results-container">
            <div className="search-container">
                <h1>Etsi reseptiä nimellä</h1>
                <div className="input-wrapper">
                    <span className="search-icon">&#x1F50E;&#xFE0E;</span>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={handleFilter}
                            type="text"
                            placeholder="Hae reseptiä"
                            className="recipe-search"
                            value={search}
                        />
                    </form>
                </div>
            </div>
            {queryResponse.isLoading ? (
                <h2>Haetaan reseptejä</h2>
            ) : (
                <Results props={[recipes, searchParams]} />
            )}
        </section>
    )
}
