import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";

import adminRoutes from "../modules/admin/admin.routes";

import farmRoutes from "../modules/farm/farm.routes";

import cropRoutes from "../modules/crop/crop.routes";

import farmerRoutes from "../modules/farmer/farmer.routes";

import farmingRecordRoutes from "../modules/farming-record/farming-record.routes";

import reportRoutes from "../modules/report/report.routes";

const router = Router();

router.use("/admin", adminRoutes);

router.use("/auth", authRoutes);

router.use("/crops", cropRoutes);

router.use("/farms", farmRoutes);

router.use("/farmers", farmerRoutes);

router.use("/farming-records", farmingRecordRoutes);

router.use("/reports", reportRoutes);

export default router;
