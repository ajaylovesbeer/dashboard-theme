#!/bin/bash

# Build the app
echo "Building the application..."
npm run build

# Switch to gh-pages branch
echo "Switching to gh-pages branch..."
git checkout gh-pages

# Copy build files to the root directory
echo "Copying build files to root..."
cp -r build/* .

# Add all changes to git
echo "Adding changes to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Update GitHub Pages"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin gh-pages

# Switch back to main branch
echo "Switching back to main branch..."
git checkout main

echo "Deployment complete! Your site should be available at https://ajaylovesbeer.github.io/dashboard-theme/" 