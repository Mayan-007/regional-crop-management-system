import { Request, Response } from "express";

import * as aiService from "../services/ai-chat.service";

export const chat = async (req: Request, res: Response) => {
	try {
		const { message } = req.body;

		if (!message) {
			return res.status(400).json({
				success: false,
				message: "Message is required",
			});
		}

		const response = await aiService.processAIQuery(message, req.admin);

		return res.json(response);
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
