import Results from "./Results"
//import recipes from "../assets/recipe-data"
import { useLoaderData, useSearchParams } from "react-router-dom"
import { getRecipes } from "../utils/utils"
import { Children, useState } from "react"

export async function loader() {
    const data = await getRecipes("http://localhost:5000/api/recipes")
    return data
}

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams?.get("search") || "")
    const recipes = useLoaderData()
    let filtered = []

    function handleSubmit(e) {
        e.preventDefault()
    }
    function handleFilter(e) {
        setSearch(e.target.value)
        setSearchParams({ search: e.target.value })
    }
    if (recipes) {
        filtered = recipes.filter((item) => {
            if (searchParams.get("search") === null) {
                return recipes
            } else {
                return item.name
                    .toLowerCase()
                    .includes(searchParams.get("search").toLowerCase())
            }
        })
    }
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
            <Results props={[filtered, searchParams]} />
        </section>
    )
}
