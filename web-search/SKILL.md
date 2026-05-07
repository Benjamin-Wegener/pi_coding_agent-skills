---
name: ddg-search
description: "Web search via DuckDuckGo, no API key required. Use for current events, documentation, facts, prices, or any information that may have changed since your training cutoff."
---

# DuckDuckGo Search

## How to run

  node {baseDir}/search.js "your query here"
  node {baseDir}/search.js "your query" -n 10

Note: first run is slow (~3-5s) because a headless browser must launch.

## Output

  --- Result 1 ---
  Title: ...
  URL: https://...
  Snippet: ...

## Rules

1. Keep queries short and specific (3–6 words).
2. Cite the URL in your answer.
3. Refine and retry if results are empty or off-topic.
4. Only use for current or changing information.
