import { Router } from "express";
import { listCharities, createCharity } from "../controllers/charityController.js";
import { adminOnly, protect } from "../middleware/auth.js";
const router = Router();
router.get("/", listCharities);
router.post("/", protect, adminOnly, createCharity);
export default router;