import { z } from "zod";

export const createFarmSchema = z.object({
	farmerId: z.string().uuid(),

	farmName: z.string().optional(),

	totalAreaAcres: z.number(),

	soilType: z.string(),

	irrigationType: z.string().optional(),

	state: z.string(),

	district: z.string(),

	block: z.string(),

	village: z.string(),

	latitude: z.number().optional(),

	longitude: z.number().optional(),
});

export const updateFarmSchema = createFarmSchema.partial();
