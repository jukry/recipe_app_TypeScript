import React from "react"

export default function IngredientInput(props) {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            className={props.className}
            name={props.name}
            required={props.required}
        />
    )
}
