import React from "react"
import "./Styles/mobileNavButton.css"

export default function ShowMobileNavButton({ showNav, handleNavClick }) {
    return (
        <div onClick={(e) => handleNavClick(e)} className="nav-button">
            <span
                className={`${!showNav ? "line line-1" : "cross cross-1"}`}
            ></span>
            <span
                className={`${!showNav ? "line line-2" : "cross cross-2"}`}
            ></span>
            <span
                className={`${!showNav ? "line line-3" : "line-hidden"}`}
            ></span>
        </div>
    )
}
