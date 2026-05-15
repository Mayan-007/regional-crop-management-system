import { analyticsTools } from "./analytics.tools";

const tools = [...analyticsTools];

export const findToolByName = (toolName: string) => {
	return tools.find((tool) => tool.name === toolName);
};

export const getAllTools = () => tools;
