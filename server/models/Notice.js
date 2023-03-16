import mongoose from 'mongoose'

const noticeSchema = mongoose.Schema({
    noticeId: {
        type: String, 
        required: true
    }, 
    title: {
        type: String, 
        required: true,
    }, 
    description: {
        type: String, 
        required: true
    }, 

}, {
    timestamps: true
})

const Notice = mongoose.model("Notice", noticeSchema)

export default Notice;