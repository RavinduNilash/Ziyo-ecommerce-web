# Deployment Guide

This guide covers different deployment options for the Ziyo E-commerce template.

## 🚀 Vercel Deployment (Recommended)

Vercel is the recommended deployment platform as it's built by the creators of Next.js and offers seamless integration.

### Step 1: Prepare Your Repository
1. Push your code to GitHub, GitLab, or Bitbucket
2. Ensure your `.env.example` file is committed
3. Never commit your actual `.env.local` file

### Step 2: Deploy to Vercel
1. Visit [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your repository
4. Vercel will automatically detect it's a Next.js project

### Step 3: Environment Variables
1. In the Vercel dashboard, go to your project settings
2. Navigate to "Environment Variables"
3. Add all the variables from your `.env.example`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Step 4: Deploy
1. Click "Deploy"
2. Vercel will build and deploy your application
3. You'll get a unique URL (e.g., `your-app.vercel.app`)

### Step 5: Custom Domain (Optional)
1. In project settings, go to "Domains"
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

## 🐳 Docker Deployment

Deploy using Docker for more control over your deployment environment.

### Dockerfile
Create a `Dockerfile` in your project root:

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
```

### Docker Compose
Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  ziyo-ecommerce:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_FIREBASE_API_KEY=${NEXT_PUBLIC_FIREBASE_API_KEY}
      - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
      - NEXT_PUBLIC_FIREBASE_PROJECT_ID=${NEXT_PUBLIC_FIREBASE_PROJECT_ID}
      - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}
      - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}
      - NEXT_PUBLIC_FIREBASE_APP_ID=${NEXT_PUBLIC_FIREBASE_APP_ID}
    restart: unless-stopped
```

### Deploy with Docker
```bash
# Build and run
docker-compose up -d

# Or build manually
docker build -t ziyo-ecommerce .
docker run -p 3000:3000 --env-file .env.local ziyo-ecommerce
```

## ☁️ Netlify Deployment

Alternative static hosting platform with good Next.js support.

### Step 1: Build Settings
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`

### Step 2: Environment Variables
Add environment variables in Netlify dashboard under "Site settings" > "Environment variables"

### Step 3: Deploy
Netlify will automatically deploy on every push to your main branch.

## 🌐 AWS Amplify

Deploy to AWS for integration with other AWS services.

### Step 1: Connect Repository
1. Go to AWS Amplify console
2. Connect your Git repository
3. Choose your branch

### Step 2: Build Settings
Amplify will auto-detect Next.js and configure build settings.

### Step 3: Environment Variables
Add environment variables in the Amplify console under "Environment variables"

## 🔧 Manual Server Deployment

Deploy to your own server with PM2 or similar process manager.

### Prerequisites
- Node.js 18+ installed
- PM2 installed globally: `npm install -g pm2`

### Steps
1. **Clone and build:**
   ```bash
   git clone your-repo
   cd ziyo-ecommerce-web
   npm install
   npm run build
   ```

2. **Create ecosystem file** (`ecosystem.config.js`):
   ```javascript
   module.exports = {
     apps: [{
       name: 'ziyo-ecommerce',
       script: 'npm',
       args: 'start',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   };
   ```

3. **Start with PM2:**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Nginx Configuration
Create `/etc/nginx/sites-available/ziyo-ecommerce`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/ziyo-ecommerce /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 📋 Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] All environment variables are configured
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors in production build
- [ ] All routes are working correctly
- [ ] Images are optimized and accessible

### ✅ Firebase Setup
- [ ] Firebase project is created and configured
- [ ] Authentication is enabled
- [ ] Firestore database is set up
- [ ] Security rules are configured
- [ ] Storage bucket is configured (if using images)

### ✅ Security
- [ ] Environment variables are not exposed in client-side code
- [ ] Firebase security rules are properly configured
- [ ] HTTPS is enabled for production
- [ ] No sensitive data in repository

### ✅ Performance
- [ ] Images are optimized
- [ ] Bundle size is acceptable
- [ ] Loading states are implemented
- [ ] Error boundaries are in place

## 🔍 Troubleshooting

### Common Issues

#### Build Failures
- Check environment variables are set correctly
- Ensure all dependencies are installed
- Verify Node.js version compatibility

#### Firebase Connection Issues
- Verify Firebase configuration
- Check API keys and project IDs
- Ensure Firebase services are enabled

#### Image Loading Issues
- Configure Next.js image domains in `next.config.js`
- Verify image URLs are accessible
- Check image optimization settings

#### Performance Issues
- Enable compression (gzip/brotli)
- Optimize images and fonts
- Use CDN for static assets
- Enable caching headers

## 📞 Support

If you encounter deployment issues:
1. Check the platform-specific documentation
2. Review error logs carefully
3. Ensure all environment variables are set
4. Test locally first with production build
5. Create an issue in the repository with deployment details

---

**Happy Deploying! 🚀**