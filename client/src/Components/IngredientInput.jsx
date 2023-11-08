import React from "react"

export default function IngredientInput(props) {
    return (
        <>
            <label htmlFor={props.id} className="visuallyhidden">
                {props.placeholder}
            </label>
            <input
                type={props.type}
                placeholder={props.placeholder}
                className={props.className}
                name={props.name}
                id={props.id}
                required={props.required}
                value={props.value}
                onChange={(event) => props.onChange(event)}
                autoComplete="off"
            />
        </>
    )
}
