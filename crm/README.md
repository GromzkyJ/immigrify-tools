# SuiteCRM for immigrify.ca

This folder contains SuiteCRM, an open-source Customer Relationship Management (CRM) system.

## Installation

### Database Credentials

The database has already been created in CyberPanel. Use these credentials during installation:

- **Database Name**: `immi_immigrify_suitecrm`
- **Database Username**: `immi_immigrify_crm_user`
- **Database Password**: `gromyko30`
- **Database Host**: `localhost`

### Installation Steps

1. **Access the Installer**:
   - Test Environment: `https://immigrify.ca/tools-test/crm/install.php`
   - Production Environment: `https://immigrify.ca/tools/crm/install.php`

2. **Run the Web Installer**:
   - Follow the on-screen installation wizard
   - Enter the database credentials listed above
   - Complete all installation steps
   - Set up your admin account

3. **Post-Installation**:
   - The installer will create necessary configuration files
   - Custom files will be stored in the `custom/` directory
   - Configuration files (`config.php`, `config_override.php`) are excluded from Git

## File Structure

- **Core Files**: All SuiteCRM core files are in this directory
- **Custom Directory**: Custom modifications go in `custom/` (excluded from Git)
- **Configuration**: `config.php` and `config_override.php` are excluded from Git (server-specific)

## Version Control

- All core SuiteCRM files are version controlled
- Custom modifications in `custom/` are excluded (server-specific)
- Configuration files are excluded (contain sensitive data)
- Cache and upload directories are excluded

## Deployment

This CRM is deployed via GitHub Actions:
- Push to `test` branch → Deploys to `/tools-test/crm/`
- Push to `main` branch → Deploys to `/tools/crm/`

## Making Custom Changes

1. Make changes to core files (if needed)
2. Commit changes to Git
3. Push to test branch first
4. Test on test environment
5. Merge to main for production

**Note**: Custom modules and extensions should be placed in the `custom/` directory, which is excluded from version control for security reasons.

## Documentation

- Official SuiteCRM Documentation: https://docs.suitecrm.com/
- SuiteCRM Community: https://community.suitecrm.com/
