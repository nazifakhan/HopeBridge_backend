import { Router } from "express";
import { getAdminOverview } from "../controllers/adminOverviewController.js";

const router = Router();

router.get("/", getAdminOverview);

export default router;
