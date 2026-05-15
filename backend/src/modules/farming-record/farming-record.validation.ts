import { z } from "zod";

export const createFarmingRecordSchema = z.object({
	farmId: z.string().uuid(),

	cropId: z.string().uuid(),

	status: z.enum(["PLANNED", "SOWN", "GROWING", "HARVESTED", "FAILED"]),

	sowingDate: z.string(),

	predictedHarvestDate: z.string(),

	actualHarvestDate: z.string().optional(),

	predictedQuantity: z.number(),

	actualQuantity: z.number().optional(),

	remarks: z.string().optional(),

	lossReason: z.string().optional(),

	harvestSeason: z.string().optional(),
});

export const updateFarmingRecordSchema = createFarmingRecordSchema.partial();
