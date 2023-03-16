import express from "express"
import { getAllNotice } from "../controllers/notice.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

/* READ */
router.get("/notice/all", getAllNotice)

export default router