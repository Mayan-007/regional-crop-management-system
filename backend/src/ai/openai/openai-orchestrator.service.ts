import { askOpenAI } from "./openai-chat.service";

import { executeTool } from "../orchestrator/ai.orchestrator";

export const handleAIQuery = async (message: string, admin: any) => {
	const completion = await askOpenAI(message);

	const toolCall = completion.choices[0].message.tool_calls?.[0];

	if (!toolCall) {
		return {
			success: false,

			message: "No tool selected",
		};
	}

	const toolName = toolCall.function.name;

	const args = JSON.parse(toolCall.function.arguments);

	const result = await executeTool(toolName, args, admin);

	return {
		success: true,

		tool: toolName,

		args,

		result,
	};
};
