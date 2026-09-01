# 🚀 Complete Deployment Guide: AI Trip Planner

This guide will walk you through exactly how to take your local code, upload it to GitHub, and host it live on the internet for free using **Render.com**. 

We have already configured your codebase to act as a **single deployable web service**, meaning both your frontend (React) and backend (Node.js) will run together on one single server.

---

## Phase 1: Upload Your Code to GitHub
Before deploying, your code needs to live in a GitHub repository.

### Step 1: Initialize Git (If you haven't already)
1. Open your terminal.
2. Navigate to your project folder (`d:\Work\FSD\trip-planner`).
3. Run the following command to initialize a git repository:
   ```bash
   git init
   ```

### Step 2: Create a GitHub Repository
1. Go to [GitHub.com](https://github.com/) and log into your account.
2. Look for the **"+"** icon in the top right corner and click **New repository**.
3. Name your repository (e.g., `ai-trip-planner`).
4. Set it to **Private** (recommended, though Public is fine since your `.env` is hidden).
5. Click the green **Create repository** button.

### Step 3: Push Your Code
1. Go back to your terminal inside the `trip-planner` folder.
2. Run these commands one by one to save your code:
   ```bash
   git add .
   git commit -m "Initial commit for deployment"
   ```
3. Copy the instructions from your empty GitHub repository page that look like this, and run them:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YourUsername/ai-trip-planner.git
   git push -u origin main
   ```
*(Refresh your GitHub page. You should now see all your files!)*

---

## Phase 2: Deploy to Render.com

Now that your code is on GitHub, we will connect it to Render. Render will automatically read your `package.json`, build the app, and give you a live URL.

### Step 1: Create a Render Account
1. Go to [Render.com](https://render.com/).
2. Click **Get Started for Free** in the top right.
3. Sign up using your **GitHub account**. This makes connecting your code seamless.

### Step 2: Create a New Web Service
1. On the Render Dashboard, click the **New +** button and select **Web Service**.
2. Under "Connect a repository", click **Build and deploy from a Git repository**.
3. You will see a list of your GitHub repositories. Find the `ai-trip-planner` repository you just created and click **Connect**.

### Step 3: Configure the Server Settings
You will be taken to a configuration page. Fill it out EXACTLY like this:

- **Name**: `ai-trip-planner` (or whatever you prefer)
- **Region**: (Leave as default, e.g., Oregon)
- **Branch**: `main`
- **Root Directory**: (Leave blank)
- **Environment**: `Node`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### Step 4: Add Your Secret Environment Variables
Because your `.env` file (which holds your API keys) is hidden from GitHub for security, Render doesn't know your keys. You must give them to Render manually in Render's **Environment** tab.

1. Scroll down and click on **Advanced** or navigate to the **Environment** tab on Render.
2. Click **Add Environment Variable** to add each variable:

| Key | Value |
| :--- | :--- |
| `MONGODB_URI` | *(Paste your full MongoDB Atlas string starting with `mongodb://` or `mongodb+srv://`)* |
| `GEMINI_API_KEY` | *(Optional: Your Google Gemini API Key starting with `AIzaSy...` from Google AI Studio)* |
| `NODE_ENV` | `production` |
| `JWT_SECRET` | `my_super_secret_jwt_password_123` *(Any secret string for encrypting login tokens)* |

### Step 5: Click Deploy!
1. Scroll to the very bottom and click the green **Create Web Service** button.
2. You will be taken to a terminal screen where you can watch Render working.
   - First, it will install your backend dependencies.
   - Next, it will install your React frontend dependencies.
   - Finally, it will build your React application.
3. This process usually takes **2 to 4 minutes**. 
4. Once it says **"Live"** or **"Build Successful"**, look near the top left of the page under your app's name. You will see a URL like: `https://ai-trip-planner-xyz.onrender.com`.

### 🎉 Congratulations!
Click that link! Your AI Trip Planner is now live on the internet, and you can share the link with anyone.

---

## Troubleshooting Guide

**1. The page loads, but I can't log in or generate trips.**
- Check your MongoDB Atlas Network Access. You must allow connections from anywhere (`0.0.0.0/0`) because Render's server IPs change dynamically.
- Check Render's "Logs" tab. If you typed your `MONGODB_URI` wrong in the Environment Variables, it will show an error here.

**2. The deployment failed during the build process.**
- Go to the "Logs" tab in Render and scroll up to see the red error text. 
- Usually, this happens if there is a typo in the `package.json` or a missing dependency. Since your app is already running locally, it should build perfectly.

**3. I made a change to my code locally. How do I update the live website?**
1. In your local terminal, run:
   ```bash
   git add .
   git commit -m "Updated some features"
   git push origin main
   ```
2. Because Render is linked to your GitHub, it will **automatically detect the push** and deploy your new changes within a few minutes! You don't need to do anything else.
