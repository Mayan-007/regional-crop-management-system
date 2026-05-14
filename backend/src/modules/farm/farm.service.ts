import prisma from "../../config/prisma";

import { buildScopeFilter } from "../../utils/scope-filter";

export const createFarm = async (data: any) => {
	return prisma.farm.create({
		data,
	});
};

export const getAllFarms = async (admin: Express.Request["admin"]) => {
	const scopeFilter = buildScopeFilter(admin!);

	return prisma.farm.findMany({
		where: {
			...scopeFilter,
		},

		include: {
			farmer: true,

			farmingRecords: {
				include: {
					crop: true,
				},
			},
		},

		orderBy: {
			createdAt: "desc",
		},
	});
};

export const getFarmById = async (
	id: string,
	admin: Express.Request["admin"],
) => {
	const scopeFilter = buildScopeFilter(admin!);

	return prisma.farm.findFirst({
		where: {
			id,

			...scopeFilter,
		},

		include: {
			farmer: true,

			farmingRecords: {
				include: {
					crop: true,
				},
			},
		},
	});
};

export const updateFarm = async (
	id: string,
	data: any,
	admin: Express.Request["admin"],
) => {
	const scopeFilter = buildScopeFilter(admin!);

	//
	// Verify scope ownership first
	//

	const existingFarm = await prisma.farm.findFirst({
		where: {
			id,

			...scopeFilter,
		},
	});

	if (!existingFarm) {
		throw new Error("Farm not found or unauthorized");
	}

	return prisma.farm.update({
		where: {
			id,
		},

		data,
	});
};

export const deleteFarm = async (
	id: string,
	admin: Express.Request["admin"],
) => {
	const scopeFilter = buildScopeFilter(admin!);

	//
	// Verify scope ownership first
	//

	const existingFarm = await prisma.farm.findFirst({
		where: {
			id,

			...scopeFilter,
		},
	});

	if (!existingFarm) {
		throw new Error("Farm not found or unauthorized");
	}

	return prisma.farm.delete({
		where: {
			id,
		},
	});
};
