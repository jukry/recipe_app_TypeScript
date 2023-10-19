import React, { useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"

export default function HomeLayout() {
    const [showNav, setShowNav] = useState(false)
    const [showNavBar, setShowNavBar] = useState(true)
    const [position, setPosition] = useState(window.scrollY)

    useEffect(() => {
        const handleScroll = () => {
            let moving = window.scrollY
            setShowNav(false)
            setShowNavBar(position > moving)
            setPosition(moving)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [position])

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
        <section className="container" id="container" onClick={handleNavClick}>
            <Navbar
                props={[showNav, showNavBar]}
                handleNavClick={handleNavClick}
            />
            <main>
                <Outlet />
            </main>
            <Footer />
        </section>
    )
}
