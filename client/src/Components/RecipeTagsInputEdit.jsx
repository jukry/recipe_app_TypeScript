import React, { Fragment } from "react"
import "./Styles/recipeTagsInputEdit.css"
import recipetags from "../utils/recipetags.js"

export default function RecipeTagsInputEdit({ props }) {
    const [tags, setTags] = props
    const renderTags = () => {
        return recipetags.map((tag, i) => {
            return (
                <Fragment key={tag}>
                    <label
                        htmlFor={tag}
                        className={`recipe-tag-edit ${
                            tags?.includes(tag) ? "selected-tag-edit" : ""
                        }`}
                    >
                        {tag}
                        <input
                            type="checkbox"
                            id={tag}
                            value={tag}
                            className="visuallyhidden"
                            aria-checked={tags?.includes(tag)}
                            name={`tag${i}`}
                            onClick={(e) => {
                                const newTags = tags || []
                                if (!tags?.includes(tag)) {
                                    newTags.push(tag)
                                    setTags((prev) => [...newTags])
                                } else {
                                    newTags.splice(newTags.indexOf(tag), 1)
                                    setTags((prev) => [...newTags])
                                }
                            }}
                        ></input>
                    </label>
                </Fragment>
            )
        })
    }
    const renderedTags = renderTags()

    return (
        <section id="recipe-tags-edit">
            <h4 tabIndex={0}>Reseptin tunnisteet:</h4>
            <div id="tag-container-edit">{renderedTags}</div>
        </section>
    )
}
