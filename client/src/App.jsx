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
import AccountDashboard from "./Pages/Account/AccountDashboard"
import AccountLayout from "./Pages/Account/AccountLayout"
import FavoriteRecipes from "./Pages/Account/FavoriteRecipes"

function App() {
    const routes = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<HomeLayout />}>
                <Route index loader={SearchLoader} element={<Search />} />
                <Route
                    path="recipe/:id"
                    loader={RecipeDetailsLoader}
                    element={<RecipeDetails />}
                ></Route>
                <Route path="account" element={<AccountLayout />}>
                    <Route index element={<AccountDashboard />} />
                    <Route
                        path="favoriterecipes"
                        element={<FavoriteRecipes />}
                    />
                </Route>
                <Route path="login" element={<Login />} />
            </Route>
        )
    )
    return <RouterProvider router={routes} />
}

export default App
