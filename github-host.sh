#!/bin/bash

echo "🚀 We3Studio - GitHub Hosting Setup"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo "📦 Project files found: ✅"
echo ""

# Check git status
echo "🔍 Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Committing latest changes..."
    git add .
    git commit -m "Add GitHub Pages deployment configuration

- GitHub Actions workflow for automatic deployment
- Angular build configuration for GitHub Pages
- Package configuration for ghpages deployment
- Ready for GitHub Pages hosting"
    echo "✅ Changes committed"
else
    echo "✅ No uncommitted changes"
fi

echo ""
echo "🚀 READY TO PUSH TO GITHUB!"
echo "=========================="
echo ""
echo "📋 STEP 1: Push to GitHub"
echo "Run this command:"
echo "git push -u origin main"
echo ""
echo "🔑 Authentication Required:"
echo "Username: gowrishankar10"
echo "Password: [Your Personal Access Token]"
echo ""
echo "📋 To get Personal Access Token:"
echo "1. Go to GitHub.com → Settings → Developer settings"
echo "2. Personal access tokens → Tokens (classic)"
echo "3. Generate new token → Select 'repo' permissions"
echo "4. Copy the token and use it as password"
echo ""
echo "📋 STEP 2: Enable GitHub Pages"
echo "After pushing, go to:"
echo "https://github.com/gowrishankar10/photoprintingsite/settings/pages"
echo ""
echo "Configure GitHub Pages:"
echo "1. Source: Deploy from a branch"
echo "2. Branch: gh-pages"
echo "3. Folder: / (root)"
echo "4. Save"
echo ""
echo "📋 STEP 3: Enable GitHub Actions"
echo "Go to:"
echo "https://github.com/gowrishankar10/photoprintingsite/actions"
echo ""
echo "Enable GitHub Actions if prompted"
echo "The workflow will automatically deploy your app"
echo ""
echo "🌐 Your app will be live at:"
echo "https://gowrishankar10.github.io/photoprintingsite/"
echo ""
echo "⏱️  Deployment takes 2-3 minutes after push"
echo ""
echo "✨ Good luck! Your We3Studio will be live soon!"
