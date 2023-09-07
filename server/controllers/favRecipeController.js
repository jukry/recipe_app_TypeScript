import User from "../models/User.js"

const addFavRecipe = async (req, res) => {
    const { id } = req.body //recipe id
    const userId = req.user.id
    const [userData] = await User.find({ _id: userId }).exec()
    if (userData?.favrecipes?.includes(id)) {
        return res.status(304).json({ Message: "Recipe already in favorites" })
    }
    try {
        await User.findOneAndUpdate(
            { _id: userId },
            {
                $push: {
                    favrecipes: id,
                },
            }
        ).exec()
        const [updatedUserData] = await User.find({ _id: userId })
        return res.status(200).json({ Message: updatedUserData.favrecipes })
    } catch {
        return res.status(400).json({ Message: "Bad request" })
    }
}
const deleteFavRecipe = async (req, res) => {
    const { id } = req.body //recipe id
    const userId = req.user.id
    const [userData] = await User.find({ _id: userId }).exec()
    if (!userData?.favrecipes?.includes(id)) {
        return res
            .status(404)
            .json({ Message: "Recipe not found in favorites" })
    }
    try {
        await User.findOneAndUpdate(
            { _id: userId },
            {
                $pull: {
                    favrecipes: id,
                },
            }
        ).exec()
        const [updatedUserData] = await User.find({ _id: userId })
        return res.status(200).json({ Message: updatedUserData.favrecipes })
    } catch {
        return res.status(400).json({ Message: "Bad request" })
    }
}

export { addFavRecipe, deleteFavRecipe }
