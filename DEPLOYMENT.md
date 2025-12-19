# Deployment Guide

This guide will help you deploy your Reddit Clone application with the backend on Railway and the frontend on Vercel.

## Prerequisites

Before you begin, make sure you have:
- A GitHub account with your code pushed to a repository
- A Railway account (sign up at [railway.app](https://railway.app))
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your MongoDB connection string
- Your Groq API key (for AI features)

---

## Part 1: Deploy Backend to Railway

### Step 1: Create a New Project on Railway

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository: `reddit-clone-web25`
5. Railway will detect your project automatically

### Step 2: Configure Root Directory

Since your backend is in the `server` folder:

1. In your Railway project, click on your service
2. Go to **Settings**
3. Find **"Root Directory"** and set it to: `server`
4. Click **"Save"**

### Step 3: Add Environment Variables

1. In your Railway service, click on **Variables** tab
2. Add the following environment variables (click **"New Variable"** for each):

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_long_random_secret_string
   GROQ_API_KEY=your_groq_api_key
   FRONTEND_URL=https://your-app.vercel.app
   ```

   > **Note:** You'll update `FRONTEND_URL` after deploying to Vercel in Part 2

3. Railway automatically provides the `PORT` variable, so you don't need to add it

### Step 4: Deploy

1. Railway will automatically deploy your backend
2. Once deployed, click on your service to see the deployment URL
3. It will look like: `https://your-app.railway.app`
4. **Save this URL** - you'll need it for the frontend configuration

### Step 5: Verify Backend Deployment

1. Open your Railway URL in a browser
2. You should see: `{"message": "API is running"}`
3. If you see this, your backend is successfully deployed! 🎉

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create a New Project on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `reddit-clone-web25`

### Step 2: Configure Root Directory

Since your frontend is in the `client` folder:

1. In the **"Configure Project"** section, expand **"Build and Output Settings"**
2. Set **"Root Directory"** to: `client`
3. Vercel will automatically detect Vite settings

### Step 3: Add Environment Variable

1. Scroll down to **"Environment Variables"**
2. Add the following variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-app.railway.app/api`
   
   > **Important:** Replace `your-app.railway.app` with your actual Railway URL from Part 1, Step 4
   
   > **Note:** Make sure to include `/api` at the end!

3. Click **"Add"**

### Step 4: Deploy

1. Click **"Deploy"**
2. Vercel will build and deploy your frontend
3. Once completed, you'll get a URL like: `https://your-app.vercel.app`

### Step 5: Update Backend CORS Configuration

Now that you have your Vercel URL, update your Railway backend:

1. Go back to [railway.app](https://railway.app)
2. Open your backend project
3. Go to **Variables** tab
4. Update the `FRONTEND_URL` variable to your Vercel URL:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Railway will automatically redeploy with the new configuration

### Step 6: Test Your Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Test the following features:
   - ✅ User registration
   - ✅ User login
   - ✅ Creating a post
   - ✅ Commenting on posts
   - ✅ Joining communities
   - ✅ AI chat feature
   - ✅ User profile and avatar upload

---

## Part 3: Local Development Setup

To continue developing locally after deployment:

### Backend (Server)

1. Navigate to the `server` folder
2. Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```
3. Fill in your environment variables in `.env`
4. Run the development server:
   ```powershell
   npm run dev
   ```

### Frontend (Client)

1. Navigate to the `client` folder
2. The `.env.local` file should already be configured with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
3. If it doesn't exist, create it with the above content
4. Run the development server:
   ```powershell
   npm run dev
   ```

---

## Troubleshooting

### Common Issues

**Issue: CORS Error**
- **Solution:** Make sure `FRONTEND_URL` in Railway matches your Vercel URL exactly (no trailing slash)

**Issue: API calls failing on Vercel**
- **Solution:** Check that `VITE_API_URL` in Vercel includes `/api` at the end

**Issue: 404 on page refresh in Vercel**
- **Solution:** The `vercel.json` file should handle this, make sure it's in the `client` folder

**Issue: Railway build failing**
- **Solution:** Verify the Root Directory is set to `server` in Railway settings

**Issue: Environment variables not working**
- **Solution:** Make sure to redeploy after adding/updating environment variables in both Railway and Vercel

### Viewing Logs

**Railway:**
- Go to your service → **Deployments** tab → Click on latest deployment → View logs

**Vercel:**
- Go to your project → **Deployments** tab → Click on deployment → **View Function Logs**

---

## Additional Configuration

### Custom Domain (Optional)

**Railway:**
1. Go to your service → **Settings** → **Domains**
2. Click **"Generate Domain"** or add a custom domain

**Vercel:**
1. Go to your project → **Settings** → **Domains**
2. Add your custom domain and follow the DNS configuration steps

### Automatic Deployments

Both Railway and Vercel support automatic deployments:
- Push to your `main` branch to trigger automatic deployment
- Both platforms will rebuild and redeploy automatically

---

## Summary

You now have:
- ✅ Backend running on Railway
- ✅ Frontend running on Vercel
- ✅ Proper environment variable configuration
- ✅ CORS configured correctly
- ✅ Local development setup

Your Reddit Clone is now live! 🚀

**Backend URL:** `https://your-app.railway.app`  
**Frontend URL:** `https://your-app.vercel.app`
