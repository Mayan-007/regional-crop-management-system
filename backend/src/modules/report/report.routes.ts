import { Router } from "express";

import * as reportController from "./report.controller";

import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.get("/dashboard-kpis", authenticate, reportController.dashboardKPIs);

router.get(
	"/geography-summary",
	authenticate,
	reportController.geographySummary,
);

export default router;
