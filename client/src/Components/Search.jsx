import Results from "./Results"
//import recipes from "../assets/recipe-data"
import { defer, useLoaderData, useSearchParams, Await } from "react-router-dom"
import { getRecipes } from "../utils/utils"
import { useState, Suspense } from "react"

export async function loader() {
    return defer({ data: getRecipes("http://localhost:5000/api/recipes") })
}

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams?.get("search") || "")
    const recipesPromise = useLoaderData()
    let filtered = []

    function handleSubmit(e) {
        e.preventDefault()
    }
    function handleFilter(e) {
        setSearch(e.target.value)
        setSearchParams({ search: e.target.value })
    }

    function renderRecipes(loadedRecipes) {
        if (loadedRecipes) {
            filtered = loadedRecipes.filter((item) => {
                if (searchParams.get("search") === null) {
                    return loadedRecipes
                } else {
                    return item.name
                        .toLowerCase()
                        .includes(searchParams.get("search").toLowerCase())
                }
            })
        }
        return <Results props={[filtered, searchParams]} />
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
            <Suspense fallback={<h2>Haetaan reseptejä</h2>}>
                <Await resolve={recipesPromise.data}>{renderRecipes}</Await>
            </Suspense>
        </section>
    )
}
