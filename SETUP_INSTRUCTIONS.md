# Setup Instructions - Master Guide for LLMs and Developers

## 🎯 Purpose of This Document

This document provides **complete, step-by-step instructions** for setting up a new project using this template. It is designed to be followed by:
- AI assistants (LLMs)
- Developers
- Anyone setting up a new deployment system

**Every step is detailed with no assumptions. Follow this guide exactly.**

---

## 📋 Pre-Setup Checklist

Before starting, gather the following information:

### Required Information

1. **Project Details**
   - [ ] Project name (e.g., "my-tools", "client-portal")
   - [ ] Project description (optional)

2. **GitHub Information**
   - [ ] GitHub username
   - [ ] GitHub repository name (will be created)
   - [ ] GitHub Personal Access Token (with `repo` and `workflow` permissions)

3. **Server Information**
   - [ ] Domain name (e.g., `example.com`)
   - [ ] FTP server address (usually just the domain, e.g., `example.com`)
   - [ ] FTP username (full username from CyberPanel)
   - [ ] FTP password
   - [ ] FTP root directory (usually `/public_html`)

4. **Deployment Paths**
   - [ ] Test environment path (e.g., `/tools-test/` or `/staging/`)
   - [ ] Production environment path (e.g., `/tools/` or `/`)

---

## 🚀 Setup Process Overview

The setup process has two options:

1. **Automated Setup** (Recommended) - Uses `setup.sh` script
2. **Manual Setup** - Follow step-by-step instructions

Both methods achieve the same result. Choose based on your preference.

---

## Option 1: Automated Setup (Recommended)

### Step 1: Prepare the Template

```bash
# Navigate to where you want your new project
cd /path/to/your/projects

# Copy the template folder
cp -r project-template my-new-project

# Navigate into the new project
cd my-new-project
```

### Step 2: Run the Setup Script

```bash
# Make the script executable
chmod +x setup.sh

# Run the setup script
./setup.sh
```

### Step 3: Follow Interactive Prompts

The script will ask you for:
1. Project name
2. GitHub username
3. GitHub repository name
4. Domain name
5. FTP server address
6. FTP username
7. FTP password
8. Test environment path
9. Production environment path

**Important**: Have all this information ready before running the script.

### Step 4: Verify Setup

The script will:
- ✅ Create GitHub repository
- ✅ Configure workflow files
- ✅ Set up branches
- ✅ Guide you through GitHub Secrets setup
- ✅ Test the connection

### Step 5: Complete GitHub Secrets Setup

The script will guide you, but you need to manually add secrets to GitHub:
1. Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`
2. Add three secrets:
   - `FTP_SERVER`
   - `FTP_USERNAME`
   - `FTP_PASSWORD`

### Step 6: Test Deployment

```bash
# Push to test branch
git push origin test

# Check GitHub Actions
# Visit: https://github.com/YOUR_USERNAME/YOUR_REPO/actions

# After 1-2 minutes, check your test URL
# Visit: https://yourdomain.com/YOUR_TEST_PATH/
```

---

## Option 2: Manual Setup

If you prefer manual setup or the script doesn't work, follow these steps:

### Step 1: Prepare the Template

```bash
# Navigate to where you want your new project
cd /path/to/your/projects

# Copy the template folder
cp -r project-template my-new-project

# Navigate into the new project
cd my-new-project
```

### Step 2: Update Workflow File

Edit `.github/workflows/deploy.yml`:

1. The workflow is already configured, but verify:
   - Node.js version (default: '18')
   - Server directory paths match your setup

2. No changes needed unless you have custom requirements.

### Step 3: Create GitHub Repository

1. Go to https://github.com
2. Click "+" → "New repository"
3. Repository name: `YOUR_REPO_NAME`
4. Description: (optional)
5. Visibility: Private or Public
6. **Do NOT** initialize with README
7. Click "Create repository"

### Step 4: Initialize Git

```bash
# Initialize git (if not already done)
git init

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Create test branch
git checkout -b test

# Add all files
git add .

# Commit
git commit -m "Initial setup from template"

# Push (you'll need to authenticate)
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin test
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Create and push main branch
git checkout -b main
git push -u origin main
```

### Step 5: Set Up GitHub Secrets

1. Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/settings/secrets/actions`
2. Click "New repository secret"
3. Add three secrets:

   **Secret 1: FTP_SERVER**
   - Name: `FTP_SERVER`
   - Value: Your FTP server address (e.g., `example.com`)

   **Secret 2: FTP_USERNAME**
   - Name: `FTP_USERNAME`
   - Value: Your full FTP username (e.g., `admin_username`)

   **Secret 3: FTP_PASSWORD**
   - Name: `FTP_PASSWORD`
   - Value: Your FTP password

### Step 6: Set Up FTP Account (If Needed)

If you don't have an FTP account yet:

1. Log into CyberPanel
2. Go to "FTP Accounts"
3. Create new FTP account:
   - Domain: Your domain
   - Username: Create one
   - Password: Generate or create
   - Directory: `/public_html`
4. Save the credentials for GitHub Secrets

### Step 7: Create Server Directories

1. Log into CyberPanel
2. Go to "File Manager"
3. Navigate to `public_html`
4. Create directories:
   - `tools-test` (or your test path)
   - `tools` (or your production path)

### Step 8: Test Deployment

```bash
# Make a test change
echo "Test deployment" > test.txt
git add test.txt
git commit -m "Test deployment"
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push origin test
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

1. Check GitHub Actions: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/actions`
2. Wait 1-2 minutes
3. Check your test URL: `https://yourdomain.com/YOUR_TEST_PATH/`

---

## 🔍 Verification Steps

After setup, verify everything works:

### 1. Check GitHub Repository
- [ ] Repository exists
- [ ] Test and main branches exist
- [ ] Workflow file is present

### 2. Check GitHub Secrets
- [ ] `FTP_SERVER` secret exists
- [ ] `FTP_USERNAME` secret exists
- [ ] `FTP_PASSWORD` secret exists

### 3. Check Server
- [ ] Test directory exists on server
- [ ] Production directory exists on server
- [ ] FTP account has access to both directories

### 4. Test Deployment
- [ ] Push to test branch triggers workflow
- [ ] Workflow completes successfully
- [ ] Files appear on test server
- [ ] Test URL loads correctly

---

## 🐛 Troubleshooting

### Issue: Setup Script Fails

**Symptoms**: Script shows errors or stops

**Solutions**:
1. Check you have all required information
2. Verify Git is installed: `git --version`
3. Check GitHub token has correct permissions
4. Review error messages in script output
5. Try manual setup instead

### Issue: GitHub Repository Creation Fails

**Symptoms**: Script can't create repository

**Solutions**:
1. Verify GitHub token has `repo` permission
2. Check repository name doesn't already exist
3. Create repository manually and continue

### Issue: Workflow Doesn't Trigger

**Symptoms**: Push doesn't start deployment

**Solutions**:
1. Verify workflow file is in `.github/workflows/deploy.yml`
2. Check branch names match (`test` and `main`)
3. Verify workflow file syntax is correct
4. Check GitHub Actions tab for errors

### Issue: Deployment Fails

**Symptoms**: Workflow runs but deployment fails

**Solutions**:
1. Verify GitHub Secrets are correct
2. Check FTP credentials are accurate
3. Verify server directories exist
4. Check FTP account has correct permissions
5. Review workflow logs for specific errors

### Issue: Files Not Appearing on Server

**Symptoms**: Deployment succeeds but files not visible

**Solutions**:
1. Check server directory paths are correct
2. Verify FTP account has access to directories
3. Check file permissions on server
4. Clear browser cache
5. Verify URL path matches deployment path

---

## 📚 Additional Resources

- `docs/DEPLOYMENT_SETUP_GUIDE.md` - Detailed setup guide
- `docs/DEPLOYMENT_INSTRUCTIONS.md` - Daily usage guide
- `docs/TROUBLESHOOTING.md` - Common issues and solutions

---

## ✅ Success Criteria

Setup is complete when:
- ✅ GitHub repository is created and connected
- ✅ Test and main branches exist
- ✅ GitHub Secrets are configured
- ✅ Server directories are created
- ✅ Test deployment succeeds
- ✅ Files appear on test server
- ✅ Test URL loads correctly

---

## 🎓 Next Steps

After successful setup:

1. **Remove Example Apps** (optional):
   ```bash
   rm -rf examples/
   ```

2. **Create Your First App**:
   - See `examples/` for reference
   - Create your app in its own folder
   - Follow deployment instructions

3. **Read Documentation**:
   - `docs/DEPLOYMENT_INSTRUCTIONS.md` - How to deploy
   - `docs/DEPLOYMENT_SETUP_GUIDE.md` - Advanced setup

---

## 🔐 Security Reminders

- ✅ Never commit credentials to repository
- ✅ Always use GitHub Secrets for sensitive data
- ✅ Remove tokens from remote URL after pushing
- ✅ Use strong, unique passwords
- ✅ Rotate credentials periodically

---

## 📞 Getting Help

If you encounter issues:

1. Check `docs/TROUBLESHOOTING.md`
2. Review GitHub Actions logs
3. Verify all setup steps were completed
4. Check server and FTP configuration
5. Review error messages carefully

---

**End of Setup Instructions**

Follow these instructions exactly, and you'll have a working deployment system in minutes!



