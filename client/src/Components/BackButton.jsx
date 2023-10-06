import React from "react"
import { Link, useLocation } from "react-router-dom"
import "./Styles/backButton.css"

export default function BackButton(props) {
    const location = useLocation()
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
            Takaisin{" "}
            {props?.text
                ? props.text
                : location?.state?.referrer === undefined ||
                  location?.state?.referrer === "/"
                ? "hakuun"
                : location?.state?.referrer === "/account/myrecipes"
                ? "omiin resepteihin"
                : location?.state?.referrer === "/account/favoriterecipes"
                ? "lempiresepteihin"
                : ""}
        </Link>
    )
}
