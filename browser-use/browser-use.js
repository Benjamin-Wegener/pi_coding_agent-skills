#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import readline from "node:readline";
import { chromium } from "playwright";

const args = process.argv.slice(2);

const defaultProfileDir = path.join(os.homedir(), ".pi", "agent", "skills", "browser-use", ".profile");
const defaultStateFile = path.join(defaultProfileDir, ".browser-use-state.json");

function printHelp() {
  console.log(`Browser Use Skill

Usage:
  browser-use open <url> [--headed]
  browser-use login <url>
  browser-use click <selector> [--headed]
  browser-use type <selector> <text> [--headed]
  browser-use enter [selector] [--headed]
  browser-use back [--headed]
  browser-use forward [--headed]
  browser-use url
  browser-use screenshot [path] [--headed]
  browser-use help

Global flags:
  --profile <dir>    Persistent browser profile directory
  --timeout <ms>     Action timeout in milliseconds (default: 15000)
  --headed           Launch visible browser window

Examples:
  browser-use open "https://google.com" --headed
  browser-use login "https://accounts.google.com"
  browser-use type "textarea[name='q']" "latest AI news"
  browser-use enter "textarea[name='q']"
  browser-use click "a h3"
  browser-use back
  browser-use forward
`);
}

function parseFlags(rawArgs) {
  let profileDir = defaultProfileDir;
  let timeout = 15000;
  let headed = false;
  const positional = [];

  for (let i = 0; i < rawArgs.length; i += 1) {
    const token = rawArgs[i];
    if (token === "--profile") {
      profileDir = rawArgs[i + 1];
      i += 1;
    } else if (token === "--timeout") {
      timeout = Number.parseInt(rawArgs[i + 1], 10);
      i += 1;
    } else if (token === "--headed") {
      headed = true;
    } else {
      positional.push(token);
    }
  }

  if (!Number.isFinite(timeout) || timeout <= 0) timeout = 15000;
  return { profileDir, timeout, headed, positional };
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readState(stateFile) {
  try {
    return JSON.parse(fs.readFileSync(stateFile, "utf8"));
  } catch {
    return {};
  }
}

function writeState(stateFile, state) {
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
}

async function withPage({ profileDir, headed, timeout }, fn) {
  ensureDir(profileDir);
  const context = await chromium.launchPersistentContext(profileDir, {
    headless: !headed,
    viewport: { width: 1366, height: 900 }
  });

  context.setDefaultTimeout(timeout);
  const stateFile = path.join(profileDir, ".browser-use-state.json");
  const state = readState(stateFile);

  let page = context.pages()[0];
  if (!page) page = await context.newPage();

  if (state.lastUrl && page.url() === "about:blank") {
    try {
      await page.goto(state.lastUrl, { waitUntil: "domcontentloaded" });
    } catch {
      // Ignore stale URL load failures and continue with current page.
    }
  }

  try {
    await fn(page);
    const currentUrl = page.url();
    if (currentUrl && currentUrl !== "about:blank") {
      writeState(stateFile, { lastUrl: currentUrl, updatedAt: new Date().toISOString() });
    }
  } finally {
    await context.close();
  }
}

function requireArg(value, message) {
  if (!value) {
    console.error(message);
    process.exit(1);
  }
}

function waitForEnter(promptText) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(promptText, () => {
      rl.close();
      resolve();
    });
  });
}

async function main() {
  if (args.length === 0 || args[0] === "help" || args[0] === "--help") {
    printHelp();
    return;
  }

  const { profileDir, timeout, headed, positional } = parseFlags(args);
  const command = positional[0];

  if (!command) {
    printHelp();
    process.exit(1);
  }

  if (command === "url") {
    const state = readState(path.join(profileDir, ".browser-use-state.json"));
    if (!state.lastUrl) {
      console.error("No last URL recorded yet. Use: browser-use open <url>");
      process.exit(1);
    }
    console.log(state.lastUrl);
    return;
  }

  const options = { profileDir, headed, timeout };

  if (command === "open") {
    const url = positional[1];
    requireArg(url, "Usage: browser-use open <url>");
    await withPage(options, async (page) => {
      await page.goto(url, { waitUntil: "commit" });
      console.log(`Opened: ${page.url()}`);
    });
    return;
  }

  if (command === "login") {
    const url = positional[1];
    requireArg(url, "Usage: browser-use login <url>");
    ensureDir(profileDir);
    const context = await chromium.launchPersistentContext(profileDir, {
      headless: false,
      viewport: { width: 1366, height: 900 }
    });
    context.setDefaultTimeout(timeout);
    const page = context.pages()[0] || await context.newPage();
    await page.goto(url, { waitUntil: "commit" });
    console.log(`Opened login page: ${page.url()}`);
    await waitForEnter("Complete login in browser, then press Enter here to save session and close...");
    const stateFile = path.join(profileDir, ".browser-use-state.json");
    writeState(stateFile, { lastUrl: page.url(), updatedAt: new Date().toISOString() });
    await context.close();
    console.log("Login session saved.");
    return;
  }

  if (command === "click") {
    const selector = positional[1];
    requireArg(selector, "Usage: browser-use click <selector>");
    await withPage(options, async (page) => {
      await page.click(selector);
      console.log(`Clicked: ${selector}`);
      console.log(`URL: ${page.url()}`);
    });
    return;
  }

  if (command === "type") {
    const selector = positional[1];
    const text = positional.slice(2).join(" ");
    requireArg(selector, "Usage: browser-use type <selector> <text>");
    requireArg(text, "Usage: browser-use type <selector> <text>");
    await withPage(options, async (page) => {
      await page.fill(selector, text);
      console.log(`Typed into ${selector}: ${text}`);
    });
    return;
  }

  if (command === "enter") {
    const selector = positional[1];
    await withPage(options, async (page) => {
      if (selector) {
        await page.click(selector);
      }
      await page.keyboard.press("Enter");
      await page.waitForLoadState("domcontentloaded");
      console.log(`Pressed Enter${selector ? ` on ${selector}` : ""}`);
      console.log(`URL: ${page.url()}`);
    });
    return;
  }

  if (command === "back") {
    await withPage(options, async (page) => {
      await page.goBack({ waitUntil: "domcontentloaded" });
      console.log(`URL: ${page.url()}`);
    });
    return;
  }

  if (command === "forward") {
    await withPage(options, async (page) => {
      await page.goForward({ waitUntil: "domcontentloaded" });
      console.log(`URL: ${page.url()}`);
    });
    return;
  }

  if (command === "screenshot") {
    const outPath = positional[1] || path.join(process.cwd(), "browser-use-screenshot.png");
    await withPage(options, async (page) => {
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`Saved screenshot: ${outPath}`);
    });
    return;
  }

  console.error(`Unknown command: ${command}`);
  printHelp();
  process.exit(1);
}

try {
  await main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Error: ${message}`);
  process.exit(1);
}
