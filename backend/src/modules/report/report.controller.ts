import { Request, Response } from "express";

import {
	geographySummaryQuerySchema,
	cropYieldQuerySchema,
	farmerProductivityQuerySchema,
} from "./report.validation";

import * as reportService from "./report.service";

export const dashboardKPIs = async (req: Request, res: Response) => {
	try {
		const data = await reportService.getDashboardKPIs(req.admin);

		return res.json({
			success: true,
			data,
		});
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const geographySummary = async (req: Request, res: Response) => {
	try {
		const validated = geographySummaryQuerySchema.parse(req.query);

		const data = await reportService.getGeographySummary(
			validated.level,
			req.admin,
		);

		return res.json({
			success: true,
			data,
		});
	} catch (error: any) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

export const cropYieldAnalytics = async (req: Request, res: Response) => {
	try {
		const validated = cropYieldQuerySchema.parse(req.query);

		const data = await reportService.getCropYieldAnalytics(
			validated,
			req.admin,
		);

		return res.json({
			success: true,
			data,
		});
	} catch (error: any) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

export const seasonalAnalytics = async (req: Request, res: Response) => {
	try {
		const data = await reportService.getSeasonalAnalytics(req.admin);

		return res.json({
			success: true,
			data,
		});
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const lossAnalysis = async (req: Request, res: Response) => {
	try {
		const data = await reportService.getLossAnalysis(req.admin);

		return res.json({
			success: true,
			data,
		});
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const farmerProductivity = async (req: Request, res: Response) => {
	try {
		const validated = farmerProductivityQuerySchema.parse(req.query);

		const data = await reportService.getFarmerProductivity(
			validated.limit,
			req.admin,
		);

		return res.json({
			success: true,
			data,
		});
	} catch (error: any) {
		return res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};
