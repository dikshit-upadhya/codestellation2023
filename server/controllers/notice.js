import Notice from "../models/Notice.js";
import User from "../models/User.js";

export const getAllNotice = async (req, res) => {
    try {
        const notices = await Notice.find()
        res.status(200).json(notices)
    } catch(error) {
        res.status(500).json({message: 'Something went wrong! Try again!'})
    }
}

export const getVerifiedNotices = async (req, res) => {
    try {
        const notices = await Notice.find({verified: true})
        res.status(200).json(notices)
    } catch(error) {
        res.status(500).json({message: 'Something went wrong! Try again!'})
    }
}

export const approveNotice = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.noticeId)
        if(!notice) {
            return res.status(404).json({message: 'No such notice exists'})
        }
        notice.verified = true
        const savedNotice = await notice.save()
        res.status(200).json(savedNotice)
    } catch(error) {
        res.status(500).json({message: 'Something went wrong! Try again!'})
    }
}

export const createNotice = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        const newNotice = new Notice({
            createdBy: user._id, 
            title: req.body.title, 
            description: req.body.description,
        })

        if(user.userType === 'ADMIN') {
            newNotice.verified = true   
        }
        const savedNotice = await newNotice.save()
        res.status(201).send(savedNotice)
    } catch(error) {
        res.status(500).json({message: 'Something went wrong! Try again!'})
    }
}