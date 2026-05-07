# DuckDuckGo Web Search Skill for Pi Coding Agent

A powerful web search skill for Pi Coding Agent that uses DuckDuckGo for real-time information retrieval. No API key required!

## 🚀 Features

- 🔍 **No API Key Required** - Uses DuckDuckGo's public search API
- ⚡ **Fast & Reliable** - Get current information instantly
- 📱 **Cross-Platform** - Works on any system with Node.js
- 🎯 **Easy Integration** - Just clone and install in your Pi skills directory

## 📦 Installation

1. Clone this repository to your Pi skills directory:

```bash
mkdir -p ~/.pi/agent/skills/web-search
cd ~/.pi/agent/skills/web-search
git clone https://github.com/Benjamin-Wegener/pi_coding_agent-skills/web-search.git .
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Make the script executable:

```bash
chmod +x search.js
```

## 🎯 Usage

### Basic Search

```bash
node search.js "AI trends 2026"
```

### Get More Results

```bash
node search.js "AI trends 2026" -n 10
```

### With Specific Parameters

```bash
node search.js "Node.js release" -n 5
```

## 📋 Output Format

The search results are displayed in the following format:

```
--- Result 1 ---
Title: ...
URL: https://...
Snippet: ...

--- Result 2 ---
Title: ...
URL: https://...
Snippet: ...
```

## 🎓 Best Practices

1. **Keep queries short and specific** (3–6 words)
2. **Cite the URL** when using results in your answers
3. **Refine and retry** if results are empty or off-topic
4. **Only use for current or changing information**

## 🛠️ Troubleshooting

### "Cannot find module 'ddg-search'"

Make sure you've installed dependencies:
```bash
cd ~/.pi/agent/skills/web-search
npm install
```

### "No results found"

- DuckDuckGo may be rate-limiting requests
- Wait 10 seconds and retry
- Try a different query

### "Module not found" error

Ensure `"type": "module"` is in `package.json` and you're using ESM syntax (`import` instead of `require`).

## 📦 Technical Details

- **Package used**: `ddg-search` (npm package)
- **Dependencies**: Cheerio for HTML parsing
- **License**: MIT
- **Node.js version**: 18+

## 📁 Files Included

- `README.md` - Full documentation
- `SKILL.md` - Pi agent skill metadata
- `search.js` - Main search script
- `package.json` - NPM package configuration
- `.gitignore` - Git ignore patterns

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Report Issues

Found a bug or have a feature request? [Open an issue](https://github.com/Benjamin-Wegener/pi_coding_agent-skills/issues)

### Submit Pull Requests

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

### Style Guidelines

- Use ESLint for code formatting
- Add tests for new features
- Update documentation
- Keep PRs focused and small

## 📚 Credits

### **Original Package Author**

This skill uses the [`ddg-search`](https://github.com/camohiddendj/ddg-search) package created by **camohiddendj**.

- **Package**: [`ddg-search`](https://github.com/camohiddendj/ddg-search)
- **Author**: [camohiddendj](https://github.com/camohiddendj)
- **License**: MIT
- **Description**: DuckDuckGo HTML search scraper with multiple output formats

**Thank you to camohiddendj for creating this excellent package that powers this Pi skill!** 🙏

---

## 🚧 Skills Eventually Being Implemented

This repo is a **curated list of skills** for the Pi Coding Agent. Below is a list of skills that are planned or in development:

### **Skills Being Implemented**

1. **Web Browsing**
   - Browse the web with live content
   - Extract information from articles and documentation
   - Access real-time data and current events

2. **Code Execution**
   - Run and analyze code snippets
   - Debug and test functions
   - Execute Python, JavaScript, and more

3. **Image Analysis**
   - Analyze uploaded images
   - Extract text from documents
   - Understand diagrams and charts

4. **File Operations**
   - Create, edit, and manage files
   - Read and write code
   - Organize project structures

5. **Git Integration**
   - Version control operations
   - Commit and push code
   - Manage branches and tags

6. **Documentation Generation**
   - Auto-generate docs from code
   - Create README files
   - Add inline comments

7. **Webhook Integration**
   - Trigger external services
   - Automate workflows
   - Connect with other tools

### **Contributing Skills to This Repo**

We welcome contributions! If you have a skill you'd like to add or improve, please:

- Open a pull request with your skill
- Follow the existing structure and naming conventions
- Include proper documentation (README.md, SKILL.md)
- Add tests where appropriate

See the main repository for more information on how to contribute.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Benjamin Wegener**

- Email: wegeneredv@gmail.com
- GitHub: [Benjamin-Wegener](https://github.com/Benjamin-Wegener)

## 🙏 Acknowledgments

- DuckDuckGo for their public search API
- [camohiddendj](https://github.com/camohiddendj) for the `ddg-search` package
- The Pi Coding Agent development team
- All contributors to this project

---

**Enjoy exploring with DuckDuckGo!** 🚀

<div align="center">
  <sub>
    <a href="https://github.com/Benjamin-Wegener/pi_coding_agent-skills">pi_coding_agent-skills</a> - 
    <a href="https://github.com/Benjamin-Wegener/pi_coding_agent-skills/stargazers">⭐ Star on GitHub</a> - 
    <a href="https://github.com/Benjamin-Wegener/pi_coding_agent-skills/issues">🐛 Issues</a> - 
    <a href="https://github.com/Benjamin-Wegener/pi_coding_agent-skills/pulls">🔀 Pull Requests</a>
  </sub>
</div>
