import express from "express"
import { getAllNotice, createNotice } from "../controllers/notice.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

/* READ */
router.get("/notice/all", getAllNotice)
router.post("/notice", createNotice)

export default router