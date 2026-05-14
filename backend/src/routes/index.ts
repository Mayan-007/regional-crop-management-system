import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";

import adminRoutes from "../modules/admin/admin.routes";

import farmRoutes from "../modules/farm/farm.routes";

import cropRoutes from "../modules/crop/crop.routes";

import farmerRoutes from "../modules/farmer/farmer.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/admin", adminRoutes);

router.use("/farms", farmRoutes);

router.use("/crops", cropRoutes);

router.use("/farmers", farmerRoutes);

export default router;
