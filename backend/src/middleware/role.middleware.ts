import { Request, Response, NextFunction } from "express";

import { AdminRole } from "@prisma/client";

export const authorize =
	(...allowedRoles: AdminRole[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			//
			// Ensure admin exists
			//

			if (!req.admin) {
				return res.status(401).json({
					success: false,
					message: "Unauthorized",
				});
			}

			//
			// Check role
			//

			if (!allowedRoles.includes(req.admin.role)) {
				return res.status(403).json({
					success: false,
					message: "Forbidden",
				});
			}

			next();
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: "Authorization failed",
			});
		}
	};
