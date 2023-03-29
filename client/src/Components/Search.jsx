import Results from "./Results"
//import recipes from "../assets/recipe-data"
import { useLoaderData, useSearchParams } from "react-router-dom"
import { getRecipes } from "../utils/utils"

export async function loader() {
    const data = await getRecipes("http://localhost:5000/api/recipes")
    return data
}

export default function Search(props) {
    const [searchParams, setSearchParams] = useSearchParams()
    const recipes = useLoaderData()
    let filtered = []

    function handleSubmit(e) {
        e.preventDefault()
    }
    function handleFilter(e) {
        setSearchParams({ search: e.target.value })
    }
    if (recipes) {
        filtered = recipes.filter((item) => {
            if (searchParams.get("search") === null) {
                return recipes
            } else {
                return item.name
                    .toLowerCase()
                    .includes(searchParams.get("search"))
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
                            value={searchParams.get("search") || ""}
                        />
                    </form>
                </div>
            </div>
            {filtered ? (
                <Results props={[filtered, searchParams.get("search")]} />
            ) : (
                ""
            )}
        </section>
    )
}
