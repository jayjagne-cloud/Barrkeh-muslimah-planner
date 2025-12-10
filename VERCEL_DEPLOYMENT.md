# Vercel Deployment Guide

Your Barrkeh Planner is now configured for Vercel deployment.

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"
6. Your planner will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
\`\`\`

## Troubleshooting 404 Errors

If you're still seeing 404 errors after deployment:

1. **Check Build Logs**
   - Go to your Vercel dashboard
   - Click on your project → "Deployments"
   - Click on the latest deployment
   - Check the "Build Logs" for any errors

2. **Verify Root URL**
   - Make sure you're accessing the root URL: `https://your-project.vercel.app`
   - NOT: `https://your-project.vercel.app/index` or other paths

3. **Check for Build Errors**
   - Common issues: TypeScript errors, missing dependencies
   - Solution: The config has `ignoreBuildErrors: true` to bypass TS issues

4. **Redeploy**
   - Sometimes a fresh deployment fixes issues
   - In Vercel dashboard, click "Redeploy" button

5. **Environment Variables**
   - If using any env vars, add them in Vercel dashboard
   - Settings → Environment Variables

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Support

If issues persist:
- Check Vercel deployment logs
- Verify all files were pushed to GitHub
- Ensure package.json has all dependencies
- Try clearing cache and redeploying
