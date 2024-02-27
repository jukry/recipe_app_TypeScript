import React, {
    FormEvent,
    MutableRefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react"
import "./styles/Login.css"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import { useLogin } from "../Hooks/useLogin"
import showPasswordImg from "/show-password.svg"
import hidePasswordImg from "/hide-password.svg"
import { handleCapsLockDetection } from "../utils/utils"
import { IUserContext } from "../utils/APIResponseTypes"

export default function Login() {
    const { user, isLoading, setIsLoading } =
        useContext<IUserContext>(UserContext)
    const { login } = useLogin()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })
    const [loginStatus, setLoginStatus] = useState<number>()
    const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
    const [showPassword, setShowPassword] = useState(false)
    const [capsLockOn, setCapsLockOn] = useState(false)
    useEffect(() => {
        if (!inputRef.current) return
        //for accessibility
        inputRef.current.focus()

        document.addEventListener("keydown", (event) => {
            const capsLockState = handleCapsLockDetection(event)
            setCapsLockOn(capsLockState)
        })
    }, [])
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const res = await login(userData.email, userData.password)
        if (!res || !setIsLoading || !inputRef.current) {
            return null
        }
        if (!res.ok) {
            setLoginStatus(res.status)
            setIsLoading(false)
            inputRef.current.focus()
            return loginStatus
        }
        return navigate("/")
    }
    if (user?.id) {
        return <Navigate to="/account" />
    }

    return (
        <section className="login-container">
            <h2 tabIndex={0}>Kirjaudu sisään</h2>
            {loginStatus && (
                <h3 className="check-login-input">
                    {loginStatus === 400
                        ? "Tarkista syöttämäsi tiedot"
                        : loginStatus === 401
                        ? "Sähköposti tai salasana väärin"
                        : ""}
                </h3>
            )}
            <form method="post" className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email" className="visuallyhidden">
                    {loginStatus === 400
                        ? "Tarkista syöttämäsi tiedot"
                        : loginStatus === 401
                        ? "Sähköposti tai salasana väärin"
                        : ""}
                </label>
                <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Sähköpostiosoite"
                    value={userData.email}
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                    autoComplete="email"
                    ref={inputRef}
                />
                <div id="password_container">
                    <label htmlFor="password" className="visuallyhidden">
                        {loginStatus === 400
                            ? "Tarkista syöttämäsi tiedot"
                            : loginStatus === 401
                            ? "Sähköposti tai salasana väärin"
                            : ""}
                    </label>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Salasana"
                        value={userData.password}
                        onChange={(e) =>
                            setUserData((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                    />
                    <img
                        src={showPassword ? hidePasswordImg : showPasswordImg}
                        title={
                            showPassword ? "Piilota salasana" : "Näytä salasana"
                        }
                        id="password_visibility"
                        onPointerEnter={() => {
                            setShowPassword(true)
                        }}
                        onPointerLeave={() => {
                            setShowPassword(false)
                        }}
                    />
                </div>
                {capsLockOn && (
                    <p id="caps_lock_warning">Caps lock on päällä</p>
                )}
                <button type="submit" disabled={isLoading}>
                    {!isLoading ? "Kirjaudu sisään" : "Kirjaudutaan..."}
                </button>
            </form>
            <hr id="login_horizontal_line" />
            <div id="not_registered">
                <p id="">Etkö ole vielä rekisteröitynyt? </p>
                <Link to="/register" id="register_now">
                    Rekisteröidy nyt
                </Link>
            </div>
        </section>
    )
}
