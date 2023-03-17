import jwt from "jsonwebtoken"

//json web token is a compact, URL safe means of representing claims to be transferred between two
//parties

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization")

        if(!token) {
            return res.status(403).send("Accessed Denied")
        }
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }

        const verified = jwt.verify(token, 'secret')
        req.user = verified
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const acceptedRoles = (validRoles) => async (req, res, next) => {
	try {
		if (validRoles.includes(req.user.role)) {
			return next()
		}
		res.status(403).json({message: 'This action is forbidden for you'})
	} catch (err) {
		res.status(500).json({message:'Something went wrong! Please try again!'})
	}
}