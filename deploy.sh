#!/bin/bash

# We3Studio Deployment Script
# This script helps you deploy your We3Studio application

echo "🚀 We3Studio Deployment Script"
echo "================================"

# Check if git is configured
if ! git config --global user.name > /dev/null 2>&1; then
    echo "⚠️  Git not configured. Please run:"
    echo "   git config --global user.name 'Your Name'"
    echo "   git config --global user.email 'your.email@example.com'"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo "📦 Project files found: ✅"

# Check git status
echo ""
echo "🔍 Checking git status..."
git status --porcelain

if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Uncommitted changes found. Committing..."
    git add .
    git commit -m "Update project files for deployment"
    echo "✅ Changes committed"
else
    echo "✅ No uncommitted changes"
fi

# Check if remote is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Setting up remote origin..."
    git remote add origin https://github.com/gowrishankar10/photoprintingsite.git
    echo "✅ Remote origin set"
fi

echo ""
echo "🚀 Ready to push to GitHub!"
echo "================================"
echo ""
echo "To complete the push, run:"
echo "git push -u origin main"
echo ""
echo "When prompted for credentials:"
echo "Username: gowrishankar10"
echo "Password: [Your Personal Access Token]"
echo ""
echo "📋 To get a Personal Access Token:"
echo "1. Go to GitHub.com → Settings → Developer settings"
echo "2. Personal access tokens → Tokens (classic)"
echo "3. Generate new token → Select 'repo' permissions"
echo "4. Copy the token and use it as password"
echo ""
echo "🌐 After pushing, follow the deployment guide:"
echo "📖 See QUICK_DEPLOY.md for hosting instructions"
echo ""
echo "🎯 Recommended hosting:"
echo "Frontend: Vercel (vercel.com)"
echo "Backend: Heroku (heroku.com)"
echo "Database: MongoDB Atlas (cloud.mongodb.com)"
echo ""
echo "✨ Good luck with your deployment!"
