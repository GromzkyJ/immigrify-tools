# Immigrify.ca Tools - Auto-Deployment System

> **Master Documentation** - Complete onboarding guide for developers, designers, project managers, and AI assistants.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Deployment Workflow](#deployment-workflow)
4. [Branch Strategy](#branch-strategy)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Adding Applications](#adding-applications)
8. [Configuration Details](#configuration-details)
9. [Documentation Index](#documentation-index)
10. [Troubleshooting](#troubleshooting)
11. [Best Practices](#best-practices)

---

## 🎯 Project Overview

### What Is This Project?

This repository contains **tools and applications for immigrify.ca** with **automated deployment** from GitHub to the web server. When you push code to GitHub, it automatically builds (if needed) and deploys to the immigrify.ca website within 1-2 minutes.

### Key Features

- ✅ **Automatic Deployment**: Push to GitHub → Auto-deploys to immigrify.ca
- ✅ **Dual Environment**: Separate test and production environments
- ✅ **Multi-App Support**: Deploy multiple HTML and React applications
- ✅ **Version Control**: Full Git history with rollback capabilities
- ✅ **Secure**: Credentials stored in GitHub Secrets (encrypted)
- ✅ **Zero Manual Uploads**: No FTP clients or manual file transfers needed

### Project Information

- **Project Name**: immigrify-tools
- **Domain**: immigrify.ca
- **GitHub Repository**: [https://github.com/GromzkyJ/immigrify-tools](https://github.com/GromzkyJ/immigrify-tools)
- **GitHub Username**: GromzkyJ
- **Hosting**: CyberPanel (FTP-based deployment)
- **Deployment Method**: GitHub Actions + FTP

---

## 🏗️ System Architecture

### How It Works

```
┌─────────────────┐
│  Local Machine  │
│  (Your Code)    │
└────────┬────────┘
         │
         │ git push
         ▼
┌─────────────────┐
│   GitHub Repo   │
│  (immigrify-    │
│   tools)         │
└────────┬────────┘
         │
         │ Triggers
         ▼
┌─────────────────┐
│ GitHub Actions  │
│  (Workflow)     │
│  - Build React  │
│  - Prepare      │
│  - Deploy FTP   │
└────────┬────────┘
         │
         │ FTP Upload
         ▼
┌─────────────────┐
│  immigrify.ca   │
│  Web Server     │
│  - tools-test/  │
│  - tools/       │
└─────────────────┘
```

### Components

1. **GitHub Repository**: Code storage and version control
2. **GitHub Actions**: Automated workflow that runs on every push
3. **Build Process**: Automatically builds React apps (if needed)
4. **FTP Deployment**: Uploads files to immigrify.ca server
5. **Web Server**: Serves files at immigrify.ca/tools-test/ and immigrify.ca/tools/

---

## 🚀 Deployment Workflow

### Overview

The system uses a **two-branch strategy** with automatic deployment:

- **`test` branch** → Deploys to **test environment**
- **`main` branch** → Deploys to **production environment**

### Test Environment

**Purpose**: Safe testing before production deployment

- **Branch**: `test`
- **Server Path**: `/public_html/tools-test/`
- **Public URL**: `https://immigrify.ca/tools-test/`
- **When to Use**: 
  - Testing new features
  - Debugging issues
  - Previewing changes
  - Before production deployment

**Deployment Process**:
1. Push code to `test` branch
2. GitHub Actions automatically triggers
3. Builds React apps (if any)
4. Uploads files via FTP to `/tools-test/`
5. Files available at `https://immigrify.ca/tools-test/` within 1-2 minutes

### Production Environment

**Purpose**: Live website for end users

- **Branch**: `main`
- **Server Path**: `/public_html/tools/`
- **Public URL**: `https://immigrify.ca/tools/`
- **When to Use**: 
  - After successful testing
  - Ready for public access
  - Production releases

**Deployment Process**:
1. Merge `test` branch into `main`
2. Push to `main` branch
3. GitHub Actions automatically triggers
4. Builds React apps (if any)
5. Uploads files via FTP to `/tools/`
6. Files available at `https://immigrify.ca/tools/` within 1-2 minutes

### Deployment Flow Diagram

```
┌─────────────┐
│ Make Changes│
│  Locally    │
└──────┬──────┘
       │
       │ git add, commit
       ▼
┌─────────────┐      ┌──────────────┐
│ Push to     │─────▶│ Test Env     │
│ test branch │      │ immigrify.ca │
└─────────────┘      │ /tools-test/ │
                     └──────┬───────┘
                            │
                            │ Verify & Test
                            ▼
                     ┌──────────────┐
                     │ All Good?    │
                     └──────┬───────┘
                            │ Yes
                            ▼
┌─────────────┐      ┌──────────────┐
│ Merge test  │─────▶│ Production   │
│ to main     │      │ immigrify.ca │
└──────┬──────┘      │ /tools/     │
       │             └─────────────┘
       │
       │ git push main
       ▼
┌─────────────┐
│ Production  │
│ Deployed    │
└─────────────┘
```

---

## 🌿 Branch Strategy

### Branch Overview

| Branch | Purpose | Deploys To | URL | When to Use |
|--------|---------|------------|-----|-------------|
| `test` | Testing & Development | Test Environment | `https://immigrify.ca/tools-test/` | Always use first |
| `main` | Production | Production Environment | `https://immigrify.ca/tools/` | After testing |

### Branch Rules

1. **Always test first**: Never push directly to `main` without testing on `test` branch
2. **Merge workflow**: `test` → `main` (never the reverse)
3. **Production protection**: `main` branch is production - handle with care
4. **Feature branches**: Optional, but merge to `test` first

### Typical Workflow

```bash
# 1. Start on test branch
git checkout test

# 2. Make your changes
# ... edit files ...

# 3. Commit and push to test
git add .
git commit -m "Description of changes"
git push origin test

# 4. Wait 1-2 minutes, then verify at:
# https://immigrify.ca/tools-test/

# 5. If everything works, deploy to production
git checkout main
git merge test
git push origin main

# 6. Wait 1-2 minutes, then verify at:
# https://immigrify.ca/tools/
```

---

## 📁 Project Structure

### Directory Layout

```
immigrify-tools/
│
├── 📄 README.md                    # This file - Master documentation
├── 📄 QUICK_START.md              # Quick reference guide
├── 📄 SETUP_INSTRUCTIONS.md       # Setup reference (project already configured)
├── 📄 LLM_INSTRUCTIONS.md         # Instructions for AI assistants
│
├── 📁 docs/                       # Detailed documentation
│   ├── DEPLOYMENT_INSTRUCTIONS.md  # Complete daily usage guide ⭐
│   ├── DEPLOYMENT_SETUP_GUIDE.md  # Technical setup details
│   └── TROUBLESHOOTING.md         # Common issues and solutions
│
├── 📁 .github/                    # GitHub configuration (hidden)
│   └── workflows/
│       └── deploy.yml             # GitHub Actions workflow
│
├── 📁 .git/                       # Git repository (hidden)
│
├── 📄 .gitignore                  # Git ignore rules
│
└── 📁 [your-apps]/               # Your applications go here
    ├── app-name-1/               # Example: HTML app
    │   └── index.html
    ├── app-name-2/               # Example: React app
    │   ├── package.json
    │   ├── src/
    │   └── public/
    └── ...
```

### Folder Descriptions

#### Root Level Files

- **`README.md`**: Master documentation (this file)
- **`QUICK_START.md`**: Quick reference for daily operations
- **`SETUP_INSTRUCTIONS.md`**: Reference for how the project was set up
- **`LLM_INSTRUCTIONS.md`**: Guide for AI assistants working on this project

#### Documentation Folder (`docs/`)

- **`DEPLOYMENT_INSTRUCTIONS.md`**: ⭐ **Most Important** - Complete guide for daily deployment operations
- **`DEPLOYMENT_SETUP_GUIDE.md`**: Technical details about the setup (reference)
- **`TROUBLESHOOTING.md`**: Solutions to common problems

#### Application Folders

Each application should be in its own folder at the root level:

```
immigrify-tools/
├── calculator/          # HTML app example
│   └── index.html
├── my-react-app/        # React app example
│   ├── package.json
│   ├── src/
│   └── public/
└── another-app/         # Another app
    └── index.html
```

**Important**: 
- Each app must be in its own folder
- Folder name becomes the URL path (e.g., `calculator/` → `immigrify.ca/tools/calculator/`)
- HTML apps: Just add files directly
- React apps: Must include `package.json` with build script

---

## 🚀 Getting Started

### For New Team Members

#### 1. Prerequisites

- Git installed on your machine
- GitHub account with access to the repository
- Basic terminal/command line knowledge
- (Optional) Node.js if working with React apps

#### 2. Clone the Repository

```bash
git clone https://github.com/GromzkyJ/immigrify-tools.git
cd immigrify-tools
```

#### 3. Verify Setup

```bash
# Check branches
git branch -a
# Should see: test and main

# Check remote
git remote -v
# Should point to: https://github.com/GromzkyJ/immigrify-tools.git

# Check current branch
git branch
# Should be on test or main
```

#### 4. Understand the Workflow

1. **Always work on `test` branch first**
2. **Make your changes**
3. **Push to `test` branch** → Auto-deploys to test environment
4. **Verify at**: `https://immigrify.ca/tools-test/`
5. **If good, merge to `main`** → Auto-deploys to production
6. **Verify at**: `https://immigrify.ca/tools/`

#### 5. Read the Documentation

- **Start here**: This README.md
- **Daily usage**: `docs/DEPLOYMENT_INSTRUCTIONS.md`
- **Quick reference**: `QUICK_START.md`
- **Troubleshooting**: `docs/TROUBLESHOOTING.md`

### For AI Assistants / LLMs

1. **Read `LLM_INSTRUCTIONS.md`** first
2. **Read this README.md** for complete understanding
3. **Reference `docs/DEPLOYMENT_INSTRUCTIONS.md`** for step-by-step guides
4. **Check `docs/TROUBLESHOOTING.md`** if issues arise

---

## 📦 Adding Applications

### Application Types

The system supports two types of applications:

1. **HTML Apps**: Simple HTML/CSS/JavaScript (no build process)
2. **React Apps**: Full React applications (requires build process)

### Adding an HTML App

#### Step 1: Create App Folder

```bash
cd immigrify-tools
mkdir my-html-app
cd my-html-app
```

#### Step 2: Create Your Files

```bash
# Create index.html
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>My App</title>
</head>
<body>
    <h1>My HTML App</h1>
</body>
</html>
EOF
```

#### Step 3: Deploy

```bash
# Go back to project root
cd ..

# Commit and push
git checkout test
git add my-html-app/
git commit -m "Add my-html-app"
git push origin test
```

#### Step 4: Access Your App

- **Test**: `https://immigrify.ca/tools-test/my-html-app/`
- **Production**: After merging to `main` → `https://immigrify.ca/tools/my-html-app/`

### Adding a React App

#### Step 1: Create App Folder

```bash
cd immigrify-tools
mkdir my-react-app
cd my-react-app
```

#### Step 2: Initialize React App

```bash
# Create package.json
cat > package.json << 'EOF'
{
  "name": "my-react-app",
  "version": "1.0.0",
  "private": true,
  "homepage": ".",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
EOF

# Create folder structure
mkdir -p src public

# Create public/index.html
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>My React App</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
EOF

# Create src/index.js
cat > src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return <h1>My React App</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
EOF
```

**⚠️ Critical**: The `"homepage": "."` field in `package.json` is **required** for React apps deployed to subdirectories.

#### Step 3: Deploy

```bash
# Go back to project root
cd ..

# Commit and push
git checkout test
git add my-react-app/
git commit -m "Add my-react-app"
git push origin test
```

#### Step 4: Access Your App

- **Test**: `https://immigrify.ca/tools-test/my-react-app/`
- **Production**: After merging to `main` → `https://immigrify.ca/tools/my-react-app/`

### App Naming Conventions

- Use lowercase with hyphens: `my-app-name`
- No spaces or special characters
- Descriptive names
- Folder name = URL path

**Examples**:
- ✅ `calculator` → `immigrify.ca/tools/calculator/`
- ✅ `user-dashboard` → `immigrify.ca/tools/user-dashboard/`
- ❌ `My App` (spaces)
- ❌ `my_app` (underscores - use hyphens)

---

## ⚙️ Configuration Details

### GitHub Configuration

- **Repository**: `GromzkyJ/immigrify-tools`
- **URL**: https://github.com/GromzkyJ/immigrify-tools
- **Branches**: `test` and `main`
- **Workflow**: `.github/workflows/deploy.yml`

### GitHub Secrets

The following secrets are configured in GitHub (Settings → Secrets and variables → Actions):

1. **`FTP_SERVER`**: Server IP address (bypasses Cloudflare)
2. **`FTP_USERNAME`**: `admin_immigrify_deploy`
3. **`FTP_PASSWORD`**: FTP password (encrypted)

**Note**: These are already configured. Do not modify unless necessary.

### Server Configuration

- **Domain**: immigrify.ca
- **Hosting**: CyberPanel
- **FTP Root**: `/public_html`
- **Test Path**: `/public_html/tools-test/`
- **Production Path**: `/public_html/tools/`

### Deployment Paths

| Environment | Branch | Server Path | Public URL |
|-------------|--------|-------------|------------|
| Test | `test` | `/public_html/tools-test/` | `https://immigrify.ca/tools-test/` |
| Production | `main` | `/public_html/tools/` | `https://immigrify.ca/tools/` |

### Build Process

**For HTML Apps**:
- No build process required
- Files copied directly to server

**For React Apps**:
- Automatically detected (presence of `package.json`)
- Runs `npm install` and `npm run build`
- Build output from `build/` folder is deployed
- Takes 2-5 minutes for React apps

---

## 📚 Documentation Index

### Essential Reading (In Order)

1. **`README.md`** (this file) - Master documentation
2. **`docs/DEPLOYMENT_INSTRUCTIONS.md`** - Complete daily usage guide ⭐
3. **`QUICK_START.md`** - Quick reference

### Reference Documentation

- **`SETUP_INSTRUCTIONS.md`** - How the project was set up (reference only)
- **`LLM_INSTRUCTIONS.md`** - Guide for AI assistants
- **`docs/DEPLOYMENT_SETUP_GUIDE.md`** - Technical setup details
- **`docs/TROUBLESHOOTING.md`** - Common issues and solutions

### Documentation by Role

#### For Developers
- Start: `README.md` (this file)
- Daily work: `docs/DEPLOYMENT_INSTRUCTIONS.md`
- Quick reference: `QUICK_START.md`
- Problems: `docs/TROUBLESHOOTING.md`

#### For Project Managers
- Start: `README.md` (this file)
- Overview: Project Overview section above
- Workflow: Deployment Workflow section above

#### For Designers
- Start: `README.md` (this file)
- Adding apps: Adding Applications section above
- File structure: Project Structure section above

#### For AI Assistants / LLMs
- Start: `LLM_INSTRUCTIONS.md`
- Then: `README.md` (this file)
- Daily tasks: `docs/DEPLOYMENT_INSTRUCTIONS.md`

---

## 🔧 Troubleshooting

### Quick Troubleshooting

1. **Deployment not working?**
   - Check GitHub Actions: https://github.com/GromzkyJ/immigrify-tools/actions
   - Review workflow logs for errors
   - Verify GitHub Secrets are set

2. **Files not appearing on website?**
   - Wait 1-2 minutes (deployment takes time)
   - Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
   - Check correct URL: `https://immigrify.ca/tools-test/` or `https://immigrify.ca/tools/`

3. **React app not working?**
   - Verify `package.json` has `"homepage": "."`
   - Check build completed in GitHub Actions
   - Verify `build/` folder exists after build

4. **FTP connection errors?**
   - Server uses IP address (not domain) to bypass Cloudflare
   - Check GitHub Secrets are correct
   - Verify server directories exist

### Detailed Troubleshooting

For comprehensive troubleshooting, see:
- **`docs/TROUBLESHOOTING.md`** - Complete troubleshooting guide

### Getting Help

1. Check `docs/TROUBLESHOOTING.md`
2. Review GitHub Actions logs
3. Check this README.md
4. Review `docs/DEPLOYMENT_INSTRUCTIONS.md`

---

## ✅ Best Practices

### Development Workflow

1. ✅ **Always test first**: Use `test` branch before `main`
2. ✅ **Verify deployments**: Check URLs after pushing
3. ✅ **Descriptive commits**: Write clear commit messages
4. ✅ **One feature per commit**: Keep commits focused
5. ✅ **Review changes**: Use `git diff` before committing

### Code Organization

1. ✅ **One app per folder**: Each app in its own directory
2. ✅ **Clear naming**: Use descriptive folder names
3. ✅ **Keep it clean**: Remove unused files
4. ✅ **Documentation**: Update docs when needed

### Security

1. ✅ **Never commit credentials**: Use GitHub Secrets
2. ✅ **Remove tokens**: Clean Git remote URL after pushing
3. ✅ **Test before production**: Always verify on test first
4. ✅ **Review code**: Check changes before deploying

### React Apps

1. ✅ **Include `"homepage": "."`**: Required for subdirectory deployment
2. ✅ **Test build locally**: Run `npm run build` before pushing
3. ✅ **Check dependencies**: Ensure all in `package.json`
4. ✅ **Build output**: Verify `build/` folder is created

### Deployment

1. ✅ **Test environment first**: Always deploy to test before production
2. ✅ **Wait for completion**: Give 1-2 minutes for deployment
3. ✅ **Verify URLs**: Check both test and production URLs
4. ✅ **Monitor GitHub Actions**: Watch workflow runs

---

## 🔗 Quick Links

### GitHub

- **Repository**: https://github.com/GromzkyJ/immigrify-tools
- **Actions**: https://github.com/GromzkyJ/immigrify-tools/actions
- **Settings**: https://github.com/GromzkyJ/immigrify-tools/settings
- **Secrets**: https://github.com/GromzkyJ/immigrify-tools/settings/secrets/actions

### Deployment URLs

- **Test Environment**: https://immigrify.ca/tools-test/
- **Production Environment**: https://immigrify.ca/tools/

### Documentation

- **Daily Usage**: `docs/DEPLOYMENT_INSTRUCTIONS.md`
- **Quick Start**: `QUICK_START.md`
- **Troubleshooting**: `docs/TROUBLESHOOTING.md`

---

## 📝 Summary

### What You Need to Know

1. **Two branches**: `test` (testing) and `main` (production)
2. **Auto-deployment**: Push to GitHub → Auto-deploys to immigrify.ca
3. **Two environments**: Test (`/tools-test/`) and Production (`/tools/`)
4. **App structure**: Each app in its own folder
5. **React requirement**: Must include `"homepage": "."` in `package.json`

### Quick Commands

```bash
# Deploy to test
git checkout test
git add .
git commit -m "Your changes"
git push origin test

# Deploy to production (after testing)
git checkout main
git merge test
git push origin main
```

### Next Steps

1. **Read**: `docs/DEPLOYMENT_INSTRUCTIONS.md` for detailed guides
2. **Practice**: Make a small change and deploy to test
3. **Explore**: Check existing apps (if any) to understand structure
4. **Build**: Create your first app following the guides above

---

## 🎓 Learning Path

### For Complete Beginners

1. Read this README.md completely
2. Read `QUICK_START.md`
3. Read `docs/DEPLOYMENT_INSTRUCTIONS.md` (sections 1-4)
4. Make a test change and deploy
5. Read remaining documentation as needed

### For Experienced Developers

1. Skim this README.md
2. Review Deployment Workflow section
3. Check `docs/DEPLOYMENT_INSTRUCTIONS.md` for specifics
4. Start coding!

### For Project Managers

1. Read Project Overview
2. Review Deployment Workflow
3. Understand Branch Strategy
4. Reference this document as needed

---

**🎉 You're ready to start!** 

This documentation provides everything you need to understand and work with the immigrify.ca tools project. For specific tasks, refer to the relevant documentation files listed above.

---

*Last Updated: December 2024*  
*Project: Immigrify.ca Tools*  
*Repository: GromzkyJ/immigrify-tools*
