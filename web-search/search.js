#!/usr/bin/env node
/**
 * DuckDuckGo Search Skill for Pi Coding Agent
 * 
 * Usage:
 *   node search.js "your query"
 *   node search.js "your query" -n 10
 */

import { search } from "ddg-search";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: node search.js "your query"');
  console.error('       node search.js "your query" -n 10');
  process.exit(1);
}

// Parse -n flag
const nFlag = args.indexOf("-n");
const parsedCount = nFlag !== -1 ? parseInt(args[nFlag + 1], 10) : 5;
const count = Number.isFinite(parsedCount) && parsedCount > 0 ? parsedCount : 5;

// Extract the query - only skip -n arguments when -n was actually provided
const query = nFlag !== -1
  ? args.filter((_, i) => i !== nFlag && i !== nFlag + 1).join(" ")
  : args.join(" ");

async function main() {
  try {
    // Fix: request only what we need — avoids DDG rate limiting
    // Also handle both array and { results: [] } return shapes
    const response = await search(query, { maxResults: count });
    const resultList = Array.isArray(response) ? response : (response.results ?? []);
    const trimmed = resultList.slice(0, count);

    if (trimmed.length === 0) {
      console.error("No results found. Try refining your query or checking DuckDuckGo availability.");
      process.exit(1);
    }

    // Display results
    trimmed.forEach((r, i) => {
      console.log(`--- Result ${i + 1} ---`);
      console.log(`Title: ${r.title ?? ""}`);
      console.log(`URL: ${r.url ?? ""}`);
      console.log(`Snippet: ${r.snippet ?? r.description ?? ""}`);
      console.log();
    });
  } catch (error) {
    // Handle both Error objects and other error types
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Error:", errorMsg);
    process.exit(1);
  }
}

await main();
