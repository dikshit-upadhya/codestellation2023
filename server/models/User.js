import mongoose from "mongoose";

const USER_ROLES = {
    ADMIN: 'ADMIN', 
    STUDENT: 'STUDENT', 
    ALUMNI: 'ALUMNI'
}

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        picture: {
            type: String,
            default: "",
        },
        picturePath: {
            type: String,
            default: "",
        },
        userType: {
            default: USER_ROLES.STUDENT,
            type: String, 
            enum: USER_ROLES
        },
        verified: {
            default: false,
            type: Boolean,
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    }, {timestamps: true}
)

const User = mongoose.model("User", UserSchema)

export default User