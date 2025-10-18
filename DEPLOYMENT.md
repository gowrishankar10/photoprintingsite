# Deployment Guide for We3Studio

## 🚀 GitHub Push Instructions

Since we're having authentication issues, here are the steps to complete the push to GitHub:

### Option 1: Using GitHub CLI (Recommended)
```bash
# Install GitHub CLI if not already installed
# macOS: brew install gh
# Windows: winget install GitHub.cli
# Linux: sudo apt install gh

# Authenticate with GitHub
gh auth login

# Push to GitHub
cd /Users/gowrish/Documents/uploaddynamic
git push -u origin main
```

### Option 2: Using Personal Access Token
```bash
# Go to GitHub.com → Settings → Developer settings → Personal access tokens
# Generate a new token with 'repo' permissions
# Copy the token

cd /Users/gowrish/Documents/uploaddynamic
git remote set-url origin https://github.com/gowrishankar10/photoprintingsite.git
git push -u origin main
# When prompted for username: gowrishankar10
# When prompted for password: paste your personal access token
```

### Option 3: Manual Upload
1. Go to https://github.com/gowrishankar10/photoprintingsite.git
2. Click "uploading an existing file"
3. Drag and drop all files from `/Users/gowrish/Documents/uploaddynamic`
4. Commit the changes

## 🌐 Hosting Options

### Frontend Hosting (Angular)

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Build the frontend
cd photoprintx/frontend
ng build --configuration production

# Deploy to Vercel
vercel --prod
```

#### Option 2: Netlify
```bash
# Build the frontend
cd photoprintx/frontend
ng build --configuration production

# Deploy to Netlify
# Upload the dist/ folder to Netlify
```

#### Option 3: GitHub Pages
```bash
# Install angular-cli-ghpages
npm install -g angular-cli-ghpages

# Build and deploy
cd photoprintx/frontend
ng build --configuration production --base-href "https://gowrishankar10.github.io/photoprintingsite/"
npx angular-cli-ghpages --dir=dist/photoprintx-frontend
```

### Backend Hosting (Node.js)

#### Option 1: Heroku
```bash
# Install Heroku CLI
# Create a Procfile in photoprintx/backend/
echo "web: npm start" > photoprintx/backend/Procfile

# Login to Heroku
heroku login

# Create Heroku app
cd photoprintx/backend
heroku create we3studio-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your_mongodb_connection_string
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set CLOUDINARY_CLOUD_NAME=your_cloudinary_name
heroku config:set CLOUDINARY_API_KEY=your_cloudinary_key
heroku config:set CLOUDINARY_API_SECRET=your_cloudinary_secret
heroku config:set RAZORPAY_KEY_ID=your_razorpay_key
heroku config:set RAZORPAY_KEY_SECRET=your_razorpay_secret

# Deploy
git subtree push --prefix=photoprintx/backend heroku main
```

#### Option 2: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy backend
cd photoprintx/backend
railway deploy
```

#### Option 3: DigitalOcean App Platform
1. Connect your GitHub repository
2. Select the backend folder
3. Configure environment variables
4. Deploy

## 🔧 Environment Variables Setup

### Backend Environment Variables
Create a `.env` file in `photoprintx/backend/`:
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/we3studio?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Frontend Environment Variables
Update `photoprintx/frontend/src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.herokuapp.com/api'
};
```

## 📱 Database Setup

### MongoDB Atlas (Recommended)
1. Go to https://cloud.mongodb.com/
2. Create a new cluster
3. Get the connection string
4. Update MONGO_URI in environment variables

### Local MongoDB
```bash
# Install MongoDB locally
# macOS: brew install mongodb-community
# Ubuntu: sudo apt install mongodb
# Windows: Download from mongodb.com

# Start MongoDB
mongod

# Use connection string: mongodb://localhost:27017/we3studio
```

## 🔐 Security Checklist

- [ ] Change default admin credentials
- [ ] Use strong JWT secret
- [ ] Enable HTTPS in production
- [ ] Set up CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Set up proper error handling
- [ ] Implement rate limiting

## 🚀 Quick Start Commands

### Development
```bash
# Start backend
cd photoprintx/backend
npm install
npm start

# Start frontend (in another terminal)
cd photoprintx/frontend
npm install
ng serve
```

### Production Build
```bash
# Build frontend
cd photoprintx/frontend
ng build --configuration production

# Build backend
cd photoprintx/backend
npm install --production
```

## 📊 Monitoring & Analytics

### Recommended Tools
- **Frontend**: Google Analytics, Hotjar
- **Backend**: PM2 for process management
- **Database**: MongoDB Atlas monitoring
- **Performance**: Lighthouse, WebPageTest

## 🆘 Troubleshooting

### Common Issues
1. **CORS Errors**: Update CORS settings in backend
2. **Database Connection**: Check MongoDB URI
3. **Build Errors**: Clear node_modules and reinstall
4. **Authentication**: Verify JWT secret and token expiration

### Support
- Check the README.md for detailed setup instructions
- Review the GitHub repository for latest updates
- Contact support through the contact page

---

**Next Steps:**
1. Complete the GitHub push using one of the methods above
2. Set up hosting for both frontend and backend
3. Configure environment variables
4. Test the deployed application
5. Set up monitoring and analytics
