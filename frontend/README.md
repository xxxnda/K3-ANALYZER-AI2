# K3 Safety AI Analyzer - Frontend

Aplikasi analisis keselamatan K3 (Kesehatan dan Keselamatan Kerja) menggunakan AI untuk mendeteksi APD (Alat Pelindung Diri) dan menganalisis risiko keselamatan di lokasi proyek konstruksi.

## 🚀 Deployment (Vercel)

### Quick Deploy Steps:

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Set **Root Directory:** `frontend`

3. **Configure Build:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Environment Variables:**
   Add in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

5. **Deploy!**

## Fitur

- 🔍 Deteksi objek menggunakan YOLO
- 🤖 Analisis risiko menggunakan AI
- 📊 Penilaian level risiko (Low/Medium/High)
- ✅ Rekomendasi keselamatan otomatis
- 🎨 UI Modern dengan shadcn/ui

## Struktur Proyek

```
K3-AI-Analyzer/
├── frontend/           # React + TypeScript + shadcn/ui
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── package.json
├── analyzer.py        # Logika analisis AI
├── main.py           # FastAPI backend
├── rules.py          # Rule-based analysis
├── prompt.py         # AI prompts
├── best.pt           # Model YOLO
└── requirements.txt
```

## Instalasi

### Backend (Python)

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Jalankan server backend:
```bash
python main.py
```

Backend akan berjalan di `http://localhost:8001`

### Frontend (React)

1. Masuk ke folder frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## Cara Menggunakan

1. Pastikan backend dan frontend sudah berjalan
2. Buka browser dan akses `http://localhost:3000`
3. Klik area upload untuk memilih foto proyek
4. Klik tombol "Analisa Foto Sekarang"
5. Tunggu hingga analisis selesai
6. Hasil akan menampilkan:
   - Objek yang terdeteksi
   - Level risiko keselamatan
   - Deskripsi kondisi lokasi
   - Daftar risiko bahaya
   - Rekomendasi keselamatan

## Teknologi yang Digunakan

### Backend
- FastAPI - Web framework
- YOLO (Ultralytics) - Object detection
- Groq AI - LLM analysis
- Python 3.x

### Frontend
- React 18
- TypeScript
- Vite
- shadcn/ui - UI components
- Tailwind CSS
- Axios - HTTP client
- Lucide React - Icons

## Environment Variables

Buat file `.env` di folder `frontend/` dengan isi:
```
VITE_API_URL=http://localhost:8001
```

## Build untuk Production

### Frontend
```bash
cd frontend
npm run build
```

Build output akan ada di folder `frontend/dist/`

## API Endpoints

### POST /analyze-image
Upload dan analisis foto

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: file (image)

**Response:**
```json
{
  "success": true,
  "filename": "example.jpg",
  "detected_raw": ["helmet", "vest", "person"],
  "analysis": {
    "llm_analysis": {...},
    "rule_based_risks": [...],
    "rule_based_risk_level": "MEDIUM",
    "rule_based_caption": "..."
  }
}
```

## Troubleshooting

### Backend Error
- Pastikan semua dependencies terinstall: `pip install -r requirements.txt`
- Pastikan file `best.pt` tersedia
- Pastikan API key Groq sudah diset (jika menggunakan LLM)

### Frontend Error
- Hapus folder `node_modules` dan install ulang: `npm install`
- Pastikan backend sudah berjalan
- Check environment variables di `.env`

## License

MIT License

## Kontributor

- Amanda
