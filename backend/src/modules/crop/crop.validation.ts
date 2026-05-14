import { z } from "zod";

export const createCropSchema = z.object({
	name: z.string().min(2),

	variety: z.string().min(2),

	scientificName: z.string().optional(),

	category: z.enum([
		"CEREAL",
		"PULSE",
		"OILSEED",
		"CASH_CROP",
		"HORTICULTURE",
		"PLANTATION",
	]),

	season: z.enum(["KHARIF", "RABI", "ZAID"]),

	expectedYieldPerAcre: z.number(),

	harvestCycleDays: z.number(),

	waterRequirementMm: z.number().optional(),

	soilSuitability: z.string().optional(),

	description: z.string().optional(),
});

export const updateCropSchema = createCropSchema.partial();
