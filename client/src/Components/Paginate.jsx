import React from "react"

export default function Paginate({
    currentPage,
    maxPages,
    containerId,
    backBtnId,
    forwardBtnId,
    setCurrentPage,
}) {
    const handlePagination = (event, setCurrentPage) => {
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
        <section id={containerId}>
            <button
                onClick={(event) => {
                    handlePagination(event, setCurrentPage)
                }}
                id={backBtnId}
            >
                {"<"}
            </button>
            <p>
                {currentPage} / {maxPages || 1}
            </p>
            <button
                onClick={(event) => handlePagination(event, setCurrentPage)}
                id={forwardBtnId}
            >
                {">"}
            </button>
        </section>
    )
}
