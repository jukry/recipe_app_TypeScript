import { useState } from "react"
import "./App.css"
import Navbar from "./Components/Navbar"
import Results from "./Components/Results"
import Search from "./Components/Search"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import RecipeDetails from "./Components/RecipeDetails"
import UseFetch from "./Components/UseFetch"

function App() {
    const url = "http://localhost:5000/api/recipes"
    const data = UseFetch(url) || []
    return (
        <BrowserRouter>
            <main className="container">
                <Navbar />
                <Routes>
                    <Route
                        path="/recipe/:id"
                        element={<RecipeDetails />}
                    ></Route>
                    <Route path="/" element={<Search props={data} />}></Route>
                </Routes>
                {/* <Search /> */}
            </main>
        </BrowserRouter>
    )
}

export default App
