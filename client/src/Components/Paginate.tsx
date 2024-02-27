import { BaseSyntheticEvent, Dispatch } from "react"

export default function Paginate({
    currentPage,
    maxPages,
    containerId,
    backBtnId,
    forwardBtnId,
    setCurrentPage,
}: {
    currentPage: number
    maxPages: number
    containerId: string
    backBtnId: string
    forwardBtnId: string
    setCurrentPage: Dispatch<React.SetStateAction<number>>
}) {
    const handlePagination = (
        event: BaseSyntheticEvent,
        setCurrentPage: Dispatch<React.SetStateAction<number>>
    ) => {
        event.stopPropagation()
        event.preventDefault()
        const navButtonPressed = event.target.id
        navButtonPressed === forwardBtnId
            ? setCurrentPage((prev) => {
                  if (prev < maxPages) return prev + 1
                  else return prev
              })
            : setCurrentPage((prev) => {
                  if (prev > 1) return prev - 1
                  else return prev
              })
    }
    return (
        <div id={containerId}>
            <button
                onClick={(event) => {
                    handlePagination(event, setCurrentPage)
                }}
                id={backBtnId}
                aria-label="Vaihda edelliselle sivulle"
            >
                {"<"}
            </button>
            <p
                tabIndex={0}
                aria-label={`Nyt sivulla ${currentPage}, sivuja yhteensä ${maxPages}`}
            >
                {currentPage} / {maxPages || 1}
            </p>
            <button
                onClick={(event) => handlePagination(event, setCurrentPage)}
                id={forwardBtnId}
                aria-label="Vaihda seuraavalle sivulle"
            >
                {">"}
            </button>
        </div>
    )
}
