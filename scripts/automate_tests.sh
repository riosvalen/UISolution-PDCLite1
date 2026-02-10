#!/bin/bash

# Configuration
# It is recommended to use an absolute path for PROJECT_DIR
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$PROJECT_DIR/.env.automation"

# Load environment variables if file exists
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

# Variables (can be overridden by .env.automation or environment)
WEBHOOK_URL="${WEBHOOK_URL:-}" 
TEST_ENV="${1:-${TEST_ENV:-TST}}" # Prioritiza el primer argumento del script
REPO_BRANCH="${REPO_BRANCH:-main}"

# Convertir TEST_ENV a minúsculas para nombres de carpetas
ENV_LOWER=$(echo "$TEST_ENV" | tr '[:upper:]' '[:lower:]')
REPORT_DIR="jsonlogs/report_$ENV_LOWER"

# Fallback to Public IP if REPORT_BASE_URL is not set
if [ -z "$REPORT_BASE_URL" ]; then
    PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)
    if [ -n "$PUBLIC_IP" ]; then
        REPORT_BASE_URL="http://$PUBLIC_IP"
    fi
fi

# Logging
LOG_FILE="$PROJECT_DIR/automation_$ENV_LOWER.log"
exec > >(tee -a "$LOG_FILE") 2>&1

echo "--- Starting Automation [$TEST_ENV]: $(date) ---"

# Navigate to project
cd "$PROJECT_DIR" || { echo "Failed to navigate to $PROJECT_DIR"; exit 1; }

# Pull latest changes
echo "Pulling latest changes from $REPO_BRANCH..."
git pull origin "$REPO_BRANCH" || { echo "Git pull failed"; exit 1; }

# Install dependencies
echo "Installing dependencies..."
npm install || { echo "npm install failed"; exit 1; }

# Clean previous report for this environment
rm -rf "$REPORT_DIR"

# Run tests
echo "Running tests in $TEST_ENV environment..."
# Dejamos screenshots pero apagamos video que es lo más pesado para la RAM
npm run cypress:run:all -- -e ENV="$TEST_ENV" --config video=false,screenshotOnRunFailure=true
TEST_EXIT_CODE=$?

# Generate Report
echo "Generating HTML report for $TEST_ENV..."
node cucumber-html-report.js "jsonlogs" "$REPORT_DIR"

# Prepare Notification
if [ $TEST_EXIT_CODE -eq 0 ]; then
    STATUS="SUCCESS ✅"
else
    STATUS="FAILED ❌"
fi

echo "Test execution finished [$TEST_ENV] with status: $STATUS"

# Send Notification if WEBHOOK_URL is set
if [ -n "$WEBHOOK_URL" ]; then
    echo "Sending notification..."
    SUMMARY="Cypress E2E Tests [$TEST_ENV]: $STATUS | Date: $(date)"
    
    # Add report link if configured
    if [ -n "$REPORT_BASE_URL" ]; then
        SUMMARY="$SUMMARY\n📝 Reporte: $REPORT_BASE_URL/report_$ENV_LOWER/index.html"
    fi
    
    # Google Chat simple text format
    curl -s -X POST -H 'Content-type: application/json; charset=UTF-8' \
         --data "{\"text\": \"$SUMMARY\"}" "$WEBHOOK_URL" > /dev/null
else
    echo "WEBHOOK_URL not set. Skipping notification."
fi

echo "--- Automation Finished [$TEST_ENV]: $(date) ---"
echo ""
