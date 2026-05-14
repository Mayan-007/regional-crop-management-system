import { AdminRole } from "@prisma/client";

interface AdminScope {
	role: AdminRole;

	scopeState?: string | null;
	scopeDistrict?: string | null;
	scopeBlock?: string | null;
}

export const buildScopeFilter = (admin: AdminScope) => {
	//
	// SUPER ADMIN
	//

	if (admin.role === "SUPER_ADMIN") {
		return {};
	}

	//
	// STATE ADMIN
	//

	if (admin.role === "STATE_ADMIN") {
		return {
			state: admin.scopeState,
		};
	}

	//
	// DISTRICT ADMIN
	//

	if (admin.role === "DISTRICT_ADMIN") {
		return {
			state: admin.scopeState,

			district: admin.scopeDistrict,
		};
	}

	//
	// BLOCK ADMIN
	//

	if (admin.role === "BLOCK_ADMIN") {
		return {
			state: admin.scopeState,

			district: admin.scopeDistrict,

			block: admin.scopeBlock,
		};
	}

	return {};
};
