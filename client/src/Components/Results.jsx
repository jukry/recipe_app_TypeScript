import Fooditem from "./Fooditem"

export default function Results(props) {
    const recipeData = props.props[0]
    const searchParams = props.props[1]

    const foodItem = recipeData.map((item) => {
        return <Fooditem props={[item, searchParams]} key={item.id} />
    })

    return (
        <>
            <div className="results">
                {recipeData.length == 0 ? (
                    <h2>Reseptejä ei löytynyt hakusanalla</h2>
                ) : (
                    foodItem
                )}
            </div>
        </>
    )
}
