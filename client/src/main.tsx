import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { UserContextProvider } from "./Context/UserContext"
import { RecipesShownContextProvider } from "./Context/RecipesShownContext"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <UserContextProvider>
        <RecipesShownContextProvider>
            <App />
        </RecipesShownContextProvider>
    </UserContextProvider>
)
