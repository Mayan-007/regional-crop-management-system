import { Request, Response } from "express";

import { createFarmSchema, updateFarmSchema } from "./farm.validation";

import * as farmService from "./farm.service";

export const create = async (req: Request, res: Response) => {
	try {
		const validated = createFarmSchema.parse(req.body);

		const farm = await farmService.createFarm(validated);

		return res.status(201).json({
			success: true,
			data: farm,
		});
	} catch (error: any) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

export const getAll = async (req: Request, res: Response) => {
	try {
		const farms = await farmService.getAllFarms(req.admin);

		return res.json({
			success: true,
			data: farms,
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
		const farm = await farmService.getFarmById(req.params.id, req.admin);

		if (!farm) {
			return res.status(404).json({
				success: false,
				message: "Farm not found",
			});
		}

		return res.json({
			success: true,
			data: farm,
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
		const validated = updateFarmSchema.parse(req.body);

		const farm = await farmService.updateFarm(
			req.params.id,
			validated,
			req.admin,
		);

		return res.json({
			success: true,
			data: farm,
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
		await farmService.deleteFarm(req.params.id, req.admin);

		return res.json({
			success: true,
			message: "Farm deleted",
		});
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
