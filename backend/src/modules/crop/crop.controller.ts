import { Request, Response } from "express";

import { createCropSchema, updateCropSchema } from "./crop.validation";

import * as cropService from "./crop.service";

export const create = async (req: Request, res: Response) => {
	try {
		const validated = createCropSchema.parse(req.body);

		const crop = await cropService.createCrop(validated);

		return res.status(201).json({
			success: true,
			data: crop,
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
		const crops = await cropService.getAllCrops();

		return res.json({
			success: true,
			data: crops,
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
		const crop = await cropService.getCropById(req.params.id);

		if (!crop) {
			return res.status(404).json({
				success: false,
				message: "Crop not found",
			});
		}

		return res.json({
			success: true,
			data: crop,
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
		const validated = updateCropSchema.parse(req.body);

		const crop = await cropService.updateCrop(req.params.id, validated);

		return res.json({
			success: true,
			data: crop,
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
		await cropService.deleteCrop(req.params.id);

		return res.json({
			success: true,
			message: "Crop deleted",
		});
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
