import { z } from "zod";

export const createFarmerSchema = z.object({
	firstName: z.string().min(2),

	lastName: z.string().min(2),

	contactNumber: z.string().min(10),

	email: z.email().optional(),
});

export const updateFarmerSchema = createFarmerSchema.partial();
