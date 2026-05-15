import { synthesizeAnalytics } from "./analytics.synthesizer";

export const buildAIResponse = (tool: string, data: any) => {
	return {
		summary: synthesizeAnalytics(tool, data),

		raw: data,
	};
};
