import { ChangeEventHandler } from "react"

export default function IngredientInput(props: {
    id: string
    placeholder?: string
    type: string
    className?: string
    name: string
    required?: boolean
    value?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
}) {
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
                onChange={(event) => {
                    if (!props.onChange) return
                    props.onChange(event)
                }}
                autoComplete="off"
            />
        </>
    )
}
