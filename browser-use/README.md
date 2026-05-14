# Browser Use Skill for Pi Coding Agent (Browsh)

Browser automation skill powered by `browsh` in a persistent `tmux` session.

## Features

- Open pages in Browsh
- Send actions: click (link hint), type, enter, back, forward
- Attach to the live browser session for manual interaction/login
- Keep one persistent session state between commands

## Requirements

- `browsh` installed and available in PATH
- `tmux` installed and available in PATH
- Node.js 18+

## Installation

```bash
git clone https://github.com/Benjamin-Wegener/pi_coding_agent-skills.git && \
mkdir -p ~/.pi/agent/skills/browser-use && \
cp -r pi_coding_agent-skills/browser-use/* ~/.pi/agent/skills/browser-use/ && \
cd ~/.pi/agent/skills/browser-use && \
npm install && \
npm link
```

## Usage

```bash
browser-use open "https://google.com"
browser-use attach
browser-use type "gmail.com"
browser-use enter
browser-use back
browser-use forward
browser-use click aa
browser-use send C-l
browser-use status
browser-use stop
```

## Google Login

```bash
browser-use open "https://accounts.google.com"
browser-use attach
```

Then complete login directly in Browsh (including 2FA). Detach from tmux with `Ctrl-b`, then `d`.
