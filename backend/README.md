# Render Deployment Configuration

This backend is configured to deploy on Render.com

## Quick Deploy to Render:

1. Create new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`
   - **Environment Variables:**
     - `GEMINI_API_KEY` = Your Gemini API key

4. Deploy and get your backend URL

## Environment Variables Required:
- `GEMINI_API_KEY` - Google Gemini API key for AI analysis

## Health Check:
GET /health

## Main Endpoint:
POST /analyze-image
