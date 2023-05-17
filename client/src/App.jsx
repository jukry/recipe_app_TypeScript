import "./App.css"
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
import AccountLayout, {
    loader as layoutLoader,
} from "./Pages/Account/AccountLayout"
import FavoriteRecipes, {
    loader as favrecipesLoader,
} from "./Pages/Account/FavoriteRecipes"
import UserRecipes, {
    loader as myrecipesLoader,
} from "./Pages/Account/UserRecipes"

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
                <Route
                    path="account"
                    element={<AccountLayout />}
                    loader={layoutLoader}
                >
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
                    <Route
                        path="myrecipes"
                        loader={myrecipesLoader}
                        element={<UserRecipes />}
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
    return <RouterProvider router={routes} />
}

export default App
