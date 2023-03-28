import { useState } from "react"
import "./App.css"
import LandingPage from "./Pages/LandingPage"
import HomeLayout from "./Layouts/HomeLayout"
import Search from "./Components/Search"
import {
    BrowserRouter,
    Routes,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom"
import RecipeDetails from "./Components/RecipeDetails"
import UseFetch from "./Components/UseFetch"
import Results from "./Components/Results"

function App() {
    const url = "http://localhost:5000/api/recipes"
    const data = UseFetch(url) || []

    const routes = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="recipes" element={<Results />} />
                <Route
                    path="/recipes/:id"
                    element={<RecipeDetails props={data} />}
                ></Route>
                {/*                 <Route path="/" element={<Search props={data} />}></Route> */}
                {/* <Search /> */}
            </Route>
        )
    )
    return <RouterProvider router={routes} />
}

export default App
