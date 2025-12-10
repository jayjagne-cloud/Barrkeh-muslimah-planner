# GitHub Pages Deployment Instructions

## Method 1: Automatic Deployment (Recommended)

This method uses GitHub Actions to automatically build and deploy your planner.

### Steps:

1. **Push your code to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"

3. **The deployment will run automatically**
   - Go to the "Actions" tab to see the deployment progress
   - Once complete, your site will be live at: `https://yourusername.github.io/repository-name/`

## Method 2: Manual Build & Deploy

If you prefer to build locally and push the static files:

1. **Build the static export**
   \`\`\`bash
   npm install
   npm run build
   \`\`\`

2. **Deploy the `out` folder**
   - The `out` folder contains your static site
   - You can deploy this folder to any static hosting service

## Troubleshooting 404 Errors

### Issue: Getting 404 on GitHub Pages

**Solution 1: Check your repository settings**
- Ensure GitHub Pages is enabled
- Make sure the source is set to "GitHub Actions" or "gh-pages" branch

**Solution 2: Add .nojekyll file**
A `.nojekyll` file prevents GitHub from processing your site with Jekyll.

**Solution 3: Wait a few minutes**
GitHub Pages can take 5-10 minutes to deploy after pushing.

### Issue: Assets not loading (images, styles missing)

This happens when the base path is incorrect. The workflow above automatically sets this.

## Alternative: Deploy to Vercel (Easiest)

For the simplest deployment with zero configuration:

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Click "Deploy"

Your site will be live in minutes with a custom URL!

## Need Help?

Common issues:
- **404 on homepage**: Check that GitHub Pages is enabled in Settings
- **Styles not loading**: Make sure basePath is configured correctly
- **Build fails**: Check the Actions tab for error messages
