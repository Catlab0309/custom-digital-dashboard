#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Create a temporary directory for gh-pages
echo "Preparing gh-pages branch..."
rm -rf gh-pages-temp
mkdir gh-pages-temp
cp -r dist/* gh-pages-temp/

# Switch to gh-pages branch
git checkout --orphan gh-pages-temp
git rm -rf .
cp -r gh-pages-temp/* .
rm -rf gh-pages-temp

# Add and commit
git add .
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push -f origin gh-pages-temp:gh-pages

# Switch back to main
git checkout main
git branch -D gh-pages-temp

echo "Deployment complete!"
