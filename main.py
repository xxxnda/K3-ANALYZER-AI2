import os
import io
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
from analyzer import k3_object_analyzer

app = FastAPI(title="K3 AI Analyzer Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, "best.pt")
    model = YOLO(model_path)
except Exception as e:
    model = None
    print(f"Error loading model: {e}")

@app.post("/analyze-image")
async def analyze_image_endpoint(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model YOLO not loaded")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        results = model.predict(image, conf=0.25)

        detected_objects = []
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls[0])
                class_name = model.names[class_id]
                detected_objects.append(class_name)
        
        unique_objects = list(set([obj.lower() for obj in detected_objects]))
        
        if not unique_objects:
            unique_objects = ["none"]

        analysis_result = k3_object_analyzer(unique_objects)

        return {
            "success": True,
            "filename": file.filename,
            "detected_raw": detected_objects,
            "analysis": analysis_result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)