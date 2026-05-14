import { Router } from "express";

import * as farmerController from "./farmer.controller";

import { authenticate } from "../../middleware/auth.middleware";

import { authorize } from "../../middleware/role.middleware";

const router = Router();

router.post(
	"/",

	authenticate,

	authorize("SUPER_ADMIN", "STATE_ADMIN", "DISTRICT_ADMIN", "BLOCK_ADMIN"),

	farmerController.create,
);

router.get(
	"/",

	authenticate,

	farmerController.getAll,
);

router.get(
	"/:id",

	authenticate,

	farmerController.getById,
);

router.patch(
	"/:id",

	authenticate,

	authorize("SUPER_ADMIN", "STATE_ADMIN", "DISTRICT_ADMIN"),

	farmerController.update,
);

router.delete(
	"/:id",

	authenticate,

	authorize("SUPER_ADMIN"),

	farmerController.remove,
);

export default router;
