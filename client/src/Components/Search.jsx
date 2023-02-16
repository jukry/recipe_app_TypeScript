import Results from "./Results"
import { useState, useEffect } from "react"
import recipes from "../assets/recipe-data"

export default function Search() {
    const [recipesArr, setRecipesArr] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        getRecipes()
    }, [])

    /* APIA VARTEN 
    async function getRecipes() {
        const res = await fetch(url)
        const json = await res.json()
        setRecipesArr(json.recipes)
    } */

    function getRecipes() {
        return setRecipesArr(recipes)
    }
    return (
        <section className="results-container">
            <div className="search-container">
                <h1>Etsi reseptiä nimellä (tai ainesosalla?)</h1>
                <div className="input-wrapper">
                    <span className="search-icon">&#x1F50E;&#xFE0E;</span>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault() // estää sivun uudelleenlataamisen
                            getRecipes()
                        }}
                    >
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Hae reseptiä"
                            className="recipe-search"
                        />
                    </form>
                </div>
            </div>
            <Results props={recipesArr} />
        </section>
    )
}
