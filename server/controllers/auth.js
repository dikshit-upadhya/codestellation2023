import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const register = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            location,
            occupation,
            type
        } = req.body

        //encrypt password
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const reqdType = type || 'STUDENT'

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            userType: reqdType,
            verified: reqdType === 'ALUMNI' ? false : true,
            location,
            type,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save()

        res.status(201).json(savedUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const login = async (req,res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email }) 

        if (!user) return res.status(400).json({ message: "User does not exist." })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

        const token = jwt.sign({ id: user._id }, 'secret')
        delete user.password;
        res.status(200).json({ token, user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const acceptedRoles = (validRoles) => async (req, res, next) => {
	try {
        console.log(validRoles, req.user)
        const user = await User.findById(req.user.id)
		if (validRoles.includes(user.userType)) {
			return next()
		}
		res.status(403).json({message: 'This action is forbidden for you'})
	} catch (err) {
		res.status(500).json({message:'Something went wrong! Please try again!'})
	}
}