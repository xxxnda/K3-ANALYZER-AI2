# 🚀 Setup Gemini API untuk K3 Safety AI Analyzer

## Mengapa Gemini?
- ✅ **GRATIS** - Tidak perlu billing/kartu kredit
- ✅ **Multimodal** - Bisa analisis gambar langsung
- ✅ **Powerful** - Gemini 2.5 Flash sangat cepat dan akurat
- ✅ **Mudah** - Setup hanya 2 menit

## Cara Mendapatkan API Key (GRATIS)

### 1. Buka Google AI Studio
Akses: **https://aistudio.google.com/app/apikey**

### 2. Login dengan Akun Google
- Gunakan akun Google biasa (Gmail)
- Setujui Terms of Service

### 3. Buat API Key
- Klik tombol **"Get API Key"** atau **"Create API Key"**
- Pilih proyek (gunakan "My First Project" atau buat baru)
- Copy API key yang muncul (format: `AIzaSy...`)

### 4. Simpan ke File `.env`
Buka file `.env` di root folder project, lalu paste API key:

```env
GEMINI_API_KEY=AIzaSy... (paste API key Anda disini)
```

**SELESAI!** 🎉

## Test Backend

### Test LLM saja (tanpa gambar)
```bash
cd backend
python -c "from analyzer import k3_object_analyzer; result = k3_object_analyzer(['person', 'helmet', 'vest']); print('✅ LLM jalan!'); print(result['llm_analysis'][:200])"
```

### Test Full API Server
```bash
cd backend
python main.py
```

Buka browser: http://localhost:8001/docs

### Test dengan Frontend
```bash
# Terminal 1 - Backend
cd backend
python main.py

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Buka: http://localhost:3000

## Keunggulan Implementasi Ini

### 🎯 Multimodal Vision
Gemini tidak hanya menerima daftar objek, tapi **melihat gambar langsung**:
- Deteksi konteks scene (ketinggian, scaffolding, dll)
- Analisis posisi pekerja
- Identifikasi bahaya visual yang tidak terdeteksi YOLO
- Assessment lebih akurat

### 🔄 Hybrid Approach
```
YOLO Detection → Object List + Image → Gemini Vision → Comprehensive Analysis
     ↓                                      ↓
Rule-based Fallback              Enhanced K3 Insights
```

### 📊 Output JSON Terstruktur
```json
{
  "scene_description": "Construction workers on scaffolding...",
  "identified_hazards": [
    "Worker at height without fall protection",
    "Missing safety harness"
  ],
  "ppe_compliance": "Partial - helmets worn but no harnesses",
  "risk_level": "HIGH",
  "safety_recommendations": [
    "Install fall arrest systems",
    "Ensure all workers use safety harnesses"
  ]
}
```

## Troubleshooting

### Error: API key not configured
- Pastikan file `.env` ada di root folder
- Pastikan format: `GEMINI_API_KEY=AIzaSy...` (tanpa spasi, tanpa quotes)

### Error: Rate limit exceeded
- Gemini free tier: 15 requests/minute
- Tunggu 1 menit, lalu coba lagi
- Untuk production, upgrade ke paid tier

### LLM tidak jalan
- Check terminal output untuk error message
- Pastikan `LLM_PROVIDER=gemini` di `.env`
- Test koneksi internet

## Dokumentasi Lengkap
- Gemini API: https://ai.google.dev/gemini-api/docs
- Google AI Studio: https://aistudio.google.com
- Model Info: https://ai.google.dev/gemini-api/docs/models/gemini

## Support
Untuk demo penilaian, pastikan:
1. ✅ API key valid (test dulu sebelum demo)
2. ✅ Internet stabil
3. ✅ Backend & Frontend running
4. ✅ Siapkan gambar konstruksi untuk demo

**Good luck dengan penilaiannya!** 🎓
