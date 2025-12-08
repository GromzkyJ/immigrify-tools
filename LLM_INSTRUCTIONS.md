# Instructions for LLMs/AI Assistants - Immigrify.ca Tools

## 🎯 Your Role

You are helping with the **immigrify.ca tools project**. This is an active, working project with automated deployment already configured. Your role is to help add new tools, fix issues, and maintain the project.

## 📖 Reading Order

1. **Read this file first** (you are here)
2. **Read `README.md`** - Project overview
3. **Read `docs/DEPLOYMENT_INSTRUCTIONS.md`** - Daily usage guide
4. **Reference `docs/TROUBLESHOOTING.md`** - If issues arise

## 🔍 Project Information

### Current Setup
- **Project**: immigrify.ca Tools
- **Domain**: immigrify.ca
- **GitHub Repository**: https://github.com/GromzkyJ/immigrify-tools
- **GitHub Username**: GromzkyJ

### Deployment URLs
- **Test Environment**: `https://immigrify.ca/tools-test/`
- **Production Environment**: `https://immigrify.ca/tools/`

### Branches
- `test` branch → Auto-deploys to test environment
- `main` branch → Auto-deploys to production environment

## 🚀 What You Need to Know

### This Project Is Already Set Up
- ✅ GitHub repository configured
- ✅ GitHub Actions workflow working
- ✅ GitHub Secrets configured
- ✅ Server directories created
- ✅ Auto-deployment operational

### Your Tasks
1. **Add New Tools/Apps**: Create new folders with HTML or React apps
2. **Update Existing Apps**: Modify files in existing app folders
3. **Fix Issues**: Troubleshoot deployment or code issues
4. **Maintain Documentation**: Keep docs updated

## 📋 Adding a New App

### HTML App
1. Create folder: `mkdir app-name`
2. Add `index.html` and other files
3. Commit and push to `test` branch
4. Test at: `https://immigrify.ca/tools-test/app-name/`
5. Merge to `main` for production

### React App
1. Create folder: `mkdir app-name`
2. Add React files with `package.json`
3. Ensure `package.json` has `"homepage": "."`
4. Commit and push to `test` branch
5. Test at: `https://immigrify.ca/tools-test/app-name/`
6. Merge to `main` for production

## ⚠️ Important Rules

1. **Never commit credentials** to the repository
2. **Always test on `test` branch** before production
3. **Verify test deployment** before merging to `main`
4. **Use descriptive commit messages**
5. **Follow the deployment workflow** exactly

## 🐛 When Issues Arise

1. **Check `docs/TROUBLESHOOTING.md`** first
2. **Review GitHub Actions logs**: https://github.com/GromzkyJ/immigrify-tools/actions
3. **Verify configuration** step by step
4. **Check server directories** exist in CyberPanel
5. **Test components separately** to isolate issues

## 📝 Communication Guidelines

- **Be clear** about what you're doing
- **Explain** changes before making them
- **Verify** information before proceeding
- **Confirm** before making major changes
- **Report** progress and any issues

## ✅ Success Indicators

A task is successful when:
- Code is committed and pushed
- GitHub Actions workflow runs successfully
- Files deploy to test server
- Test URL loads correctly
- User confirms it works

## 🎓 Key Concepts

1. **Branches**: `test` for testing, `main` for production
2. **GitHub Actions**: Automatically runs on push
3. **Deployment**: Automatic via FTP to immigrify.ca
4. **Build Process**: React apps need `npm run build`
5. **Server IP**: Used for FTP (bypasses Cloudflare)

## 📚 Reference Documents

- `README.md` - Project overview
- `QUICK_START.md` - Quick reference
- `docs/DEPLOYMENT_INSTRUCTIONS.md` - **Daily usage guide** ⭐
- `docs/DEPLOYMENT_SETUP_GUIDE.md` - Technical details
- `docs/TROUBLESHOOTING.md` - Problem solving

## 💡 Pro Tips

1. **Always test first** on `test` branch
2. **Verify deployments** before considering done
3. **Check GitHub Actions** after every push
4. **Document changes** in commit messages
5. **Keep code organized** in separate folders

---

**Remember**: This is an active project for immigrify.ca. Always test changes before deploying to production.

**For daily usage, see `docs/DEPLOYMENT_INSTRUCTIONS.md`**
