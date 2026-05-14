import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		//
		// Get token
		//

		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({
				success: false,
				message: "Authorization header missing",
			});
		}

		//
		// Bearer token extraction
		//

		const token = authHeader.split(" ")[1];

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Token missing",
			});
		}

		//
		// Verify token
		//

		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET!,
		) as Express.Request["admin"];

		//
		// Attach admin to request
		//

		req.admin = decoded;

		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Invalid or expired token",
		});
	}
};
