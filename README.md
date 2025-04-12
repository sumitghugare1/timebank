# Virtual Time Bank

A platform for skill exchange using a time-credit system.

## Deployment on Vercel

This project is optimized for deployment on Vercel's free plan.

### Prerequisites

1. A Vercel account
2. MongoDB Atlas account (free tier is sufficient)
3. Node.js and npm installed locally

### Environment Variables

Set up the following environment variables in the Vercel dashboard:

- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT token signing

### Deployment Steps

1. Fork or clone this repository
2. Connect your GitHub repository to Vercel
3. Configure the environment variables
4. Deploy the project

### Detailed Deployment Guide

After pushing your code to a Git repository (GitHub, GitLab, or Bitbucket), follow these steps:

1. **Create a Vercel Account**:
   - Go to [vercel.com](https://vercel.com/) and sign up (preferably using your GitHub account)
   - Verify your email if required

2. **Import Your Repository**:
   - From the Vercel dashboard, click "Add New" → "Project"
   - Select the Git provider where your repository is hosted
   - Grant Vercel permission to access your repositories if prompted
   - Find and select your Virtual Time Bank repository

3. **Configure Project Settings**:
   - **Framework Preset**: Select "Other" since we have a custom configuration
   - **Root Directory**: Leave as default (./), or set to "/client" if you only want to deploy the frontend
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/build`

4. **Environment Variables**:
   - Click on "Environment Variables" section
   - Add the following variables:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string for JWT token signing
     - `NODE_ENV`: Set to "production"

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build process to complete (usually takes 1-2 minutes)

6. **Verify Deployment**:
   - Once deployed, Vercel will provide you with a domain (e.g., your-project.vercel.app)
   - Visit the domain to ensure your application is working correctly
   - Test core functionality like login, registration, and skill transactions

7. **Set Up a Custom Domain (Optional)**:
   - From your project dashboard, go to "Settings" → "Domains"
   - Add your custom domain and follow the verification steps

8. **Continuous Deployment**:
   - Vercel automatically sets up continuous deployment
   - Future commits to your main branch will trigger automatic deployments
   - You can configure preview deployments for pull requests in project settings

### Troubleshooting Vercel Deployment

- **Build Failures**: Check the build logs for errors. Common issues include missing dependencies or environment variables
- **API Connection Issues**: Ensure your frontend is properly configured to connect to the API endpoints
- **Database Connection**: Verify that your MongoDB Atlas cluster allows connections from all IP addresses (0.0.0.0/0)
- **CORS Errors**: Make sure your backend API allows requests from your Vercel domain

### Local Development

1. Clone the repository
2. Create a `.env` file based on `.env.example`
3. Run `npm install` in both the root and client directories
4. Start the backend with `npm run dev` from the root
5. Start the frontend with `npm start` from the client directory

### Deploying Client and Backend Separately on Vercel

#### Frontend Deployment

1. **Create a new Vercel project for the frontend**:
   - From Vercel dashboard, click "Add New" → "Project"
   - Connect to your Git repository
   - Set the following configuration:
     - **Root Directory**: `client`
     - **Framework Preset**: "Create React App"
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

2. **Environment Variables for Frontend**:
   - `REACT_APP_API_URL`: URL of your deployed backend API (e.g., https://your-backend-api.vercel.app/api)
   - `NODE_ENV`: "production"

3. **Deploy the frontend**:
   - Click "Deploy" and wait for the build to complete
   - Your frontend will be accessible at your-project.vercel.app

#### Backend Deployment

1. **Create a new Vercel project for the backend**:
   - From Vercel dashboard, click "Add New" → "Project"
   - Connect to the same Git repository
   - Set the following configuration:
     - **Root Directory**: `backend`
     - **Framework Preset**: "Other"
     - **Build Command**: `npm install`
     - **Output Directory**: Leave empty or set to `api`

2. **Environment Variables for Backend**:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string for JWT token signing
   - `NODE_ENV`: "production"
   - `CORS_ORIGIN`: Frontend URL (e.g., https://your-frontend.vercel.app)

3. **Create a `vercel.json` file in the backend directory**:
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "api/**/*.js", "use": "@vercel/node" }
     ],
     "routes": [
       { "src": "/api/(.*)", "dest": "/api/$1" }
     ]
   }
   ```

4. **Deploy the backend**:
   - Click "Deploy" and wait for the build to complete
   - Your API will be accessible at your-backend.vercel.app/api

5. **Connect Frontend and Backend**:
   - After both deployments are complete, update the frontend's `REACT_APP_API_URL` environment variable with the backend URL
   - Redeploy the frontend if needed

## Project Structure

- `/backend`: API and server code
- `/client`: React frontend
- `/backend/api`: Serverless functions for Vercel

## Features

- User authentication
- Skill listing and discovery
- Time credit transactions
- Admin dashboard
