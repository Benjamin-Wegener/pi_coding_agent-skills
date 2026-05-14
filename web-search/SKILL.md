---
name: web-search
description: "Live DuckDuckGo web search skill for Pi Coding Agent. Use for current information, news, web research, prices, or any facts that may have changed since training. No API key required."
---

# DuckDuckGo Web Search

## Overview

This skill provides live web search capabilities using DuckDuckGo. Perfect for getting current information, weather, news, stock prices, and any facts that may have changed.

## When to Use

Use this skill whenever you need:
- Current information or live data
- News or recent events
- Weather or location-based data
- Stock prices or financial data
- Any research that requires up-to-date information

## How to Run

Install once:

```bash
cd ~/.pi/agent/skills/web-search
npm install
npm link
```

### Option 1: Direct Command (Recommended)

```bash
web-search "your query"              # Search with default 5 results
web-search "your query" -n 10        # Search with 10 results
web-search "weather in London"       # Weather search
web-search "AAPL stock price"        # Stock price lookup
web-search "latest AI news"          # Latest news
```

### Option 2: Using Node.js Directly

```bash
node search.js "your query"
node search.js "your query" -n 10
```

**Note:** First run may take 3-5 seconds as the headless browser launches.

## Rules

1. ✅ **Always use this skill** for web search instead of ad hoc `curl` commands
2. ❌ **Do not fetch** search pages directly
3. ❌ **Do not fabricate** results
4. ✅ **Return real** title, URL, and snippet data

## Output Format

```
--- Result 1 ---
Title: ...
URL: https://...
Snippet: ...
```

## Examples

```bash
# Weather search
web-search "weather in London"

# Stock prices
web-search "AAPL stock price"

# Latest news
web-search "AI developments 2026"

# Technical research
web-search "React 19 new features"

# News search
web-search "Apple earnings report"
```

## Troubleshooting

- **No results returned:** Try a simpler or more specific query
- **Slow first run:** This is normal - the headless browser needs to launch
- **Missing dependencies:** Run `npm install` in the skill directory

## Technical Notes

- **Dependency:** `ddg-search` package (version 2026.2.16+)
- **Runtime:** Node.js 18+
- **No API key required** - uses DuckDuckGo's public search API
- **Rate limiting:** The script requests only necessary data to avoid DDG rate limits

---

**Need help?** [Open an issue](https://github.com/Benjamin-Wegener/pi_coding_agent-skills/issues)

<div align="center">
  <sub>
    <a href="https://github.com/Benjamin-Wegener/pi_coding_agent-skills">pi_coding_agent-skills</a> - 
    <a href="https://github.com/Benjamin-Wegener/pi_coding_agent-skills/stargazers">⭐ Star on GitHub</a> - 
    <a href="https://github.com/Benjamin-Wegener/pi_coding_agent-skills/issues">🐛 Issues</a> - 
    <a href="https://github.com/Benjamin-Wegener/pi_coding_agent-skills/pulls">🔀 Pull Requests</a>
  </sub>
</div>
