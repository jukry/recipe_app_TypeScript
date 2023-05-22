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
import UserRecipes from "./Pages/Account/UserRecipes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

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
                    <Route path="myrecipes" element={<UserRecipes />} />
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
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes} />
        </QueryClientProvider>
    )
}

export default App
