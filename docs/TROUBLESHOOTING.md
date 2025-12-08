# Troubleshooting Guide

This guide covers common issues and their solutions when setting up and using the GitHub Actions auto-deployment system.

## Table of Contents
1. [Setup Issues](#setup-issues)
2. [GitHub Issues](#github-issues)
3. [Deployment Issues](#deployment-issues)
4. [React App Issues](#react-app-issues)
5. [FTP/Server Issues](#ftpserver-issues)
6. [Workflow Issues](#workflow-issues)

---

## Setup Issues

### Issue: Setup Script Fails to Run

**Symptoms**: 
- `Permission denied` when running `./setup.sh`
- Script doesn't execute

**Solutions**:
```bash
# Make script executable
chmod +x setup.sh

# Run with bash explicitly
bash setup.sh

# Or run with debug mode
DEBUG=true ./setup.sh
```

### Issue: Git Not Found

**Symptoms**: 
- Error: `git: command not found`

**Solutions**:
1. Install Git:
   - **Mac**: `xcode-select --install` or download from git-scm.com
   - **Linux**: `sudo apt install git` or `sudo yum install git`
   - **Windows**: Download from git-scm.com

2. Verify installation:
   ```bash
   git --version
   ```

### Issue: GitHub Token Invalid

**Symptoms**:
- `401 Unauthorized` errors
- Repository creation fails

**Solutions**:
1. Verify token has correct permissions:
   - ✅ `repo` (full control of private repositories)
   - ✅ `workflow` (update GitHub Action workflows)

2. Check token format:
   - Should start with `ghp_`
   - Should be 40+ characters

3. Regenerate token if needed:
   - GitHub → Settings → Developer settings → Personal access tokens
   - Create new token with required permissions

---

## GitHub Issues

### Issue: Repository Already Exists

**Symptoms**:
- Error when creating repository
- `422 Unprocessable Entity`

**Solutions**:
1. Use a different repository name
2. Delete existing repository (if you own it)
3. Continue with existing repository (script will prompt)

### Issue: Cannot Push to GitHub

**Symptoms**:
- `Permission denied` when pushing
- `403 Forbidden` errors

**Solutions**:
1. Verify token is correct and has `repo` permission
2. Check token hasn't expired
3. Use token in remote URL temporarily:
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/USERNAME/REPO.git
   git push origin test
   git remote set-url origin https://github.com/USERNAME/REPO.git
   ```

### Issue: Workflow File Not Found

**Symptoms**:
- Workflow doesn't trigger
- Error: `Workflow file not found`

**Solutions**:
1. Verify file exists: `.github/workflows/deploy.yml`
2. Check file is committed:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add workflow file"
   git push origin test
   ```
3. Verify file syntax (YAML format)

---

## Deployment Issues

### Issue: Deployment Fails with 530 Login Authentication Failed

**Symptoms**:
- FTP authentication error in GitHub Actions
- `530 Login authentication failed`

**Solutions**:
1. **Verify GitHub Secrets**:
   - Go to: Repository → Settings → Secrets and variables → Actions
   - Verify all three secrets exist:
     - `FTP_SERVER`
     - `FTP_USERNAME`
     - `FTP_PASSWORD`

2. **Check Secret Values**:
   - FTP username: Use FULL username (e.g., `admin_username`, not just `username`)
   - FTP password: Copy exactly, no extra spaces
   - FTP server: Try domain without `ftp.` prefix first (e.g., `example.com`)

3. **Test FTP Credentials**:
   - Use FTP client to verify credentials work
   - Check CyberPanel for exact username format

### Issue: Files Deployed But 404 Error

**Symptoms**:
- Deployment succeeds
- Website shows 404 error

**Solutions**:
1. **Check Server Directory Path**:
   - Verify `server-dir` in workflow matches your server structure
   - Should be relative: `./tools-test/` not `/public_html/tools-test/`

2. **Check File Location**:
   - Log into CyberPanel → File Manager
   - Navigate to deployment directory
   - Verify `index.html` exists

3. **Check URL Path**:
   - Verify URL matches deployment path
   - Test URL: `https://yourdomain.com/tools-test/`

4. **Clear Browser Cache**:
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Issue: Deployment Takes Too Long

**Symptoms**:
- Workflow runs for more than 5 minutes
- No completion

**Solutions**:
1. **Check GitHub Actions Status**:
   - Go to: https://www.githubstatus.com/
   - Verify GitHub is operational

2. **Check Workflow Logs**:
   - Go to: Repository → Actions tab
   - Click on running workflow
   - Check which step is stuck

3. **React App Build Time**:
   - React apps take 2-5 minutes to build
   - This is normal for first deployment

---

## React App Issues

### Issue: React App Build Fails

**Symptoms**:
- Error in "Build React Apps" step
- `npm install` or `npm run build` fails

**Solutions**:
1. **Test Build Locally**:
   ```bash
   cd your-react-app
   npm install
   npm run build
   ```

2. **Check package.json**:
   - Verify `"build"` script exists
   - Verify all dependencies are listed
   - Check for syntax errors

3. **Check Node.js Version**:
   - Workflow uses Node.js 18
   - Ensure your app is compatible

4. **Review Build Logs**:
   - Check GitHub Actions logs for specific error
   - Look for missing dependencies or syntax errors

### Issue: React App Shows Blank Page

**Symptoms**:
- App loads but shows blank page
- No errors in console

**Solutions**:
1. **Check Browser Console**:
   - Press F12 → Console tab
   - Look for JavaScript errors

2. **Verify index.html**:
   - Check `public/index.html` has `<div id="root"></div>`
   - Verify `src/index.js` renders App component

3. **Check File Deployment**:
   - Verify all files were deployed
   - Check server via File Manager

### Issue: CSS/JS Files Return 404

**Symptoms**:
- App loads but CSS/JS files show 404
- Console shows: `Failed to load resource`

**Solutions**:
1. **Add homepage Field** (Most Common Fix):
   - Edit `package.json` in your React app folder
   - Add: `"homepage": "."`
   - Rebuild and redeploy

2. **Verify Build Output**:
   ```bash
   cd your-react-app
   npm run build
   cat build/index.html
   ```
   - Check paths start with `./` not `/`

3. **Check File Structure**:
   - Verify `build/` folder was created
   - Check files exist in `build/static/`

---

## FTP/Server Issues

### Issue: FTP Server Not Found

**Symptoms**:
- `getaddrinfo ENOTFOUND` error
- Cannot connect to FTP server

**Solutions**:
1. **Try Different Server Addresses**:
   - Try: `example.com` (without `ftp.`)
   - Try: `ftp.example.com` (with `ftp.`)
   - Try: Server IP address

2. **Check CyberPanel**:
   - Go to FTP Accounts
   - Check what server address is shown
   - Use that exact address

3. **Verify Domain DNS**:
   - Ensure domain points to correct server
   - Check DNS records

### Issue: FTP Permission Denied

**Symptoms**:
- `550 Permission denied`
- Cannot write to directory

**Solutions**:
1. **Check FTP Account Permissions**:
   - Verify FTP account has write access
   - Check directory permissions in CyberPanel

2. **Verify Directory Exists**:
   - Create directories manually if needed
   - Ensure directories are writable

3. **Check Directory Path**:
   - Verify path in workflow is correct
   - Use relative paths: `./tools-test/`

---

## Workflow Issues

### Issue: Workflow Doesn't Trigger

**Symptoms**:
- Push to branch but workflow doesn't run
- No workflow run appears

**Solutions**:
1. **Check Branch Names**:
   - Workflow triggers on `test` and `main` branches
   - Verify you're pushing to correct branch

2. **Check Workflow File**:
   - Verify file exists: `.github/workflows/deploy.yml`
   - Check file is committed and pushed

3. **Check Workflow Syntax**:
   - Verify YAML syntax is correct
   - Check for indentation errors

4. **Manually Trigger**:
   - Go to: Repository → Actions tab
   - Click "Run workflow" button
   - Select branch and run

### Issue: Workflow Fails at Specific Step

**Symptoms**:
- Workflow starts but fails at one step
- Red X mark on specific step

**Solutions**:
1. **Click on Failed Step**:
   - View detailed error logs
   - Look for specific error message

2. **Common Step Failures**:
   - **Checkout**: Verify repository access
   - **Build React Apps**: Check app structure and dependencies
   - **Deploy**: Check FTP credentials and server access

3. **Review Logs**:
   - Expand failed step
   - Read error messages carefully
   - Look for specific file or command that failed

---

## General Debugging Tips

### Enable Debug Mode

**For Setup Script**:
```bash
DEBUG=true ./setup.sh
```

**For Workflow**:
- Add `set -x` to bash scripts in workflow
- Check "Enable debug logging" in GitHub Actions

### Check Logs

1. **GitHub Actions Logs**:
   - Repository → Actions tab
   - Click on workflow run
   - Expand each step to see logs

2. **Server Logs**:
   - Check CyberPanel logs
   - Check FTP access logs
   - Check web server error logs

### Verify Configuration

1. **GitHub Secrets**:
   - Repository → Settings → Secrets
   - Verify all secrets exist and are correct

2. **Workflow File**:
   - Check `.github/workflows/deploy.yml`
   - Verify paths and settings

3. **Server Configuration**:
   - Verify directories exist
   - Check FTP account is active
   - Verify domain is configured

---

## Getting Additional Help

If issues persist:

1. **Review Documentation**:
   - `SETUP_INSTRUCTIONS.md` - Setup guide
   - `docs/DEPLOYMENT_SETUP_GUIDE.md` - Detailed setup
   - `docs/DEPLOYMENT_INSTRUCTIONS.md` - Usage guide

2. **Check GitHub Status**:
   - https://www.githubstatus.com/

3. **Review Error Messages**:
   - Copy exact error messages
   - Search for solutions online
   - Check GitHub Actions documentation

4. **Test Components Separately**:
   - Test Git operations
   - Test FTP connection
   - Test React build locally
   - Isolate the failing component

---

**End of Troubleshooting Guide**

Most issues can be resolved by carefully reviewing error messages and verifying configuration. Take your time and check each step methodically.

