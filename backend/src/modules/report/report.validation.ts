import { z } from "zod";

export const geographySummaryQuerySchema = z.object({
	level: z.enum(["state", "district", "block", "village"]),
});

export const cropYieldQuerySchema = z.object({
	season: z.string().optional(),

	state: z.string().optional(),

	district: z.string().optional(),

	block: z.string().optional(),
});

export const seasonalAnalyticsQuerySchema = z.object({
	year: z.string().optional(),
});

export const farmerProductivityQuerySchema = z.object({
	limit: z.coerce.number().optional(),
});
