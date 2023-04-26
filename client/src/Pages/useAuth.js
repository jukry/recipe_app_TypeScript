export default function useAuth() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"))

    return [loggedIn, setLoggedIn]
}
