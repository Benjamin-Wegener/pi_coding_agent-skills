---
name: browser-use
description: "Interactive browser automation skill for Pi Coding Agent. Use for opening pages, clicking elements, typing text, pressing Enter, navigating back/forward, and persistent login sessions (including Google login)."
---

# Browser Use

## Setup

```bash
cd ~/.pi/agent/skills/browser-use
npm install
npx playwright install chromium
npm link
```

## Commands

```bash
browser-use open "https://google.com" --headed
browser-use login "https://accounts.google.com"
browser-use click "a[href*='mail.google.com']" --headed
browser-use type "input[type='email']" "your@email.com" --headed
browser-use enter "input[type='email']" --headed
browser-use back
browser-use forward
browser-use screenshot
browser-use url
```

## Notes

- Use `--headed` for login flows so you can complete interactive steps.
- Use `browser-use login <url>` to keep the window open for manual login/2FA until you confirm in terminal.
- Session persists via browser profile directory, so login cookies survive between commands.
- If a selector fails, inspect and retry with a more specific CSS selector.
