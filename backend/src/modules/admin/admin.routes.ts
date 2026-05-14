import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";

import { authorize } from "../../middleware/role.middleware";

const router = Router();

router.get(
	"/dashboard",

	authenticate,

	authorize("SUPER_ADMIN"),

	(_req, res) => {
		return res.json({
			success: true,

			message: "Welcome Super Admin Dashboard",
		});
	},
);

export default router;
