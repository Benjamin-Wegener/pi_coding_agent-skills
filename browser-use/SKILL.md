---
name: browser-use
description: "Interactive web browsing skill using Browsh in a persistent tmux session. Supports open, click, type, enter, back, forward, and manual account login flows."
---

# Browser Use (Browsh)

## Setup

```bash
brew install browsh tmux
cd ~/.pi/agent/skills/browser-use
npm install
npm link
```

System dependencies:
- `browsh`
- `tmux`

## Commands

```bash
browser-use open "https://google.com"
browser-use attach
browser-use type "hello world"
browser-use enter
browser-use click aa
browser-use back
browser-use forward
browser-use send C-l
browser-use status
browser-use stop
```

## Login Flow (Google)

```bash
browser-use open "https://accounts.google.com"
browser-use attach
```

Complete login and 2FA in the attached Browsh session. Detach with `Ctrl-b`, then `d`.
