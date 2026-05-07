---
name: web-search
description: "Live web search skill for Pi. Use whenever current information, news, web research, facts, prices, or anything that may have changed since training is needed. Always use search.js; do not use curl or direct HTTP requests."
---

# DuckDuckGo Search

## When to use

Use this skill whenever the user asks for live web search, current information, news, research, or facts that may have changed.

## How to run

  node {baseDir}/search.js "your query here"
  node {baseDir}/search.js "your query" -n 10

Note: first run is slow (~3-5s) because a headless browser must launch.

## Rules

1. Always use this skill for web search instead of ad hoc `curl` commands.
2. Do not fetch search pages directly.
3. Do not fabricate results.
4. Return real title, URL, and snippet data.

## Output

  --- Result 1 ---
  Title: ...
  URL: https://...
  Snippet: ...
