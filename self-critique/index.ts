/**
 * Self-Critique Extension
 * 
 * Before executing tools, ask the LLM to self-critique its plan.
 * Asks once after receiving the initial prompt, and also after any tool error.
 * 
 * Usage:
 * 1. Copy this file to ~/.pi/agent/extensions/ or your project's .pi/extensions/
 * 2. Copy SKILL.md to ~/.pi/agent/skills/ or your project's .pi/skills/
 * 3. Reload pi
 */

import type { ExtensionAPI, ToolResult } from "@earendil-works/pi-coding-agent";
import type { AgentSession } from "@earendil-works/pi-agent-core";

const SELF_CRITIQUE_PROMPT = `## Self-Critique Instruction

Before you use any tools, please critically evaluate your plan.

### Instructions:
1. Briefly describe what you plan to do
2. Identify potential problems with this plan
3. Suggest improvements or alternatives
4. Explain why your approach is sound

Format your response as:
\`\`\`
PLAN: [What you intend to do]
PROBLEMS: [Issues with the plan]
IMPROVEMENTS: [Better alternatives]
CONFIDENCE: [0-100]
\`\`\`

Be honest about potential issues. This helps catch mistakes before execution.

### Current Context:
{context}
`;

let selfCritiqueRequested = false;
let lastToolErrorOccurred = false;

export default function selfCritiqueExtension(api: ExtensionAPI) {
	// Listen to agent events to trigger self-critique
	api.on("message_update", async (event, ctx) => {
		// Check if this is a new user message (not a tool result)
		if (event.message.userMessage) {
			// Only trigger self-critique if not already done in this turn
			if (!selfCritiqueRequested) {
				await triggerCritique(ctx, "New user prompt received. Please self-critique before using any tools.");
			}
		}
	});

	// Listen to tool execution end events
	api.on("tool_execution_end", async (event, ctx) => {
		const result = event.toolResult;
		
		if (result.isError) {
			// Only trigger self-critique if not already done
			if (!selfCritiqueRequested) {
				await triggerCritique(ctx, `Tool execution failed: ${result.error?.content?.text || "Unknown error"}. Please self-critique before trying again.`);
			}
		}
	});

	// Listen to tool execution start
	api.on("tool_execution_start", async (event, ctx) => {
		// Check if we should trigger self-critique before this tool call
		const state = ctx.session.agent.state;
		const message = state.streamingMessage;
		
		if (!message || message.type !== "text") {
			return;
		}

		const content = (message.content as any[]).find((c: any) => c.type === "text")?.text || "";
		const contextSnippet = getAgentContext(ctx.session, 50);
		const prompt = SELF_CRITIQUE_PROMPT.replace("{context}", contextSnippet);
		
		if (content.includes("self-critique") || content.includes("critique") || content.includes("PLAN:")) {
			// We've already asked for self-critique, don't do it again
			return;
		}

		await triggerCritique(ctx, "Self-critique requested. Please evaluate your plan before using tools." + (lastToolErrorOccurred ? " This follows a previous error. Consider if the error suggests a different approach." : ""));
		lastToolErrorOccurred = false;
	});

	// Listen to tool execution updates for error streaming
	api.on("tool_execution_update", async (event, ctx) => {
		const state = ctx.session.agent.state;
		const message = state.streamingMessage;
		
		if (!message || message.type !== "text") {
			return;
		}

		const content = (message.content as any[]).find((c: any) => c.type === "text")?.text || "";
		
		// Check for error indicators
		if (content.includes("error") || content.includes("failed") || content.includes("Exception") || content.includes("Error:")) {
			lastToolErrorOccurred = true;
			await triggerCritique(ctx, "Tool error detected. Please self-critique before continuing.");
		}
	});

	// Listen to agent end to check if we need a final critique
	api.on("agent_end", async (event, ctx) => {
		const state = ctx.session.agent.state;
		const message = state.streamingMessage;
		
		if (!message || message.type !== "text") {
			return;
		}

		const content = (message.content as any[]).find((c: any) => c.type === "text")?.text || "";
		
		if (content.includes("self-critique") || content.includes("critique") || content.includes("PLAN:")) {
			// Already asked for self-critique, don't do it again
			return;
		}

		// Check if any tool errors occurred during this session
		if (lastToolErrorOccurred) {
			await triggerCritique(ctx, "Previous tool errors occurred. Please self-critique before proceeding with next actions.");
		}
	});

	// Register a custom tool for the LLM to call to request self-critique
	api.registerTool({
		name: "self_critique",
		label: "Self-Critique",
		description: "Ask the agent to self-critique its current plan before using any tools.",
		promptSnippet: "Ask for self-critique",
		promptGuidelines: ["Use self_critique before using any tools to catch potential mistakes."],
		parameters: {},
		async execute(toolCallId, params, signal, onUpdate, ctx) {
			const state = ctx.session.agent.state;
			const contextSnippet = getAgentContext(ctx.session, 50);
			const prompt = SELF_CRITIQUE_PROMPT.replace("{context}", contextSnippet);
			
			const critiqueMessage = {
				type: "text",
				text: `## Self-Critique Requested\n\n${prompt}\n\n---\n\nPlease provide your self-critique response above before using tools.\n\n---\n\n${context}`
			};
			
			state.messages.push(critiqueMessage);
			
			await new Promise<void>(resolve => setTimeout(resolve, 500));
			
			return {
				content: [{ type: "text", text: `Self-critique has been requested. Please provide your critique above before using tools.\n\n${context}` }],
				details: {},
			};
		},
	});
}

async function triggerCritique(ctx: { session: AgentSession }, context: string): Promise<void> {
	const state = ctx.session.agent.state;
	
	// Create the critique message with context
	const contextSnippet = getAgentContext(ctx.session, 50);
	const prompt = SELF_CRITIQUE_PROMPT.replace("{context}", contextSnippet);
	
	const critiqueMessage = {
		type: "text",
		text: `## Self-Critique Requested\n\n${prompt}\n\n---\n\nPlease provide your self-critique response above before using tools.\n\n---\n\n${contextSnippet}`
	};
	
	// Append the critique message to the conversation
	state.messages.push(critiqueMessage);
	
	// Wait a moment for the LLM to process
	await new Promise<void>(resolve => setTimeout(resolve, 500));
}

function getAgentContext(agentSession: AgentSession, messageCount: number = 50): string {
	const messages = agentSession.messages.slice(-messageCount);
	return messages
		.map((msg) => {
			if (msg.type === "user") {
				return `User: ${msg.content?.text || ""}`;
			} else if (msg.type === "assistant") {
				return `Assistant: ${msg.content?.text || ""}`;
			}
			return "";
		})
		.join("\n");
}
