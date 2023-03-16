import Notice from "../models/notice";

export const getAllNotice = async (req, res) => {
    try {
        const notices = await Notice.find()
        res.status(200).json(notices)
    } catch(error) {
        res.status(500).json({message: 'Something went wrong! Try again!'})
    }
}