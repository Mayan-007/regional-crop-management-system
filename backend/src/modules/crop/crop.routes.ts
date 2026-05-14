import { Router } from "express";

import * as cropController from "./crop.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";

const router = Router();

router.post("/", authenticate, authorize("SUPER_ADMIN"), cropController.create);

router.get("/", authenticate, cropController.getAll);

router.get("/:id", authenticate, cropController.getById);

router.patch(
	"/:id",
	authenticate,
	authorize("SUPER_ADMIN"),
	cropController.update,
);

router.delete(
	"/:id",
	authenticate,
	authorize("SUPER_ADMIN"),
	cropController.remove,
);

export default router;
