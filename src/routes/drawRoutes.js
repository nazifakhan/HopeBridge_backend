import { Router } from "express";
import { listDraws, createDraw, publishDraw } from "../controllers/drawController.js";
import { adminOnly, protect } from "../middleware/auth.js";
const router = Router();
router.get("/", protect, listDraws);
router.post("/", protect, adminOnly, createDraw);
router.patch("/:id/publish", protect, adminOnly, publishDraw);
export default router;