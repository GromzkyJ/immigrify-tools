#!/bin/bash

# =============================================================================
# Automated Setup Script for GitHub Actions Auto-Deployment
# =============================================================================
# This script automates the setup of a new project with GitHub Actions
# deployment. It includes debugging, validation, and error handling.
# =============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Debug mode
DEBUG=${DEBUG:-false}

# Logging function
log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

debug() {
    if [ "$DEBUG" = "true" ]; then
        echo -e "${YELLOW}[DEBUG]${NC} $1"
    fi
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# =============================================================================
# Validation Functions
# =============================================================================

validate_git() {
    debug "Checking Git installation..."
    if ! command -v git &> /dev/null; then
        error "Git is not installed. Please install Git first."
        exit 1
    fi
    success "Git is installed: $(git --version)"
}

validate_node() {
    debug "Checking Node.js installation..."
    if ! command -v node &> /dev/null; then
        warning "Node.js is not installed. React apps won't build locally, but GitHub Actions will handle it."
    else
        success "Node.js is installed: $(node --version)"
    fi
}

validate_input() {
    local var_name=$1
    local var_value=$2
    local description=$3
    
    if [ -z "$var_value" ]; then
        error "$description is required!"
        return 1
    fi
    
    debug "$description: $var_value"
    return 0
}

validate_github_token() {
    debug "Validating GitHub token format..."
    if [[ ! "$GITHUB_TOKEN" =~ ^ghp_[a-zA-Z0-9]{36}$ ]]; then
        error "GitHub token format appears invalid. Should start with 'ghp_' and be 40+ characters."
        warning "Token format: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        return 1
    fi
    success "GitHub token format looks valid"
    return 0
}

# =============================================================================
# Setup Functions
# =============================================================================

collect_information() {
    log "Collecting project information..."
    echo ""
    
    # Project details
    read -p "Enter project name: " PROJECT_NAME
    validate_input "PROJECT_NAME" "$PROJECT_NAME" "Project name" || exit 1
    
    read -p "Enter project description (optional): " PROJECT_DESC
    PROJECT_DESC=${PROJECT_DESC:-"Auto-deployment project"}
    
    # GitHub information
    read -p "Enter GitHub username: " GITHUB_USERNAME
    validate_input "GITHUB_USERNAME" "$GITHUB_USERNAME" "GitHub username" || exit 1
    
    read -p "Enter GitHub repository name: " GITHUB_REPO
    validate_input "GITHUB_REPO" "$GITHUB_REPO" "GitHub repository name" || exit 1
    
    echo ""
    warning "You need a GitHub Personal Access Token with 'repo' and 'workflow' permissions."
    read -p "Enter GitHub Personal Access Token: " GITHUB_TOKEN
    validate_input "GITHUB_TOKEN" "$GITHUB_TOKEN" "GitHub token" || exit 1
    validate_github_token || exit 1
    
    # Server information
    echo ""
    log "Server information:"
    read -p "Enter domain name (e.g., example.com): " DOMAIN_NAME
    validate_input "DOMAIN_NAME" "$DOMAIN_NAME" "Domain name" || exit 1
    
    read -p "Enter FTP server address (usually just domain, e.g., example.com): " FTP_SERVER
    validate_input "FTP_SERVER" "$FTP_SERVER" "FTP server" || exit 1
    FTP_SERVER=${FTP_SERVER:-$DOMAIN_NAME}
    
    read -p "Enter FTP username (full username from CyberPanel): " FTP_USERNAME
    validate_input "FTP_USERNAME" "$FTP_USERNAME" "FTP username" || exit 1
    
    read -sp "Enter FTP password: " FTP_PASSWORD
    echo ""
    validate_input "FTP_PASSWORD" "$FTP_PASSWORD" "FTP password" || exit 1
    
    # Deployment paths
    echo ""
    log "Deployment paths:"
    read -p "Enter test environment path (e.g., /tools-test/): " TEST_PATH
    validate_input "TEST_PATH" "$TEST_PATH" "Test path" || exit 1
    TEST_PATH=${TEST_PATH%/}  # Remove trailing slash
    TEST_PATH=${TEST_PATH#/}  # Remove leading slash
    
    read -p "Enter production environment path (e.g., /tools/): " PROD_PATH
    validate_input "PROD_PATH" "$PROD_PATH" "Production path" || exit 1
    PROD_PATH=${PROD_PATH%/}  # Remove trailing slash
    PROD_PATH=${PROD_PATH#/}  # Remove leading slash
    
    echo ""
    success "Information collected successfully!"
}

create_github_repo() {
    log "Creating GitHub repository..."
    debug "Repository: $GITHUB_USERNAME/$GITHUB_REPO"
    
    # Check if repository already exists
    if curl -s -H "Authorization: token $GITHUB_TOKEN" \
        "https://api.github.com/repos/$GITHUB_USERNAME/$GITHUB_REPO" | grep -q "Not Found"; then
        debug "Repository does not exist, creating..."
    else
        error "Repository $GITHUB_USERNAME/$GITHUB_REPO already exists!"
        read -p "Do you want to continue with existing repository? (y/n): " CONTINUE
        if [ "$CONTINUE" != "y" ]; then
            exit 1
        fi
        return 0
    fi
    
    # Create repository
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "https://api.github.com/user/repos" \
        -d "{\"name\":\"$GITHUB_REPO\",\"description\":\"$PROJECT_DESC\",\"private\":false}")
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')
    
    if [ "$HTTP_CODE" -eq 201 ]; then
        success "GitHub repository created successfully!"
    elif [ "$HTTP_CODE" -eq 422 ]; then
        error "Repository name is invalid or already exists"
        debug "Response: $RESPONSE_BODY"
        exit 1
    else
        error "Failed to create repository. HTTP code: $HTTP_CODE"
        debug "Response: $RESPONSE_BODY"
        exit 1
    fi
}

update_workflow() {
    log "Updating workflow file with deployment paths..."
    
    WORKFLOW_FILE=".github/workflows/deploy.yml"
    
    if [ ! -f "$WORKFLOW_FILE" ]; then
        error "Workflow file not found: $WORKFLOW_FILE"
        exit 1
    fi
    
    # Update server directories in workflow
    sed -i.bak "s|server-dir: ./tools-test/|server-dir: ./${TEST_PATH}/|g" "$WORKFLOW_FILE"
    sed -i.bak "s|server-dir: ./tools/|server-dir: ./${PROD_PATH}/|g" "$WORKFLOW_FILE"
    
    # Remove backup file
    rm -f "${WORKFLOW_FILE}.bak"
    
    success "Workflow file updated"
    debug "Test path: ./${TEST_PATH}/"
    debug "Production path: ./${PROD_PATH}/"
}

initialize_git() {
    log "Initializing Git repository..."
    
    # Check if already a git repo
    if [ -d ".git" ]; then
        warning "Git repository already initialized"
        read -p "Continue with existing repo? (y/n): " CONTINUE
        if [ "$CONTINUE" != "y" ]; then
            exit 1
        fi
    else
        git init
        success "Git repository initialized"
    fi
    
    # Set remote
    if git remote get-url origin &> /dev/null; then
        log "Remote 'origin' already exists, updating..."
        git remote set-url origin "https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"
    else
        git remote add origin "https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"
    fi
    success "Git remote configured"
    
    # Create and switch to test branch
    git checkout -b test 2>/dev/null || git checkout test
    success "Test branch ready"
}

commit_and_push() {
    log "Committing and pushing to GitHub..."
    
    # Add all files
    git add .
    
    # Commit
    git commit -m "Initial setup from template" || warning "Nothing to commit"
    
    # Push with token
    git remote set-url origin "https://$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"
    
    if git push -u origin test; then
        success "Pushed to test branch"
    else
        error "Failed to push to GitHub"
        exit 1
    fi
    
    # Create and push main branch
    git checkout -b main 2>/dev/null || git checkout main
    git push -u origin main || warning "Main branch push failed (may already exist)"
    
    # Remove token from URL
    git remote set-url origin "https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"
    success "Removed token from remote URL (security)"
}

setup_github_secrets() {
    log "Setting up GitHub Secrets..."
    echo ""
    warning "GitHub Secrets must be added manually through the web interface."
    echo ""
    log "Go to: https://github.com/$GITHUB_USERNAME/$GITHUB_REPO/settings/secrets/actions"
    echo ""
    log "Add these three secrets:"
    echo ""
    echo "1. Name: FTP_SERVER"
    echo "   Value: $FTP_SERVER"
    echo ""
    echo "2. Name: FTP_USERNAME"
    echo "   Value: $FTP_USERNAME"
    echo ""
    echo "3. Name: FTP_PASSWORD"
    echo "   Value: [your password - hidden for security]"
    echo ""
    read -p "Press Enter after you've added all three secrets..."
    success "GitHub Secrets setup complete"
}

create_config_file() {
    log "Creating configuration file..."
    
    cat > config.json << EOF
{
  "project": {
    "name": "$PROJECT_NAME",
    "description": "$PROJECT_DESC"
  },
  "github": {
    "username": "$GITHUB_USERNAME",
    "repository": "$GITHUB_REPO"
  },
  "deployment": {
    "domain": "$DOMAIN_NAME",
    "test_url": "https://$DOMAIN_NAME/$TEST_PATH/",
    "production_url": "https://$DOMAIN_NAME/$PROD_PATH/",
    "test_path": "$TEST_PATH",
    "production_path": "$PROD_PATH"
  },
  "ftp": {
    "server": "$FTP_SERVER",
    "username": "$FTP_USERNAME"
  }
}
EOF
    
    # Add config.json to .gitignore
    if ! grep -q "config.json" .gitignore 2>/dev/null; then
        echo "config.json" >> .gitignore
    fi
    
    success "Configuration file created (not committed to Git for security)"
}

# =============================================================================
# Main Execution
# =============================================================================

main() {
    echo ""
    echo "============================================================================="
    echo "  GitHub Actions Auto-Deployment Setup"
    echo "============================================================================="
    echo ""
    
    # Enable debug mode if requested
    if [ "$1" = "--debug" ]; then
        DEBUG=true
        log "Debug mode enabled"
    fi
    
    # Validate prerequisites
    log "Validating prerequisites..."
    validate_git
    validate_node
    echo ""
    
    # Collect information
    collect_information
    
    # Confirm before proceeding
    echo ""
    log "Setup Summary:"
    echo "  Project: $PROJECT_NAME"
    echo "  GitHub: $GITHUB_USERNAME/$GITHUB_REPO"
    echo "  Domain: $DOMAIN_NAME"
    echo "  Test URL: https://$DOMAIN_NAME/$TEST_PATH/"
    echo "  Production URL: https://$DOMAIN_NAME/$PROD_PATH/"
    echo ""
    read -p "Continue with setup? (y/n): " CONFIRM
    
    if [ "$CONFIRM" != "y" ]; then
        log "Setup cancelled"
        exit 0
    fi
    
    echo ""
    
    # Execute setup steps
    create_github_repo
    update_workflow
    initialize_git
    create_config_file
    commit_and_push
    setup_github_secrets
    
    # Final instructions
    echo ""
    echo "============================================================================="
    success "Setup Complete!"
    echo "============================================================================="
    echo ""
    log "Next steps:"
    echo "  1. Verify GitHub Secrets are added"
    echo "  2. Check GitHub Actions: https://github.com/$GITHUB_USERNAME/$GITHUB_REPO/actions"
    echo "  3. Test deployment by pushing to test branch"
    echo "  4. Visit test URL: https://$DOMAIN_NAME/$TEST_PATH/"
    echo ""
    log "Documentation:"
    echo "  - Setup Guide: SETUP_INSTRUCTIONS.md"
    echo "  - Deployment Guide: docs/DEPLOYMENT_INSTRUCTIONS.md"
    echo "  - Troubleshooting: docs/TROUBLESHOOTING.md"
    echo ""
    success "Your project is ready for deployment!"
    echo ""
}

# Run main function
main "$@"

