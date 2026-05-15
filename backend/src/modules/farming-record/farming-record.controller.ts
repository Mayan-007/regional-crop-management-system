import { Request, Response } from "express";

import {
	createFarmingRecordSchema,
	updateFarmingRecordSchema,
} from "./farming-record.validation";

import * as farmingRecordService from "./farming-record.service";

export const create = async (req: Request, res: Response) => {
	try {
		const validated = createFarmingRecordSchema.parse(req.body);

		const record = await farmingRecordService.createFarmingRecord(
			validated,
			req.admin,
		);

		return res.status(201).json({
			success: true,
			data: record,
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
		const records = await farmingRecordService.getAllFarmingRecords(
			req.admin,
		);

		return res.json({
			success: true,
			data: records,
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
		const record = await farmingRecordService.getFarmingRecordById(
			req.params.id,
			req.admin,
		);

		if (!record) {
			return res.status(404).json({
				success: false,
				message: "Record not found",
			});
		}

		return res.json({
			success: true,
			data: record,
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
		const validated = updateFarmingRecordSchema.parse(req.body);

		const record = await farmingRecordService.updateFarmingRecord(
			req.params.id,
			validated,
			req.admin,
		);

		return res.json({
			success: true,
			data: record,
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
		await farmingRecordService.deleteFarmingRecord(
			req.params.id,
			req.admin,
		);

		return res.json({
			success: true,
			message: "Record deleted",
		});
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
