import Results from "./Results"
import { useState, useEffect } from "react"
//import recipes from "../assets/recipe-data"
import { useLoaderData } from "react-router-dom"
import { getRecipes } from "../utils/utils"

export async function loader() {
    const data = await getRecipes("http://localhost:5000/api/recipes")
    return data
}

export default function Search(props) {
    const [search, setSearch] = useState("")
    const recipes = useLoaderData()
    const filtered = recipes.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
    })

    /* useEffect(() => {
        setRecipesArr(() => {
            return recipes.filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase())
            })
        })
    }, [search]) */

    /* APIA VARTEN 
    async function getRecipes() {
        const res = await fetch(url)
        const json = await res.json()
        setRecipesArr(json.recipes)
    } */

    /* function getRecipes() {
        setRecipesArr(recipes)
    } */

    function handleChange(event) {
        setSearch(event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <section className="results-container">
            <div className="search-container">
                <h1>Etsi reseptiä nimellä</h1>
                <div className="input-wrapper">
                    <span className="search-icon">&#x1F50E;&#xFE0E;</span>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={handleChange}
                            type="text"
                            placeholder="Hae reseptiä"
                            className="recipe-search"
                            value={search}
                        />
                    </form>
                </div>
            </div>
            <Results props={filtered} />
        </section>
    )
}
