# Immigrify.ca Tools - Auto-Deployment System

This repository contains tools and applications for immigrify.ca, with automated deployment from GitHub to the web server using GitHub Actions and FTP.

## 🚀 Quick Start

**For LLMs/AI Assistants**: 
1. Read `LLM_INSTRUCTIONS.md` first
2. Then read `SETUP_INSTRUCTIONS.md` for complete instructions

**For Developers**: 
1. Read `QUICK_START.md` for quick reference
2. Follow `docs/DEPLOYMENT_INSTRUCTIONS.md` for daily usage

## 🎯 Features

- **Automatic Deployment**: Push to GitHub, auto-deploys to immigrify.ca
- **Test & Production**: Separate environments for testing and production
- **Multiple Apps**: Support for HTML and React apps in organized folders
- **Version Management**: Built-in version control and rollback capabilities
- **Secure**: Credentials stored in GitHub Secrets

## 📁 Project Structure

```
immigrify-tools/
├── docs/                    # Detailed documentation
│   ├── DEPLOYMENT_INSTRUCTIONS.md
│   ├── DEPLOYMENT_SETUP_GUIDE.md
│   └── TROUBLESHOOTING.md
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow
├── [your-apps]/            # Your applications go here
│   ├── app-name-1/
│   ├── app-name-2/
│   └── ...
└── [documentation files]   # Setup and usage guides
```

## 🚀 Deployment Workflow

### Test Environment
- **Branch**: `test`
- **URL**: `https://immigrify.ca/tools-test/`
- **Usage**: Test changes before production

### Production Environment
- **Branch**: `main`
- **URL**: `https://immigrify.ca/tools/`
- **Usage**: Live production deployment

## 📚 Documentation

- `SETUP_INSTRUCTIONS.md` - Setup guide (for reference)
- `LLM_INSTRUCTIONS.md` - Instructions for AI assistants
- `QUICK_START.md` - Quick reference guide
- `docs/DEPLOYMENT_INSTRUCTIONS.md` - **Daily usage guide** ⭐
- `docs/DEPLOYMENT_SETUP_GUIDE.md` - Detailed technical setup
- `docs/TROUBLESHOOTING.md` - Common issues and solutions

## 🛠️ How to Deploy

### Deploy to Test
```bash
git checkout test
git add .
git commit -m "Your changes"
git push origin test
```

### Deploy to Production
```bash
git checkout main
git merge test
git push origin main
```

## 📋 Adding New Apps

1. Create a new folder in the project root
2. Add your HTML or React app files
3. For React apps: Include `package.json` with `"homepage": "."`
4. Push to `test` branch to deploy
5. Test at `https://immigrify.ca/tools-test/your-app-name/`
6. Merge to `main` for production

## 🔐 Security

- FTP credentials stored in GitHub Secrets
- Server IP address used (bypasses Cloudflare)
- Test environment for safe testing before production

## 📝 Notes

- Always test on `test` branch before deploying to `main`
- Each app should be in its own folder
- React apps require `package.json` with build script
- HTML apps can be deployed directly

---

**Ready to add your first app?** Check `docs/DEPLOYMENT_INSTRUCTIONS.md` for detailed instructions.
