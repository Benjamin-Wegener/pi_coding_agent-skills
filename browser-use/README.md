# Browser Use Skill for Pi Coding Agent

Browser automation skill with persistent sessions for real web interaction.

## Features

- Open pages with Chromium
- Click, type, and press Enter
- Navigate backward and forward
- Save screenshots
- Keep session state between commands (cookies/login)

## Installation

```bash
git clone https://github.com/Benjamin-Wegener/pi_coding_agent-skills.git && \
mkdir -p ~/.pi/agent/skills/browser-use && \
cp -r pi_coding_agent-skills/browser-use/* ~/.pi/agent/skills/browser-use/ && \
cd ~/.pi/agent/skills/browser-use && \
npm install && \
npx playwright install chromium && \
npm link
```

## Usage

```bash
browser-use open "https://google.com" --headed
browser-use login "https://accounts.google.com"
browser-use type "textarea[name='q']" "latest AI news" --headed
browser-use enter "textarea[name='q']" --headed
browser-use click "a h3" --headed
browser-use back --headed
browser-use forward --headed
browser-use screenshot ./shot.png --headed
browser-use url
```

## Google Login Workflow

1. Open login page in headed mode:
```bash
browser-use login "https://accounts.google.com"
```
2. Complete login/2FA in the visible browser.
3. Press Enter in terminal to save session state.
4. Reuse the same profile in later commands and the session stays logged in.

## Command Reference

```bash
browser-use help
```

Global flags:
- `--headed` open a visible browser window
- `--profile <dir>` custom persistent profile directory
- `--timeout <ms>` action timeout
