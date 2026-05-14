import { Request, Response } from "express";

import { loginSchema } from "./auth.validation";

import { loginAdmin } from "./auth.service";

export const login = async (req: Request, res: Response) => {
	try {
		//
		// Validate request
		//

		const validatedData = loginSchema.parse(req.body);

		//
		// Login
		//

		const result = await loginAdmin(validatedData);

		return res.status(200).json({
			success: true,

			message: "Login successful",

			data: result,
		});
	} catch (error: any) {
		return res.status(400).json({
			success: false,

			message: error.message || "Login failed",
		});
	}
};

export const me = async (req: Request, res: Response) => {
	return res.status(200).json({
		success: true,

		data: req.admin,
	});
};
