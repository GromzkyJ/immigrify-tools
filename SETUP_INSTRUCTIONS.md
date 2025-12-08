# Setup Instructions - Immigrify.ca Tools

## 🎯 Purpose of This Document

This document provides **reference information** about how the immigrify.ca auto-deployment system was set up. This project is already configured and ready to use.

**Note**: This project is already set up and working. Use this document as a reference only.

---

## 📋 Current Configuration

### Project Information
- **Project Name**: immigrify-tools
- **Domain**: immigrify.ca
- **GitHub Repository**: https://github.com/GromzkyJ/immigrify-tools
- **GitHub Username**: GromzkyJ

### Deployment Environments
- **Test Environment**: 
  - Branch: `test`
  - URL: `https://immigrify.ca/tools-test/`
  - Server Path: `/tools-test/`
  
- **Production Environment**:
  - Branch: `main`
  - URL: `https://immigrify.ca/tools/`
  - Server Path: `/tools/`

### FTP Configuration
- **FTP Server**: Server IP address (bypasses Cloudflare)
- **FTP Username**: `admin_immigrify_deploy`
- **FTP Root**: `/public_html`
- **Credentials**: Stored in GitHub Secrets

### GitHub Secrets
The following secrets are configured in GitHub:
- `FTP_SERVER` - Server IP address
- `FTP_USERNAME` - Full FTP username
- `FTP_PASSWORD` - FTP password

---

## ✅ Current Status

This project is **fully set up and operational**:

- ✅ GitHub repository created and connected
- ✅ Test and main branches exist
- ✅ GitHub Secrets configured
- ✅ Server directories created (`tools-test` and `tools`)
- ✅ GitHub Actions workflow configured
- ✅ Auto-deployment working

---

## 🚀 Daily Usage

For daily usage instructions, see:
- **`docs/DEPLOYMENT_INSTRUCTIONS.md`** - Complete daily usage guide ⭐
- **`QUICK_START.md`** - Quick reference

---

## 📚 Documentation

- `README.md` - Project overview
- `QUICK_START.md` - Quick reference guide
- `docs/DEPLOYMENT_INSTRUCTIONS.md` - **Daily usage guide** ⭐
- `docs/DEPLOYMENT_SETUP_GUIDE.md` - Technical details (reference)
- `docs/TROUBLESHOOTING.md` - Common issues and solutions

---

## 🔍 Verification

To verify the setup is working:

1. **Check GitHub Repository**:
   - Repository: https://github.com/GromzkyJ/immigrify-tools
   - Branches: `test` and `main` exist
   - Workflow: `.github/workflows/deploy.yml` is present

2. **Check GitHub Secrets**:
   - Go to: https://github.com/GromzkyJ/immigrify-tools/settings/secrets/actions
   - Verify: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` exist

3. **Check Server**:
   - Test directory: `public_html/tools-test/` exists
   - Production directory: `public_html/tools/` exists

4. **Test Deployment**:
   - Push to `test` branch → Auto-deploys to `https://immigrify.ca/tools-test/`
   - Push to `main` branch → Auto-deploys to `https://immigrify.ca/tools/`

---

## 🐛 Troubleshooting

If you encounter issues:

1. Check `docs/TROUBLESHOOTING.md` for common issues
2. Review GitHub Actions logs: https://github.com/GromzkyJ/immigrify-tools/actions
3. Verify GitHub Secrets are correct
4. Check server directories exist in CyberPanel

---

## 📝 Notes

- This project uses server IP address for FTP (bypasses Cloudflare)
- Always test on `test` branch before deploying to `main`
- Each app should be in its own folder
- React apps require `package.json` with `"homepage": "."`

---

**For daily usage, see `docs/DEPLOYMENT_INSTRUCTIONS.md`**
