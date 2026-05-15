import { Router } from "express";

import * as aiController from "../controllers/ai.controller";

import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/chat", authenticate, aiController.chat);

export default router;
