#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const stateDir = path.join(os.homedir(), ".pi", "agent", "skills", "browser-use");
const stateFile = path.join(stateDir, ".browser-use-state.json");

function run(cmd, cmdArgs) {
  return spawnSync(cmd, cmdArgs, { encoding: "utf8" });
}

function mustHaveBinary(bin) {
  const res = run("sh", ["-lc", `command -v ${bin}`]);
  if (res.status !== 0) {
    console.error(`Error: '${bin}' not found. Please install ${bin} first.`);
    process.exit(1);
  }
}

function ensureStateDir() {
  fs.mkdirSync(stateDir, { recursive: true });
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(stateFile, "utf8"));
  } catch {
    return {};
  }
}

function saveState(next) {
  ensureStateDir();
  fs.writeFileSync(stateFile, JSON.stringify(next, null, 2));
}

function printHelp() {
  console.log(`Browser Use (Browsh backend)

Usage:
  browser-use open <url>
  browser-use attach
  browser-use type <text>
  browser-use enter
  browser-use click <hint>
  browser-use back
  browser-use forward
  browser-use send <tmux-keys...>
  browser-use status
  browser-use stop
  browser-use help

Notes:
  - Uses a persistent tmux session running browsh.
  - 'click <hint>' uses Browsh link-hint flow: press 'f', type hint, Enter.
  - Use 'attach' for manual flows like Google login/2FA.
`);
}

function requireSession() {
  const state = loadState();
  const session = state.session;
  if (!session) {
    console.error("No active session. Run: browser-use open <url>");
    process.exit(1);
  }
  const ok = run("tmux", ["has-session", "-t", session]);
  if (ok.status !== 0) {
    console.error("Saved session no longer exists. Run: browser-use open <url>");
    process.exit(1);
  }
  return { state, session };
}

function tmuxSend(session, keys) {
  const res = run("tmux", ["send-keys", "-t", session, ...keys]);
  if (res.status !== 0) {
    console.error(res.stderr || "Failed to send keys to tmux session.");
    process.exit(1);
  }
}

function main() {
  if (args.length === 0 || args[0] === "help" || args[0] === "--help") {
    printHelp();
    return;
  }

  mustHaveBinary("browsh");
  mustHaveBinary("tmux");

  const cmd = args[0];

  if (cmd === "open") {
    const url = args[1];
    if (!url) {
      console.error("Usage: browser-use open <url>");
      process.exit(1);
    }
    const session = `browser_use_${Date.now()}`;
    const start = run("tmux", ["new-session", "-d", "-s", session, "browsh", url]);
    if (start.status !== 0) {
      console.error(start.stderr || "Failed to start browsh session.");
      process.exit(1);
    }
    saveState({ session, lastUrl: url, updatedAt: new Date().toISOString() });
    console.log(`Started Browsh session: ${session}`);
    console.log(`URL: ${url}`);
    console.log("Use 'browser-use attach' to interactively log in or browse.");
    return;
  }

  if (cmd === "attach") {
    const { session } = requireSession();
    console.log(`Attaching to session ${session}. Detach with Ctrl-b then d.`);
    const attached = spawnSync("tmux", ["attach-session", "-t", session], { stdio: "inherit" });
    process.exit(attached.status ?? 0);
  }

  if (cmd === "status") {
    const state = loadState();
    if (!state.session) {
      console.log("No active Browsh session.");
      return;
    }
    const ok = run("tmux", ["has-session", "-t", state.session]);
    console.log(`Session: ${state.session}`);
    console.log(`Running: ${ok.status === 0 ? "yes" : "no"}`);
    if (state.lastUrl) console.log(`Last URL: ${state.lastUrl}`);
    return;
  }

  if (cmd === "stop") {
    const state = loadState();
    if (!state.session) {
      console.log("No active Browsh session.");
      return;
    }
    run("tmux", ["kill-session", "-t", state.session]);
    saveState({});
    console.log("Stopped Browsh session.");
    return;
  }

  if (cmd === "type") {
    const text = args.slice(1).join(" ");
    if (!text) {
      console.error("Usage: browser-use type <text>");
      process.exit(1);
    }
    const { session } = requireSession();
    tmuxSend(session, [text]);
    console.log(`Typed: ${text}`);
    return;
  }

  if (cmd === "enter") {
    const { session } = requireSession();
    tmuxSend(session, ["Enter"]);
    console.log("Pressed Enter");
    return;
  }

  if (cmd === "back") {
    const { session } = requireSession();
    tmuxSend(session, ["M-Left"]);
    console.log("Back");
    return;
  }

  if (cmd === "forward") {
    const { session } = requireSession();
    tmuxSend(session, ["M-Right"]);
    console.log("Forward");
    return;
  }

  if (cmd === "click") {
    const hint = args[1];
    if (!hint) {
      console.error("Usage: browser-use click <hint>");
      process.exit(1);
    }
    const { session } = requireSession();
    tmuxSend(session, ["f"]);
    tmuxSend(session, [hint]);
    tmuxSend(session, ["Enter"]);
    console.log(`Clicked hint: ${hint}`);
    return;
  }

  if (cmd === "send") {
    const keys = args.slice(1);
    if (keys.length === 0) {
      console.error("Usage: browser-use send <tmux-keys...>");
      process.exit(1);
    }
    const { session } = requireSession();
    tmuxSend(session, keys);
    console.log(`Sent keys: ${keys.join(" ")}`);
    return;
  }

  console.error(`Unknown command: ${cmd}`);
  printHelp();
  process.exit(1);
}

main();
