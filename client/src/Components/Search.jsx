export default function Search() {
    return (
        <section className="search-container">
            <h1>Etsi reseptiä nimellä (tai ainesosalla?)</h1>
            <div className="input-wrapper">
                <span className="search-icon">&#x1F50E;&#xFE0E;</span>
                <input
                    type="text"
                    placeholder="Hae reseptiä"
                    className="recipe-search"
                />
            </div>
        </section>
    )
}
