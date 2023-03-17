import Notice from "../models/notice";

export const getAllNotice = async (req, res) => {
    try {
        const notices = await Notice.find()
        res.status(200).json(notices)
    } catch(error) {
        res.status(500).json({message: 'Something went wrong! Try again!'})
    }
}

export const createNotice = async (req, res) => {
    try {
        const newNotice = new Notice({
            createdBy: req.user._id, 
            title: req.body.title, 
            description: req.body.description, 
        })
        const savedNotice = await newNotice.save()
        res.status(201).send(savedNotice)
    } catch(error) {
        res.status(500).json({message: 'Something went wrong! Try again!'})
    }
}