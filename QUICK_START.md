# Quick Start Guide

## 🚀 Run Application

### Option 1: Auto Launcher (Easiest!)
```bash
# Windows
.\start.bat

# PowerShell
.\start.ps1
```

### Option 2: Manual
```bash
# Terminal 1 - Backend
cd backend
python main.py

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

Then open: **http://localhost:3000**

---

## 📁 Project Structure (Clean & Organized)

```
K3-AI-Analyzer/
├── backend/              ← All Python backend files
│   ├── main.py          ← FastAPI server
│   ├── analyzer.py      ← AI analysis logic
│   ├── rules.py         ← Rule-based analysis
│   ├── prompt.py        ← AI prompts
│   └── best.pt          ← YOLO model
│
├── frontend/            ← React TypeScript app
│   ├── src/
│   │   ├── components/  ← shadcn/ui components
│   │   ├── pages/       ← ObjectAnalyzerPage
│   │   ├── hooks/       ← useAnalysis
│   │   └── services/    ← API calls
│   └── package.json
│
├── requirements.txt     ← Python dependencies
├── .env                ← OpenAI API key
├── start.bat           ← Windows launcher
├── start.ps1           ← PowerShell launcher
└── README.md           ← Full documentation
```

---

## 🔑 Key Endpoints

- **Frontend**: http://localhost:3000 (Main UI)
- **Backend API**: http://localhost:8001
- **API Docs**: http://localhost:8001/docs
- **Health Check**: http://localhost:8001/health

---

## ⚙️ Environment Setup

### Backend (.env in root)
```env
OPENAI_API_KEY=sk-...
```

### Frontend (.env in frontend/)
```env
VITE_API_URL=http://localhost:8001
```

---

## 🛠️ Common Commands

### Backend
```bash
cd backend
python main.py              # Run server
python analyzer.py          # Test analyzer
```

### Frontend
```bash
cd frontend
npm install                 # Install dependencies
npm run dev                 # Development server
npm run build              # Production build
```

---

## 📝 Notes

- ✅ Old `index.html` removed (frontend only now)
- ✅ All backend files in `backend/` folder
- ✅ Clean separation: backend ↔ frontend
- ✅ Focus on **localhost:3000** for UI
- ✅ Backend runs as API-only service

---

Need help? Check [README.md](README.md) for detailed documentation.
