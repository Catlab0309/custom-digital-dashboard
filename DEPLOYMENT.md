# Deployment Guide

This guide explains how to deploy the Professional Dashboard Builder to various hosting platforms.

## 🏗️ Build Process

First, create a production build:

```bash
npm run build
```

This creates a `dist/` directory with optimized static files ready for deployment.

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

1. **Via Git Integration**
   - Push your code to GitHub/GitLab/Bitbucket
   - Connect your repository to Netlify
   - Set build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Deploy automatically on every push

2. **Via Drag & Drop**
   - Run `npm run build` locally
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag the `dist` folder to deploy instantly

### Option 2: Vercel

1. **Via CLI**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Via Git Integration**
   - Connect your repository to Vercel
   - Vercel auto-detects Vite projects
   - Deploys automatically on push

### Option 3: GitHub Pages

1. **Setup GitHub Actions**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Configure Repository**
   - Go to Settings > Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch

### Option 4: Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

3. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Option 5: AWS S3 + CloudFront

1. **Create S3 Bucket**
   - Enable static website hosting
   - Upload `dist` contents

2. **Setup CloudFront**
   - Create distribution pointing to S3
   - Configure custom error pages for SPA routing

## 🔧 Environment Configuration

### Environment Variables

Create `.env.production` for production-specific settings:

```env
VITE_APP_TITLE=Professional Dashboard Builder
VITE_API_URL=https://api.yourdomain.com
```

### Build Optimization

For better performance, consider:

1. **Code Splitting**
   ```javascript
   // vite.config.js
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             charts: ['recharts'],
             ui: ['lucide-react']
           }
         }
       }
     }
   })
   ```

2. **Asset Optimization**
   - Compress images before deployment
   - Use WebP format for better compression
   - Enable gzip compression on your server

## 🚀 Post-Deployment

### Testing Checklist

- [ ] Welcome screen loads correctly
- [ ] Theme switching works
- [ ] Widget library opens
- [ ] Drag & drop functionality works
- [ ] Data persists in localStorage
- [ ] All widgets render properly
- [ ] Responsive design works on mobile
- [ ] Performance is acceptable (< 3s load time)

### Monitoring

Consider adding:
- Google Analytics for usage tracking
- Error monitoring (Sentry, LogRocket)
- Performance monitoring (Web Vitals)

## 🔒 Security Considerations

- Enable HTTPS (most platforms do this automatically)
- Set appropriate CSP headers
- Consider rate limiting for API endpoints
- Validate all user inputs

## 📊 Performance Tips

- Use a CDN for static assets
- Enable compression (gzip/brotli)
- Implement proper caching headers
- Monitor Core Web Vitals

## 🆘 Troubleshooting

### Common Issues

1. **Blank page after deployment**
   - Check browser console for errors
   - Verify all assets are loading correctly
   - Ensure proper base URL configuration

2. **Routing issues**
   - Configure server for SPA routing
   - Add proper redirects for 404s

3. **Performance issues**
   - Check bundle size with `npm run build`
   - Implement code splitting
   - Optimize images and assets

### Getting Help

- Check the main README.md for general usage
- Review browser console for errors
- Test locally with `npm run preview`
- Verify all dependencies are installed

---

**Happy Deploying! 🚀**
