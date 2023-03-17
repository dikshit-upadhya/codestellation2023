import express from "express"
import { getUser, getUserFriends, getAllUsers, getAllUnverifiedUsers, verifyUser, removeUser } from "../controllers/users.js"
import {  verifyToken } from "../middleware/auth.js"
import { acceptedRoles } from "../controllers/auth.js"

const router = express.Router()

/* READ */
// /:id means if the frontend is sending a particular id we 
// can grab it using this syntax aka query string
router.get('/all', verifyToken, getAllUsers)
router.patch("/verify-user/:userId", verifyToken, acceptedRoles(['ADMIN']), verifyUser)
router.get('/unverified', verifyToken, acceptedRoles(['ADMIN']), getAllUnverifiedUsers)
router.delete('/:userId', verifyToken, removeUser)
router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getUserFriends)




export default router;