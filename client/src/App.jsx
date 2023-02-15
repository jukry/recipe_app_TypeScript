import { useState } from "react"
import "./App.css"
import Navbar from "./Components/Navbar"
import Result from "./Components/Result"
import Search from "./Components/Search"

function App() {
    return (
        <main className="container">
            <Navbar />
            <Search />
            <Result />
        </main>
    )
}

export default App
