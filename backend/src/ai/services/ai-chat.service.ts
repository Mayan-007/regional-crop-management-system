import { executeTool } from "../orchestrator/ai.orchestrator";

import { mapPromptToTool } from "./intent-mapper.service";

export const processAIQuery = async (message: string, admin: any) => {
	//
	// Determine tool
	//

	const mapping = mapPromptToTool(message);

	if (!mapping) {
		return {
			success: false,

			message: "Unable to determine appropriate analytics tool.",
		};
	}

	//
	// Execute tool
	//

	const result = await executeTool(mapping.tool, mapping.params, admin);

	return {
		success: true,

		tool: mapping.tool,

		result,
	};
};
