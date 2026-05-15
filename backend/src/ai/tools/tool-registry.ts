export interface AITool {
	name: string;

	description: string;

	execute: (params: any, admin: any) => Promise<any>;
}
