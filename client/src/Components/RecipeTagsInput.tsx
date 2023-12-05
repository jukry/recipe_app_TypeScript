import React, { Fragment } from "react"
import "./Styles/recipeTagsInput.css"
import recipetags from "../utils/recipetags"

export default function RecipeTagsInput({
    props: [recipe, setRecipe],
}: {
    props: [
        recipe: {
            tags?: string[]
        },
        setRecipe: React.Dispatch<React.SetStateAction<{}>>
    ]
}) {
    const renderTags = () => {
        return recipetags.map((tag: string) => {
            return (
                <Fragment key={tag}>
                    <label
                        htmlFor={tag}
                        className={`recipe-tag ${
                            recipe?.tags?.includes(tag) ? "selected-tag" : ""
                        }`}
                    >
                        {tag}
                        <input
                            type="checkbox"
                            id={tag}
                            className="visuallyhidden"
                            aria-checked={recipe?.tags?.includes(tag)}
                            onChange={() => {
                                const tags = recipe?.tags || []
                                if (!recipe?.tags?.includes(tag)) {
                                    tags.push(tag)
                                    setRecipe((prev) => ({
                                        ...prev,
                                        tags: tags,
                                    }))
                                } else {
                                    tags.splice(tags.indexOf(tag), 1)
                                    setRecipe((prev) => ({
                                        ...prev,
                                        tags: tags,
                                    }))
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
        <section id="recipe-tags">
            <h4 tabIndex={0}>Reseptin tunnisteet:</h4>
            <div id="tag-container">{renderedTags}</div>
        </section>
    )
}
