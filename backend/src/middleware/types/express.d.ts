import { AdminRole } from "@prisma/client";

declare global {
	namespace Express {
		interface Request {
			admin?: {
				id: string;

				role: AdminRole;

				scopeState?: string | null;
				scopeDistrict?: string | null;
				scopeBlock?: string | null;
			};
		}
	}
}

export {};
