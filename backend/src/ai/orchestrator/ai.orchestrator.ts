import { findToolByName } from "../tools/tool.service";

export const executeTool = async (
	toolName: string,
	params: any,
	admin: any,
) => {
	const tool = findToolByName(toolName);

	if (!tool) {
		throw new Error(`Tool '${toolName}' not found`);
	}

	return tool.execute(params, admin);
};
