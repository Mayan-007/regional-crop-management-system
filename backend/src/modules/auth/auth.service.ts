import bcrypt from "bcrypt";

import prisma from "../../config/prisma";

import { generateToken } from "../../utils/jwt";

import { LoginBody } from "./auth.types";

export const loginAdmin = async (body: LoginBody) => {
	const { email, password } = body;

	//
	// Find admin
	//

	const admin = await prisma.admin.findUnique({
		where: {
			email,
		},
	});

	if (!admin) {
		throw new Error("Invalid credentials");
	}

	//
	// Check active status
	//

	if (!admin.isActive) {
		throw new Error("Admin account is disabled");
	}

	//
	// Compare password
	//

	const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

	if (!isPasswordValid) {
		throw new Error("Invalid credentials");
	}

	//
	// Generate JWT
	//

	const token = generateToken({
		id: admin.id,

		role: admin.role,

		scopeState: admin.scopeState,
		scopeDistrict: admin.scopeDistrict,
		scopeBlock: admin.scopeBlock,
	});

	//
	// Update last login
	//

	await prisma.admin.update({
		where: {
			id: admin.id,
		},

		data: {
			lastLoginAt: new Date(),
		},
	});

	return {
		token,

		admin: {
			id: admin.id,

			firstName: admin.firstName,
			lastName: admin.lastName,

			email: admin.email,

			role: admin.role,

			scopeState: admin.scopeState,
			scopeDistrict: admin.scopeDistrict,
			scopeBlock: admin.scopeBlock,
		},
	};
};
