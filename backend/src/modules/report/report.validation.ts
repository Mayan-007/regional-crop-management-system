import { z } from "zod";

export const geographySummaryQuerySchema = z.object({
	level: z.enum(["state", "district", "block", "village"]),
});
