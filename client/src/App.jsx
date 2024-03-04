import "./App.css"
import HomeLayout from "./Layouts/HomeLayout.tsx"
import Search from "./Components/Search"
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Suspense, lazy } from "react"
import Loader from "./Components/Loader"
import AccountDashboard from "./Pages/Account/AccountDashboard"
const RecipeDetails = lazy(() => import("./Components/RecipeDetails.tsx"))
const ProtectedRoutes = lazy(() => import("./Components/ProtectedRoutes"))
const AccountLayout = lazy(() => import("./Pages/Account/AccountLayout"))
const RecipeDetailsEdit = lazy(() =>
    import("./Components/RecipeDetailsEdit.tsx")
)
const FavoriteRecipes = lazy(() =>
    import("./Pages/Account/FavoriteRecipes.tsx")
)
const UserRecipes = lazy(() => import("./Pages/Account/UserRecipes"))
const AddNewRecipe = lazy(() => import("./Pages/Account/AddNewRecipe"))
const UserSettings = lazy(() => import("./Pages/Account/UserSettings"))
const Register = lazy(() => import("./Pages/Register"))
const Login = lazy(() => import("./Pages/Login"))
const NotFound = lazy(() => import("./Components/NotFound"))
const Forbidden = lazy(() => import("./Components/Forbidden"))
const AdminLayout = lazy(() => import("./Pages/Admin/AdminLayout"))
const AdminProtectedRoutes = lazy(() =>
    import("./Components/AdminProtectedRoutes")
)
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"))
const AdminUsers = lazy(() => import("./Pages/Admin/AdminUsers"))
const AdminRecipes = lazy(() => import("./Pages/Admin/AdminRecipes"))
const AdminComments = lazy(() => import("./Pages/Admin/AdminComments"))

import { loader as recipeDetailsLoader } from "./Components/loaders/recipeDetailsEditLoader"
import { action as recipeDetailsAction } from "./Components/actions/recipeDetailsEditAction"
import { loader as favRecipesLoader } from "./Components/loaders/favRecipesLoader"
import { action as registerAction } from "./Pages/actions/registerAction"

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
                <Route
                    path="recipe/:id"
                    element={
                        <Suspense fallback={<Loader />}>
                            <RecipeDetails />
                        </Suspense>
                    }
                ></Route>
                <Route
                    path="recipe/edit/:id"
                    element={
                        <Suspense fallback={<Loader />}>
                            <RecipeDetailsEdit />
                        </Suspense>
                    }
                    loader={async ({ request }) => {
                        return recipeDetailsLoader({ request })
                    }}
                    action={async ({ request }) => {
                        return recipeDetailsAction({ request })
                    }}
                ></Route>
                <Route
                    element={
                        <Suspense fallback={<Loader />}>
                            <ProtectedRoutes />
                        </Suspense>
                    }
                >
                    <Route
                        path="account"
                        element={
                            <Suspense fallback={<Loader />}>
                                <AccountLayout />
                            </Suspense>
                        }
                    >
                        <Route index element={<AccountDashboard />} />
                        <Route
                            path="favoriterecipes"
                            loader={async ({ request }) => {
                                return favRecipesLoader({ request })
                            }}
                            element={
                                <Suspense fallback={<Loader />}>
                                    <FavoriteRecipes />
                                </Suspense>
                            }
                        />
                        <Route
                            path="myrecipes"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <UserRecipes />
                                </Suspense>
                            }
                        />
                        <Route
                            path="addnewrecipe"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <AddNewRecipe />
                                </Suspense>
                            }
                        />
                        <Route
                            path="usersettings"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <UserSettings />
                                </Suspense>
                            }
                        />
                    </Route>
                </Route>
                <Route
                    element={
                        <Suspense fallback={<Loader />}>
                            <AdminProtectedRoutes />
                        </Suspense>
                    }
                >
                    <Route path="admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="recipes" element={<AdminRecipes />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="comments" element={<AdminComments />} />
                    </Route>
                </Route>
                <Route
                    path="login"
                    element={
                        <Suspense fallback={<Loader />}>
                            <Login />
                        </Suspense>
                    }
                />
                <Route
                    path="register"
                    element={
                        <Suspense fallback={<Loader />}>
                            <Register />
                        </Suspense>
                    }
                    action={async ({ request }) => {
                        return registerAction({ request })
                    }}
                />
                <Route
                    path="forbidden"
                    element={
                        <Suspense fallback={<Loader />}>
                            <Forbidden />
                        </Suspense>
                    }
                />
                <Route
                    path="notfound"
                    element={
                        <Suspense fallback={<Loader />}>
                            <NotFound />
                        </Suspense>
                    }
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
