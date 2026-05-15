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

router.get("/crop-yield", authenticate, reportController.cropYieldAnalytics);

router.get(
	"/seasonal-analytics",
	authenticate,
	reportController.seasonalAnalytics,
);

router.get("/loss-analysis", authenticate, reportController.lossAnalysis);

router.get(
	"/farmer-productivity",
	authenticate,
	reportController.farmerProductivity,
);

export default router;
