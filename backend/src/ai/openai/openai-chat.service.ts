import { openai } from "../../lib/openai";

import { AI_TOOLS } from "./tool-definitions";

export const askOpenAI = async (message: string) => {
	const completion = await openai.chat.completions.create({
		model: "openai/gpt-oss-20b",

		messages: [
			{
				role: "system",

				content: `
You are an agricultural analytics AI assistant.

You MUST use tools whenever analytics are requested.

Never invent numerical data.
`,
			},

			{
				role: "user",

				content: message,
			},
		],

		tools: AI_TOOLS,
	});

	return completion;
};
