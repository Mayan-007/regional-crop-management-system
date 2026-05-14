import prisma from "../../config/prisma";

export const createFarmer = async (data: any) => {
	return prisma.farmer.create({
		data,
	});
};

export const getAllFarmers = async () => {
	return prisma.farmer.findMany({
		include: {
			farms: true,
		},

		orderBy: {
			createdAt: "desc",
		},
	});
};

export const getFarmerById = async (id: string) => {
	return prisma.farmer.findUnique({
		where: { id },

		include: {
			farms: {
				include: {
					farmingRecords: {
						include: {
							crop: true,
						},
					},
				},
			},
		},
	});
};

export const updateFarmer = async (id: string, data: any) => {
	return prisma.farmer.update({
		where: { id },

		data,
	});
};

export const deleteFarmer = async (id: string) => {
	return prisma.farmer.delete({
		where: { id },
	});
};
