#!/bin/bash
# SuiteCRM Permissions Setup Script
# Run this once after deployment to set proper file permissions

echo "Setting up SuiteCRM file permissions..."

# Navigate to SuiteCRM directory
CRM_DIR="/home/immigrify.ca/public_html/tools-test/crm"

# Check if directory exists
if [ ! -d "$CRM_DIR" ]; then
    echo "Error: Directory $CRM_DIR not found!"
    echo "Please update CRM_DIR in this script to match your actual path."
    exit 1
fi

cd "$CRM_DIR" || exit 1

# Create required directories if they don't exist
mkdir -p cache custom data upload
mkdir -p custom/install

# Set ownership (adjust user/group if needed)
# Common: www-data, apache, nginx, or your domain user
WEB_USER="www-data"
WEB_GROUP="www-data"

# Set ownership on writable directories
chown -R "$WEB_USER:$WEB_GROUP" cache custom data upload

# Set permissions
# Directories: 775 (rwxrwxr-x)
# Files: 644 (rw-r--r--)
chmod -R 775 cache custom data upload
find cache custom data upload -type f -exec chmod 664 {} \;

# Set permissions on .htaccess
if [ -f ".htaccess" ]; then
    chmod 644 .htaccess
    chown "$WEB_USER:$WEB_GROUP" .htaccess
fi

echo "Permissions set successfully!"
echo ""
echo "Verification:"
ls -ld cache custom data upload
echo ""
echo "If you see 'drwxrwxr-x' and ownership by $WEB_USER, permissions are correct."
echo ""
echo "Next step: Access https://immigrify.ca/tools-test/crm/install.php to run the installer."

