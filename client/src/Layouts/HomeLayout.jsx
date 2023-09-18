import React, { useContext, useState } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import { UserContext } from "../Context/UserContext"
import Loader from "../Components/Loader"

export default function HomeLayout() {
    const { isLoading } = useContext(UserContext)
    const [showNav, setShowNav] = useState(false)

    function handleNavClick(e) {
        if (showNav) {
            setShowNav(() => {
                return false
            })
        } else if (
            !showNav &&
            (e.target.className === "nav-button" ||
                e.target.className.includes("line"))
        ) {
            setShowNav(() => {
                return true
            })
        }
    }

    return (
        <div className="container" onClick={handleNavClick}>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Navbar props={showNav} handleNavClick={handleNavClick} />
                    <main>
                        <Outlet />
                    </main>
                    <Footer />
                </>
            )}
        </div>
    )
}
