# Quick Start Guide - Immigrify.ca Tools

## 🎯 Project Overview

This is the auto-deployment system for immigrify.ca tools and applications.

## 🚀 Daily Workflow

### Deploy Changes to Test
```bash
cd immigrify-tools
git checkout test
git add .
git commit -m "Description of changes"
git push origin test
```
**Result**: Auto-deploys to `https://immigrify.ca/tools-test/`

### Deploy to Production
```bash
git checkout main
git merge test
git push origin main
```
**Result**: Auto-deploys to `https://immigrify.ca/tools/`

## 📁 Adding a New App

### HTML App
1. Create folder: `mkdir my-app`
2. Add `index.html` and other files
3. Push to `test` branch
4. Access at: `https://immigrify.ca/tools-test/my-app/`

### React App
1. Create folder: `mkdir my-react-app`
2. Add React files with `package.json`
3. Ensure `package.json` has `"homepage": "."`
4. Push to `test` branch
5. Access at: `https://immigrify.ca/tools-test/my-react-app/`

## 📚 Documentation

- **Daily Usage**: `docs/DEPLOYMENT_INSTRUCTIONS.md` ⭐
- **Troubleshooting**: `docs/TROUBLESHOOTING.md`
- **Detailed Setup**: `docs/DEPLOYMENT_SETUP_GUIDE.md`

## ⚠️ Important Rules

- ✅ Always test on `test` branch first
- ✅ Verify test deployment before merging to `main`
- ✅ Never push directly to `main` without testing
- ✅ Use descriptive commit messages

## 🔗 Quick Links

- **Test Environment**: https://immigrify.ca/tools-test/
- **Production Environment**: https://immigrify.ca/tools/
- **GitHub Repository**: https://github.com/GromzkyJ/immigrify-tools
- **GitHub Actions**: https://github.com/GromzkyJ/immigrify-tools/actions

---

**Need help?** Check `docs/TROUBLESHOOTING.md` or `docs/DEPLOYMENT_INSTRUCTIONS.md`
