# DuckDuckGo Web Search Skill for Pi Coding Agent (Deprecated)

> [!WARNING]
> **DEPRECATED**: This standalone search skill is no longer actively maintained.  
> It is replaced by **[pi-browseros-neo](https://github.com/Benjamin-Wegener/pi-browseros-neo)** for full web interaction and live browsing.

## Features

- ✅ Fast web searches using DuckDuckGo's public API
- ✅ No API key required
- ✅ Returns real search results with title, URL, and snippet
- ✅ Configurable result count with `-n` flag
- ✅ Works as a direct command: `web-search "your query"`
- ✅ Supports weather, news, stocks, and any live web search

## Installation

### From GitHub (Recommended)

```bash
git clone https://github.com/Benjamin-Wegener/pi_coding_agent-skills.git && \
mkdir -p ~/.pi/agent/skills/web-search && \
cp -r pi_coding_agent-skills/web-search/* ~/.pi/agent/skills/web-search/ && \
cd ~/.pi/agent/skills/web-search && \
npm install && \
npm link
```

### Manual Copy

```bash
git clone https://github.com/Benjamin-Wegener/pi_coding_agent-skills.git && mkdir -p ~/.pi/agent/skills/web-search && cp -r pi_coding_agent-skills/web-search/* ~/.pi/agent/skills/web-search/ && cd ~/.pi/agent/skills/web-search && npm install && npm link
~/.pi/agent/skills/web-search/{README.md,SKILL.md,package.json,search.js,node_modules/}
```

## Usage

### Quick Start

```bash
# Use the web-search command directly
web-search "weather in London"
web-search "AAPL stock price"
web-search "latest AI news"
```

### With Custom Result Count

```bash
web-search "your query" -n 10
web-search "weather in London" -n 5
```

### Using Node.js Directly

```bash
node search.js "your query"
node search.js "your query" -n 10
```

## Examples

```bash
# Weather
web-search "weather in London"

# Stock prices
web-search "AAPL stock price"
web-search "Tesla stock"

# News
web-search "AI developments 2026"
web-search "latest Apple news"

# Research
web-search "React 19 new features"
web-search "Node.js performance comparison"

# General search
web-search "how to center div CSS"
web-search "Python async vs sync"
```

## Output Format

```
--- Result 1 ---
Title: ...
URL: https://...
Snippet: ...
```

## Rules

1. ✅ **Always use this skill** for web search instead of ad hoc `curl` commands
2. ❌ **Do not fetch** search pages directly
3. ❌ **Do not fabricate** results
4. ✅ **Return real** title, URL, and snippet data

## Troubleshooting

### Slow First Run
The first search may take 3-5 seconds as the headless browser launches. This is normal.

### No Results Returned
- Try a simpler or more specific query
- Check if the search term is too broad
- Verify you're not hitting rate limits

### Missing Dependencies
```bash
cd ~/.pi/agent/skills/web-search
npm install
```

### Command Not Found
Link the command once, then run it from anywhere:
```bash
# Register CLI in PATH (recommended)
cd ~/.pi/agent/skills/web-search
npm link

# Or use full path
~/.pi/agent/skills/web-search/web-search "your query"
```

## Technical Details

- **Dependency:** `ddg-search` (version 2026.2.16+)
- **Runtime:** Node.js 18+
- **Type:** ES Module (`package.json` has `"type": "module"`)
- **No API key required** - uses DuckDuckGo's public search

## Tips

- Use specific location names for weather searches (e.g., "London" vs "UK")
- Add date ranges for news (e.g., "Apple earnings 2024")
- Use quotes for exact phrases
- Combine with `-n` for more results

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
