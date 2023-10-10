import React, { useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import { UserContext } from "../Context/UserContext"
import Loader from "../Components/Loader"

export default function HomeLayout() {
    const { isLoading } = useContext(UserContext)
    const [showNav, setShowNav] = useState(false)
    const [showNavBar, setShowNavBar] = useState(true)
    const bodyElementHeight = document.body.scrollHeight

    const [scrollData, setScrollData] = useState({
        y: 0,
        lastY: 0,
    })
    useEffect(() => {
        const handleScroll = () => {
            setScrollData((prev) => ({
                ...prev,
                y: window.scrollY,
            }))
            setShowNav(false)
            if (scrollData.y >= scrollData.lastY && bodyElementHeight > 1000) {
                setShowNavBar(false)
            }
            if (scrollData.y <= scrollData.lastY) {
                setShowNavBar(true)
            }
        }
        const handleScrollEnd = () => {
            setScrollData((prev) => ({
                ...prev,
                lastY: scrollData.y,
            }))
        }
        window.addEventListener("scroll", handleScroll)
        window.addEventListener("scrollend", handleScrollEnd)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("scrollend", handleScrollEnd)
        }
    }, [scrollData, showNav])

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
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Navbar
                        props={[showNav, showNavBar]}
                        handleNavClick={handleNavClick}
                    />
                    <main>
                        <Outlet />
                    </main>
                    <Footer />
                </>
            )}
        </section>
    )
}
