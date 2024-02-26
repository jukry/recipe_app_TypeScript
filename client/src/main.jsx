import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { UserContextProvider } from "./Context/UserContext.tsx"
import { RecipesShownContextProvider } from "./Context/RecipesShownContext.tsx"

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserContextProvider>
        <RecipesShownContextProvider>
            <App />
        </RecipesShownContextProvider>
    </UserContextProvider>
)
