import { Router } from "express";

import * as farmingRecordController from "./farming-record.controller";

import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, farmingRecordController.create);

router.get("/", authenticate, farmingRecordController.getAll);

router.get("/:id", authenticate, farmingRecordController.getById);

router.patch("/:id", authenticate, farmingRecordController.update);

router.delete("/:id", authenticate, farmingRecordController.remove);

export default router;
