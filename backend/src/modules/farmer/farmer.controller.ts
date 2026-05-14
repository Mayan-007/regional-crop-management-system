import { Request, Response } from "express";

import { createFarmerSchema, updateFarmerSchema } from "./farmer.validation";

import * as farmerService from "./farmer.service";

export const create = async (req: Request, res: Response) => {
	try {
		const validated = createFarmerSchema.parse(req.body);

		const farmer = await farmerService.createFarmer(validated);

		return res.status(201).json({
			success: true,
			data: farmer,
		});
	} catch (error: any) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

export const getAll = async (_req: Request, res: Response) => {
	try {
		const farmers = await farmerService.getAllFarmers();

		return res.json({
			success: true,
			data: farmers,
		});
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const getById = async (req: Request, res: Response) => {
	try {
		const farmer = await farmerService.getFarmerById(req.params.id);

		if (!farmer) {
			return res.status(404).json({
				success: false,
				message: "Farmer not found",
			});
		}

		return res.json({
			success: true,
			data: farmer,
		});
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const update = async (req: Request, res: Response) => {
	try {
		const validated = updateFarmerSchema.parse(req.body);

		const farmer = await farmerService.updateFarmer(
			req.params.id,
			validated,
		);

		return res.json({
			success: true,
			data: farmer,
		});
	} catch (error: any) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

export const remove = async (req: Request, res: Response) => {
	try {
		await farmerService.deleteFarmer(req.params.id);

		return res.json({
			success: true,
			message: "Farmer deleted",
		});
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
