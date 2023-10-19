import Results from "./Results"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import fetchRecipes from "../Hooks/fetchRecipes"
import Loader from "./Loader"

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
                    <form onSubmit={handleSubmit} id="search-form">
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
                <Loader text={"Ladataan reseptejä"} />
            ) : (
                <Results props={[recipes, searchParams]} />
            )}
        </section>
    )
}
