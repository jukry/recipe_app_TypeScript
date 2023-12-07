import "./Styles/recipeImageInput.css"
import { RecipeProps } from "../utils/APIResponseTypes"

export default function RecipeImageInput({ props }: RecipeProps) {
    return (
        <div id="image-upload-container">
            <label htmlFor="image-upload" id="image-upload-button" tabIndex={0}>
                Lisää kuva
            </label>
            <input
                type="file"
                name="imageUpload"
                id="image-upload"
                onChange={(event) => props.handleFileChange(event)}
            />
            {props.previewFile && props.file && (
                <figure id="preview-image-container">
                    <p>{props.file.name}</p>
                    <img
                        src={props.previewFile}
                        alt="esikatselukuva"
                        id="preview-image"
                    />
                    <button
                        id="delete-image-button"
                        onClick={(event) => props.handleFileDelete(event)}
                    >
                        Poista kuva
                    </button>
                </figure>
            )}
        </div>
    )
}
