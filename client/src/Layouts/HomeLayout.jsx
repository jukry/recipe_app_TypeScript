import React from "react"
import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"

export default function HomeLayout() {
    return (
        <div className="container">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
