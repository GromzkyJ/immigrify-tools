# SuiteCRM for immigrify.ca

SuiteCRM installation in subdirectory: `immigrify.ca/tools-test/crm/` (test) or `immigrify.ca/tools/crm/` (production)

## Pre-Installation Checklist

### Database Credentials (Already Created)
- **Database Name**: `immi_immigrify_suitecrm`
- **Database Username**: `immi_immigrify_crm_user`
- **Database Password**: `gromyko30`
- **Database Host**: `localhost`

### Required Manual Steps (One-Time Setup)

#### Step 1: Set File Permissions (2 minutes)

**Option A: Via SSH (Recommended)**
```bash
cd /home/immigrify.ca/public_html/tools-test/crm/
chmod -R 775 cache custom data upload
chown -R www-data:www-data cache custom data upload
```

**Option B: Via CyberPanel File Manager**
1. Navigate to `public_html/tools-test/crm/`
2. Right-click each folder → Permissions:
   - `cache/` → 775
   - `custom/` → 775
   - `data/` → 775
   - `upload/` → 775
3. Set ownership to `www-data:www-data` for all four folders

#### Step 2: Run Web Installer (5 minutes)

1. **Access Installer**: `https://immigrify.ca/tools-test/crm/install.php`

2. **Enter Database Credentials**:
   - Database Name: `immi_immigrify_suitecrm`
   - Database Username: `immi_immigrify_crm_user`
   - Database Password: `gromyko30`
   - Database Host: `localhost`

3. **Site Configuration**:
   - Site URL: `https://immigrify.ca/tools-test/crm/`
   - System Name: SuiteCRM (or your preference)

4. **Admin Account**: Create your admin username and password

5. **Complete Installation**: Follow the installer to completion

## Post-Installation

After installation completes:
- SuiteCRM will be accessible at: `https://immigrify.ca/tools-test/crm/`
- Login with your admin credentials
- Configuration files will be created automatically

## File Structure

- **Core Files**: All SuiteCRM files in this directory
- **Configuration**: `config.php` and `config_override.php` (created during install)
- **Custom Directory**: `custom/` (excluded from Git for security)
- **Cache/Upload**: Server-specific, excluded from Git

## Deployment

- **Test**: Push to `test` branch → Deploys to `/tools-test/crm/`
- **Production**: Push to `main` branch → Deploys to `/tools/crm/`

## Troubleshooting

### If installer shows 404 errors:
1. Check that all files were deployed
2. Verify `.htaccess` exists and has correct RewriteBase
3. Check file permissions on `cache/`, `custom/`, `data/`, `upload/`

### If installer gets stuck:
1. Check file permissions (Step 1 above)
2. Verify database credentials are correct
3. Check PHP error logs in CyberPanel

## Notes

- This installation is configured for subdirectory deployment
- `.htaccess` includes proper rewrite rules for subdirectory
- Base URL is pre-configured for `immigrify.ca/tools-test/crm/`
- All Composer dependencies are installed automatically during deployment
