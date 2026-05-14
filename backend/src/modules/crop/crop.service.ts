import prisma from "../../config/prisma";

export const createCrop = async (data: any) => {
	return prisma.crop.create({
		data,
	});
};

export const getAllCrops = async () => {
	return prisma.crop.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});
};

export const getCropById = async (id: string) => {
	return prisma.crop.findUnique({
		where: { id },
	});
};

export const updateCrop = async (id: string, data: any) => {
	return prisma.crop.update({
		where: { id },

		data,
	});
};

export const deleteCrop = async (id: string) => {
	return prisma.crop.delete({
		where: { id },
	});
};
