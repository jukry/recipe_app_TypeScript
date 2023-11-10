import React, { Fragment } from "react"
import recipetags from "../utils/recipetags.js"

export default function RecipeTagsFilter({ props }) {
    const [tagFilterParams, setTagFilterParams, setSearchParams] = props

    const renderRecipeTagsFilter = () => {
        return recipetags.map((tag) => {
            return (
                <Fragment key={tag}>
                    <label
                        htmlFor={tag}
                        className={`recipe-filter-tag ${
                            tagFilterParams?.includes(tag)
                                ? "recipe-filter-tag-selected"
                                : ""
                        }`}
                    >
                        {tag}
                        <input
                            type="checkbox"
                            id={tag}
                            className="visuallyhidden"
                            aria-checked={tagFilterParams?.includes(tag)}
                            onChange={(e) => {
                                const tags = tagFilterParams || []
                                if (!tagFilterParams?.includes(tag)) {
                                    tags.push(tag)
                                    setTagFilterParams(() => [...tags])
                                    setSearchParams((prev) => {
                                        prev.append("tags", tag)
                                        return prev
                                    })
                                } else {
                                    tags.splice(tags.indexOf(tag), 1)
                                    setTagFilterParams(() => [...tags])
                                    setSearchParams((prev) => {
                                        prev.delete("tags", tag)
                                        return prev
                                    })
                                }
                            }}
                        ></input>
                    </label>
                </Fragment>
            )
        })
    }
    const renderedTags = renderRecipeTagsFilter()
    return (
        <section id="recipe-tags-filter">
            <div id="filter-tag-container">
                <h3>Suodata reseptejä</h3>
                {renderedTags}
            </div>
        </section>
    )
}
