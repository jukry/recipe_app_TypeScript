import React from "react"
import "./Styles/recipeImageInput.css"

export default function RecipeImageInput({ props }) {
    return (
        <div id="image-upload-container">
            <label htmlFor="image-upload" id="image-upload-button">
                Lisää kuva
            </label>
            <input
                type="file"
                name="imageUpload"
                id="image-upload"
                onChange={(event) => props.handleFileChange(event)}
            />
            {props.previewFile && (
                <figure id="preview-image-container">
                    <p>{props.file.name}</p>
                    <img
                        src={props.previewFile}
                        alt="esikatselukuva"
                        id="preview-image"
                    />
                    <button
                        id="delete-image-button"
                        onClick={(event) => props.handleFileChange(event)}
                    >
                        Poista kuva
                    </button>
                </figure>
            )}
        </div>
    )
}
