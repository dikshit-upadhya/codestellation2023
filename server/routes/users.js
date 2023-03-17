import express from "express"
import { getUser, getUserFriends, addRemoveFriend, getAllUsers, getAllUnverifiedUsers, verifyUser } from "../controllers/users.js"
import { acceptedRoles, verifyToken } from "../middleware/auth.js"

const router = express.Router()

/* READ */
// /:id means if the frontend is sending a particular id we 
// can grab it using this syntax aka query string
router.get('/all', verifyToken, getAllUsers)
router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getUserFriends)


router.get('/unverified', verifyToken, acceptedRoles(['ADMIN']), getAllUnverifiedUsers)
/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend)
router.patch("/verify-user/:userId", verifyToken, acceptedRoles(['ADMIN']), verifyUser)

export default router;