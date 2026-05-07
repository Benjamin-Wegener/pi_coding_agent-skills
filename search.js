#!/usr/bin/env node
/**
 * DuckDuckGo Search Skill for Pi Coding Agent
 * 
 * This script uses the ddg-search npm package to perform web searches
 * via DuckDuckGo without requiring an API key.
 * 
 * Usage:
 *   node search.js "your query"
 *   node search.js "your query" -n 10 (for 10 results)
 * 
 * Note: First run may take a few seconds.
 */

import { search } from "ddg-search";

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: node search.js \"your query\"");
  console.error("       node search.js \"your query\" -n 10 (for 10 results)");
  process.exit(1);
}

// Find the -n flag
const nFlag = args.indexOf("-n");
const count = nFlag !== -1 ? parseInt(args[nFlag + 1], 10) : 5;

// Extract the query (skip -n flag and its value)
const query = args.filter((arg, i) => i !== nFlag && i !== nFlag + 1).join(" ");

async function main() {
  try {
    // Perform the search
    const results = await search(query, { maxResults: 50 });
    const trimmed = results.results.slice(0, count);

    // Check if we got any results
    if (!trimmed.length) {
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
    console.error("Error:", error.message);
    process.exit(1);
  }
}

await main();
