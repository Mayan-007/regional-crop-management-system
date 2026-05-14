import { Router } from "express";

import * as farmController from "./farm.controller";

import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, farmController.create);

router.get("/", authenticate, farmController.getAll);

router.get("/:id", authenticate, farmController.getById);

router.patch("/:id", authenticate, farmController.update);

router.delete("/:id", authenticate, farmController.remove);

export default router;
