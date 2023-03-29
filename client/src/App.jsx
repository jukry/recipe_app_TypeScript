import "./App.css"
import LandingPage from "./Pages/LandingPage"
import HomeLayout from "./Layouts/HomeLayout"
import Search, { loader as SearchLoader } from "./Components/Search"
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom"
import RecipeDetails, {
    loader as RecipeDetailsLoader,
} from "./Components/RecipeDetails"
import Login from "./Pages/Login"

function App() {
    const routes = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<LandingPage />} />
                <Route
                    path="recipes"
                    loader={SearchLoader}
                    element={<Search />}
                />
                <Route
                    path="recipes/:id"
                    loader={RecipeDetailsLoader}
                    element={<RecipeDetails />}
                ></Route>
                <Route path="login" element={<Login />} />
            </Route>
        )
    )
    return <RouterProvider router={routes} />
}

export default App
