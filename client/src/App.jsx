import "./App.css"
import HomeLayout from "./Layouts/HomeLayout"
import Search from "./Components/Search"
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom"
import RecipeDetails from "./Components/RecipeDetails"
import Login, { action as loginAction } from "./Pages/Login"
import AccountDashboard from "./Pages/Account/AccountDashboard"
import AccountLayout from "./Pages/Account/AccountLayout"
import FavoriteRecipes, {
    loader as favrecipesLoader,
} from "./Pages/Account/FavoriteRecipes"
import UserRecipes from "./Pages/Account/UserRecipes"
import AddNewRecipe, {
    action as addNewRecipeAction,
} from "./Pages/Account/AddNewRecipe"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Register, { action as registerAction } from "./Pages/Register"
import RecipeDetailsEdit, {
    loader as recipeDetailsEditLoader,
    action as recipeDetailsEditAction,
} from "./Components/RecipeDetailsEdit"
import UserSettings, {
    action as userSettingsAction,
} from "./Pages/Account/UserSettings"
import Forbidden from "./Components/Forbidden"
import NotFound from "./Components/NotFound"
import ProtectedRoutes from "./Components/ProtectedRoutes"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 10,
            cacheTime: 1000 * 60 * 10,
        },
    },
})

function App() {
    const routes = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<Search />} />
                <Route path="recipe/:id" element={<RecipeDetails />}></Route>
                <Route
                    path="recipe/edit/:id"
                    element={<RecipeDetailsEdit />}
                    loader={recipeDetailsEditLoader}
                    action={recipeDetailsEditAction}
                ></Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path="account" element={<AccountLayout />}>
                        <Route index element={<AccountDashboard />} />
                        <Route
                            path="favoriterecipes"
                            loader={favrecipesLoader}
                            element={<FavoriteRecipes />}
                        />
                        <Route path="myrecipes" element={<UserRecipes />} />
                        <Route
                            path="addnewrecipe"
                            element={<AddNewRecipe />}
                            action={addNewRecipeAction}
                        />
                        <Route
                            path="usersettings"
                            element={<UserSettings />}
                            action={userSettingsAction}
                        />
                    </Route>
                </Route>
                <Route path="login" element={<Login />} action={loginAction} />
                <Route
                    path="register"
                    element={<Register />}
                    action={registerAction}
                />
                <Route path="forbidden" element={<Forbidden />} />
                <Route path="notfound" element={<NotFound />} />
            </Route>
        )
    )
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes} />
        </QueryClientProvider>
    )
}

export default App
