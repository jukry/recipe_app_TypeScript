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
import Login, {
    action as loginAction,
    loader as loginLoader,
} from "./Pages/Login"
import AccountDashboard, {
    loader as dashboardLoader,
} from "./Pages/Account/AccountDashboard"
import AccountLayout from "./Pages/Account/AccountLayout"
import FavoriteRecipes, {
    loader as favrecipesLoader,
} from "./Pages/Account/FavoriteRecipes"
import { requireAuth } from "./utils/utils"
import AuthContext from "./Components/AuthContext"
import { useContext, useState } from "react"

function App() {
    const user = useState(null)
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
                    <Route
                        index
                        loader={dashboardLoader}
                        element={<AccountDashboard />}
                    />
                    <Route
                        path="favoriterecipes"
                        loader={favrecipesLoader}
                        element={<FavoriteRecipes />}
                    />
                </Route>
                <Route
                    path="login"
                    element={<Login />}
                    action={loginAction}
                    loader={loginLoader}
                />
            </Route>
        )
    )
    return (
        <AuthContext.Provider value={user}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )
}

export default App
