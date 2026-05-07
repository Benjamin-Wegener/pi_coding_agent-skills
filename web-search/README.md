# DuckDuckGo Web Search Skill for Pi Coding Agent

Live DuckDuckGo search for Pi Coding Agent. No API key required.

## What This Skill Does

- Runs current web searches from Node.js
- Returns title, URL, and snippet for each result
- Supports `-n <count>` for more results
- Fails clearly when search returns nothing

## Installation

Tell your Pi coding agent:
```bash
Clone https://github.com/Benjamin-Wegener/pi_coding_agent-skills, copy the complete web-search/ folder into Pi’s skills directory, and run npm install there. Make sure the complete web-search/ folder is installed into Pi's skills directory so SKILL.md, search.js, and the rest of the skill persist after a Pi restart.
```

## Usage

```bash
node search.js "AI trends 2026"
node search.js "AI trends 2026" -n 10
node search.js "Node.js release" -n 5
```

## Output Format

```text
--- Result 1 ---
Title: ...
URL: https://...
Snippet: ...
```

## Troubleshooting

- If `ddg-search` is missing, run `npm install` inside the skill folder.
- If no results are returned, try a shorter or more specific query.
- The script uses ESM, so `package.json` must keep `"type": "module"`.

## Technical Notes

- Dependency: `ddg-search`
- Runtime: Node.js 18+

---

**Enjoy exploring with DuckDuckGo!** 🚀

<div align="center">
  <sub>
    <a href="https://github.com/Benjamin-Wegener/pi_coding_agent-skills">pi_coding_agent-skills</a> - 
    <a href="https://github.com/Benjamin-Wegener/pi_coding_agent-skills/stargazers">⭐ Star on GitHub</a> - 
    <a href="https://github.com/Benjamin-Wegener/pi_coding_agent-skills/issues">🐛 Issues</a> - 
    <a href="https://github.com/Benjamin-Wegener/pi_coding_agent-skills/pulls">🔀 Pull Requests</a>
  </sub>
</div>
