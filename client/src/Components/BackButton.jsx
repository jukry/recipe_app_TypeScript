import React from "react"
import { Link, useLocation } from "react-router-dom"
import "./Styles/backButton.css"

export default function BackButton(props) {
    const location = useLocation()
    console.log(location.state)
    return (
        <Link
            to={
                location?.state?.search && location?.state?.search !== "?"
                    ? `../${location.state.search}`
                    : location?.state?.referrer !== "/" &&
                      location?.state?.referrer !== undefined
                    ? `${location?.state?.referrer}`
                    : ".."
            }
            relative="route"
            className="back-button"
        >
            Takaisin
            {location?.state?.referrer === undefined
                ? " hakuun"
                : location?.state?.referrer === "/"
                ? " hakuun"
                : location?.state?.referrer === "/account/myrecipes"
                ? " omiin resepteihin"
                : location?.state?.referrer === "/account/favoriterecipes"
                ? " lempiresepteihin"
                : ""}
        </Link>
    )
}
