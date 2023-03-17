import mongoose from 'mongoose'

const noticeSchema = mongoose.Schema({
    createdBy: {
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
    verified: {
        type: Boolean,
        required: true, 
        default: false
    }
}, {
    timestamps: true
})

const Notice = mongoose.model("Notice", noticeSchema)

export default Notice;