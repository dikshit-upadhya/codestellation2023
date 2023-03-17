import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        //req.params for properties attached to the url, prefixed by :example
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        console.log("Users: ", users)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong! Please try again' })
    }
}

export const getAllUnverifiedUsers = async (req, res) => {
    try {
        const users = await User.find({verified: false})
        res.status(200).json(users)
    } catch(error) {
        res.status(500).json({message: 'Something went wrong! Please try again!'})
    }
}

export const verifyUser = async (req, res) => {
    try {
        const id = req.params.userId
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({message: 'User not found'})
        }
        user.verified = true
        const savedUser = await user.save()
        res.status(200).json(savedUser)
    } catch(error) {
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        )
        res.status(200).json(formattedFriends)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const removeUser = async (req, res) => {
    try {
        await User.deleteOne({_id: req.params.userId})
        res.status(200).send()
    } catch(err) {
        res.status(500).json({message: 'Something went wrong'})
    }
}
