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
import UseFetch from "./Components/UseFetch"

function App() {
    const url = "http://localhost:5000/api/recipes"
    const data = UseFetch(url) || []

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
                {/*                 <Route path="/" element={<Search props={data} />}></Route> */}
                {/* <Search /> */}
            </Route>
        )
    )
    return <RouterProvider router={routes} />
}

export default App
