import express from "express"
import { getFeedPosts, getUserPosts, likePost, createPost } from "../controllers/posts.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

/* READ */
router.get("/", verifyToken, getFeedPosts)
router.get("/:userId", verifyToken, getUserPosts)

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost)

router.post('/posts', verifyToken, createPost)
export default router