import { Request, Response } from "express";

import * as aiService from "../services/ai-chat.service";

import { handleAIQuery } from "../openai/openai-orchestrator.service";

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

export const aiChatController = async (req: Request, res: Response) => {
	try {
		const { message } = req.body;

		const result = await handleAIQuery(message, req.admin);

		return res.status(200).json({
			success: true,

			data: result,
		});
	} catch (error: any) {
		return res.status(500).json({
			success: false,

			message: error.message,
		});
	}
};
