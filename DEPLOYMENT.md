# 🚀 Deployment Guide - K3 AI Analyzer

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub repository dengan kode terbaru
- Akun Vercel (gratis di [vercel.com](https://vercel.com))

### Langkah Deploy ke Vercel

1. **Push kode ke GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import Project di Vercel:**
   - Buka [vercel.com](https://vercel.com) dan login
   - Click **"Add New"** → **"Project"**
   - Import repository GitHub Anda
   - Pilih folder `frontend` sebagai root directory

3. **Configure Build Settings:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Environment Variables:**
   Tambahkan di Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   ⚠️ Update ini setelah backend deployed!

5. **Deploy:**
   - Click **"Deploy"**
   - Tunggu build selesai (~2-3 menit)
   - Vercel akan memberikan URL seperti: `https://k3-ai-analyzer.vercel.app`

---

## Backend Deployment (Render)

### Prerequisites
- GitHub repository dengan kode terbaru
- Akun Render (gratis di [render.com](https://render.com))
- Gemini API Key

### Langkah Deploy ke Render

1. **Push kode ke GitHub** (jika belum):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Web Service di Render:**
   - Buka [dashboard.render.com](https://dashboard.render.com)
   - Click **"New"** → **"Web Service"**
   - Connect repository GitHub Anda

3. **Configure Service:**
   - **Name:** `k3-ai-analyzer-backend`
   - **Region:** Singapore (terdekat)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Environment Variables:**
   Tambahkan di Render dashboard (Environment tab):
   ```
   GEMINI_API_KEY=AIzaSyCMETrdzp96lr6a8ei7iBDmmBGTtwGvK1E
   ```

5. **Deploy:**
   - Click **"Create Web Service"**
   - Tunggu build (~5-10 menit pertama kali, download YOLO model)
   - Render akan memberikan URL seperti: `https://k3-ai-analyzer-backend.onrender.com`

6. **⚠️ PENTING - Update Frontend:**
   Setelah backend deployed, update environment variable di Vercel:
   - Buka Vercel project settings
   - Settings → Environment Variables
   - Update `VITE_API_URL` dengan URL backend dari Render
   - Redeploy frontend

---

## Testing Deployment

### Test Backend:
```bash
curl https://your-backend-url.onrender.com/health
```
Expected response:
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### Test Frontend:
1. Buka URL Vercel di browser
2. Upload gambar konstruksi
3. Verify analysis berjalan dan menampilkan hasil

---

## Troubleshooting

### Backend Render (Free Tier):
- ⚠️ **Cold Start:** Service sleep setelah 15 menit inactivity
- First request setelah sleep akan lambat (~1-2 menit)
- Solusi: Upgrade ke paid tier atau gunakan uptime monitoring (cron-job.org)

### CORS Issues:
Jika ada error CORS, pastikan di `backend/main.py`:
```python
allow_origins=["*"]  # Atau specify Vercel URL
```

### Build Errors Vercel:
Check bahwa `vercel.json` ada di folder `frontend/`

### Backend Crashes:
Check logs di Render dashboard untuk error messages

---

## Notes Penting

✅ **Free Tier Limitations:**
- Vercel: Unlimited bandwidth, 100 GB per month
- Render: 750 hours/month (cukup untuk 1 service 24/7)
- Render: Service sleep after 15 min inactivity

✅ **API Keys:**
- NEVER commit API keys ke Git
- Always use environment variables
- Gemini API free tier: 15 requests per minute

✅ **Model File (best.pt):**
- Ukuran ~12 MB, akan di-download saat build
- Render akan cache ini untuk build berikutnya

---

## Update Deployment

### Update Frontend:
```bash
git add .
git commit -m "Update frontend"
git push origin main
# Vercel auto-deploy dari Git push
```

### Update Backend:
```bash
git add .
git commit -m "Update backend"
git push origin main
# Render auto-deploy dari Git push
```

---

## Monitoring

### Vercel:
- Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- View deployment logs
- View analytics

### Render:
- Dashboard: [dashboard.render.com](https://dashboard.render.com)
- View logs (real-time)
- View metrics
- Check service health

---

Selamat! Aplikasi Anda sekarang live di internet! 🎉
