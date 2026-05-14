---
name: self-critique
description: Before executing tools, ask the LLM to self-critique its plan. Triggers after user prompts and tool errors.
---

# Self-Critique Extension

This extension makes the Pi agent ask itself for self-criticism before using any tools. It triggers:

1. **After new user prompts** - to ensure the agent evaluates its plan
2. **After tool errors** - to help recover from mistakes
3. **Once per turn** - to avoid excessive critique requests

## Installation

### From GitHub (Recommended)

```bash
git clone https://github.com/Benjamin-Wegener/pi_coding_agent-skills.git && \
mkdir -p ~/.pi/agent/extensions/self-critique && \
cp -r pi_coding_agent-skills/self-critique/* ~/.pi/agent/extensions/self-critique/ && \
cd ~/.pi/agent/extensions/self-critique && \
rm package.json && \
cd ~/.pi/agent/extensions && \
pi reload
```

### Manual Copy

```bash
git clone https://github.com/Benjamin-Wegener/pi_coding_agent-skills.git && \
mkdir -p ~/.pi/agent/extensions/self-critique && \
cp -r pi_coding_agent-skills/self-critique/* ~/.pi/agent/extensions/self-critique/ && \
cd ~/.pi/agent/extensions/self-critique && \
rm package.json && \
cd ~/.pi/agent/extensions && \
pi reload
```

## Features

- ✅ **Auto-triggered** self-critique before tool execution
- ✅ **Error recovery** - asks for critique after tool failures
- ✅ **Context-aware** prompts showing recent conversation history
- ✅ **Prevents duplicates** - only asks once per turn
- ✅ **Custom tool** - can manually request self-critique via `self_critique` tool

## Usage

No additional configuration needed - just copy the files to the extensions folder and reload Pi.

### Manual Self-Critique Request

The extension registers a `self_critique` tool that the agent can call to request self-critique at any time.

## Examples

### Example 1: Automatic After User Prompt

```
User: "Write a React component for a todo list"

# Pi agent automatically asks for self-critique:
"Before using any tools, please critically evaluate your plan..."

[Agent provides self-critique]

# Then continues with the task
```

### Example 2: After Tool Error

```
User: "Fetch weather data for London"

# Tool execution fails

# Agent asks for self-critique:
"Tool execution failed: ... Please self-critique before trying again."

[Agent provides self-critique]

# Then retries or adjusts approach
```

## Technical Details

- **Type:** TypeScript Extension (ESM)
- **Dependencies:** None (uses Pi's built-in APIs)
- **Runtime:** TypeScript (compiled to JavaScript)
- **No external dependencies required**

## Output Format

The self-critique uses this format:

```
## Self-Critique Instruction

Before you use any tools, please critically evaluate your plan.

### Instructions:
1. Briefly describe what you plan to do
2. Identify potential problems with this plan
3. Suggest improvements or alternatives
4. Explain why your approach is sound

Format your response as:
```
PLAN: [What you intend to do]
PROBLEMS: [Issues with the plan]
IMPROVEMENTS: [Better alternatives]
CONFIDENCE: [0-100]
```

Be honest about potential issues. This helps catch mistakes before execution.

### Current Context:
[Last 50 messages from conversation]
```

## Troubleshooting

### Extension Not Loading
- Make sure to remove `package.json` before copying
- Run `pi reload` after copying files
- Check that files are in the correct location

### Self-Critique Not Triggering
- Make sure the extension is properly loaded
- Check Pi logs for extension loading errors
- Verify the skill/extension files are in the correct location

## Contributing

Contributions welcome! Please see the main repository for guidelines.

## License

MIT License - See LICENSE file for details.

---

<div align="center">
  <a href="https://github.com/Benjamin-Wegener/pi_coding_agent-skills">pi_coding_agent-skills</a>
  <br>
  <sub>⭐ Star on GitHub - 🐛 Report Issues - 🔀 Submit PRs</sub>
</div>
```
