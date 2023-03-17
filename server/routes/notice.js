import express from "express"
import { getAllNotice, createNotice } from "../controllers/notice.js"
import { verifyToken } from "../middleware/auth.js"
import { acceptedRoles } from "../controllers/auth.js"

const router = express.Router()

/* READ */
router.get("/all", verifyToken, getAllNotice)
router.post("/", verifyToken, acceptedRoles(['ALUMNI', 'ADMIN']),  createNotice)

export default router