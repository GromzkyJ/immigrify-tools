# Instructions for LLMs/AI Assistants

## 🎯 Your Role

You are helping set up a new project using this deployment template. Follow these instructions **exactly** to ensure successful setup.

## 📖 Reading Order

1. **Read this file first** (you are here)
2. **Read `SETUP_INSTRUCTIONS.md`** - Complete setup guide
3. **Read `TEMPLATE_OVERVIEW.md`** - Understand what the template provides
4. **Reference `docs/TROUBLESHOOTING.md`** - If issues arise

## 🔍 What You Need to Do

### Step 1: Understand the Template

This template provides:
- Automated deployment from GitHub to web server
- Support for HTML and React apps
- Test and production environments
- Complete documentation

### Step 2: Gather Required Information

Ask the user for:

1. **Project Details**:
   - Project name
   - Project description (optional)

2. **GitHub Information**:
   - GitHub username
   - Desired repository name
   - Personal Access Token (with `repo` and `workflow` permissions)

3. **Server Information**:
   - Domain name
   - FTP server address
   - FTP username (full username from CyberPanel)
   - FTP password
   - Test environment path (e.g., `/tools-test/`)
   - Production environment path (e.g., `/tools/`)

### Step 3: Choose Setup Method

**Option A: Automated Setup (Recommended)**
- Use the `setup.sh` script
- Guide user through running it
- Script handles most configuration

**Option B: Manual Setup**
- Follow `SETUP_INSTRUCTIONS.md` step-by-step
- Execute each command
- Verify each step before proceeding

### Step 4: Execute Setup

**If using automated setup:**
1. Copy template folder
2. Run `./setup.sh`
3. Guide user through prompts
4. Help add GitHub Secrets manually
5. Test deployment

**If using manual setup:**
1. Copy template folder
2. Follow `SETUP_INSTRUCTIONS.md` exactly
3. Execute each step
4. Verify after each major step
5. Test deployment

### Step 5: Verify Setup

Check:
- ✅ GitHub repository created
- ✅ Branches exist (test and main)
- ✅ GitHub Secrets added
- ✅ Server directories exist
- ✅ Test deployment works
- ✅ Files appear on server

## ⚠️ Important Rules

1. **Never commit credentials** to the repository
2. **Always use GitHub Secrets** for sensitive data
3. **Verify each step** before proceeding
4. **Test on test branch** before production
5. **Follow instructions exactly** - don't skip steps

## 🐛 When Issues Arise

1. **Check `docs/TROUBLESHOOTING.md`** first
2. **Review error messages** carefully
3. **Verify configuration** step by step
4. **Check GitHub Actions logs** for details
5. **Test components separately** to isolate issues

## 📝 Communication with User

- **Be clear** about what information you need
- **Explain** what each step does
- **Verify** information before proceeding
- **Confirm** before making changes
- **Report** progress and any issues

## ✅ Success Indicators

Setup is successful when:
- User can push code to GitHub
- GitHub Actions workflow runs
- Files deploy to test server
- Test URL loads correctly
- User understands how to deploy

## 🎓 Key Concepts to Understand

1. **Branches**: `test` for testing, `main` for production
2. **GitHub Actions**: Automatically runs on push
3. **GitHub Secrets**: Secure storage for credentials
4. **Build Process**: React apps need `npm run build`
5. **Deployment Paths**: Relative paths for subdirectories

## 📚 Reference Documents

- `SETUP_INSTRUCTIONS.md` - Complete setup guide
- `TEMPLATE_OVERVIEW.md` - What the template provides
- `docs/DEPLOYMENT_SETUP_GUIDE.md` - Technical details
- `docs/DEPLOYMENT_INSTRUCTIONS.md` - Daily usage
- `docs/TROUBLESHOOTING.md` - Problem solving

## 🚀 Quick Start Checklist

When user wants to set up a new project:

- [ ] Read `SETUP_INSTRUCTIONS.md`
- [ ] Gather all required information from user
- [ ] Choose setup method (automated or manual)
- [ ] Execute setup steps
- [ ] Verify GitHub repository
- [ ] Configure GitHub Secrets
- [ ] Test deployment
- [ ] Confirm success with user

## 💡 Pro Tips

1. **Ask questions** if information is unclear
2. **Verify inputs** before using them
3. **Test incrementally** - don't skip verification
4. **Document issues** for future reference
5. **Be patient** - setup takes time but saves time later

---

**Remember**: This template has been tested and proven. Follow the instructions exactly, and setup will succeed. If issues arise, refer to troubleshooting guide.

**Good luck!** 🚀

