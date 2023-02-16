import { useState } from "react"
import "./App.css"
import Navbar from "./Components/Navbar"
import Results from "./Components/Results"
import Search from "./Components/Search"

function App() {
    return (
        <main className="container">
            <Navbar />
            <Search />
        </main>
    )
}

export default App
