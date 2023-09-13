import React, { useContext } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import { UserContext } from "../Context/UserContext"
import Loader from "../Components/Loader"

export default function HomeLayout() {
    const { isLoading } = useContext(UserContext)
    console.log(isLoading)
    return (
        <div className="container">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Navbar />
                    <main>
                        <Outlet />
                    </main>
                    <Footer />
                </>
            )}
        </div>
    )
}
