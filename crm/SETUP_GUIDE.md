# SuiteCRM Setup Guide - Quick Start

## ✅ Automated Steps (Already Done)

The following have been automated and will happen automatically when you push to GitHub:

1. ✅ SuiteCRM downloaded and configured
2. ✅ `.htaccess` created with subdirectory rewrite rules
3. ✅ Composer dependencies will be installed during deployment
4. ✅ All files will be deployed to the server

## 📋 Manual Steps (You Need to Do - One Time Only)

### Step 1: Set File Permissions (2 minutes)

**Choose ONE method:**

#### Method A: Via SSH (Fastest)
```bash
cd /home/immigrify.ca/public_html/tools-test/crm/
chmod -R 775 cache custom data upload
chown -R www-data:www-data cache custom data upload
```

#### Method B: Via CyberPanel File Manager
1. Log into CyberPanel
2. Go to File Manager
3. Navigate to: `public_html/tools-test/crm/`
4. For each folder (`cache`, `custom`, `data`, `upload`):
   - Right-click → Permissions → Set to `775`
   - Right-click → Change Owner → Set to `www-data:www-data`

#### Method C: Run Setup Script (If you have SSH)
```bash
cd /home/immigrify.ca/public_html/tools-test/crm/
bash setup-permissions.sh
```

### Step 2: Run Web Installer (5 minutes)

1. **Open your browser** and go to:
   ```
   https://immigrify.ca/tools-test/crm/install.php
   ```

2. **Enter Database Information:**
   - Database Name: `immi_immigrify_suitecrm`
   - Database Username: `immi_immigrify_crm_user`
   - Database Password: `gromyko30`
   - Database Host: `localhost`

3. **Site Configuration:**
   - Site URL: `https://immigrify.ca/tools-test/crm/` (should be pre-filled)
   - System Name: `SuiteCRM` (or your preference)

4. **Create Admin Account:**
   - Admin Username: (choose your username)
   - Admin Password: (choose a strong password)
   - Confirm Password: (re-enter)

5. **Complete Installation:**
   - Click through the remaining steps
   - Wait for installation to complete

6. **Access SuiteCRM:**
   - After installation, you'll be redirected to login
   - Use your admin credentials to log in

## 🎯 What to Expect

### During Deployment
- GitHub Actions will install Composer dependencies
- All SuiteCRM files will be uploaded
- `.htaccess` will be configured automatically
- Deployment takes 5-10 minutes

### After Deployment
- Files will be at: `immigrify.ca/tools-test/crm/`
- You'll see the SuiteCRM installer when you visit the URL
- Follow Step 2 above to complete installation

## 🔧 Troubleshooting

### If installer shows 404 errors:
1. ✅ Check that deployment completed successfully
2. ✅ Verify `.htaccess` file exists in `crm/` folder
3. ✅ Check file permissions (Step 1)

### If installer gets stuck on "Checking Environment":
1. ✅ Set file permissions (Step 1) - this is usually the issue
2. ✅ Check browser console (F12) for JavaScript errors
3. ✅ Try a different browser or incognito mode

### If you see "Composer autoloader not found":
- This should be fixed automatically now
- If you still see it, check GitHub Actions logs to verify Composer install completed

## 📝 Notes

- **Test Environment**: `immigrify.ca/tools-test/crm/`
- **Production Environment**: `immigrify.ca/tools/crm/` (after merging to main)
- **Database**: Already created and ready to use
- **Configuration**: Pre-configured for subdirectory installation

## ✅ Success Checklist

After completing both manual steps, you should have:
- ✅ SuiteCRM accessible at `https://immigrify.ca/tools-test/crm/`
- ✅ Ability to log in with your admin credentials
- ✅ Full SuiteCRM functionality working

---

**Need Help?** Check the main `README.md` in the project root for more details.

