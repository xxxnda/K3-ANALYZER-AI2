# -*- coding: utf-8 -*-
"""analyzer - K3 Safety AI Analyzer with Gemini Vision API"""

import os
import json
from prompt import build_k3_prompt
from rules import analyze_ppe, generate_caption
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

# Initialize Gemini client
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    gemini_client = genai.Client(api_key=GEMINI_API_KEY)
    LLM_MODEL = "gemini-2.5-flash"
    print(f"🤖 LLM Provider: GEMINI, Model: {LLM_MODEL}")
else:
    gemini_client = None
    LLM_MODEL = None
    print("⚠️ GEMINI_API_KEY not configured")

def k3_object_analyzer(objects, image_bytes=None):
    """
    Analyze K3 safety from detected objects and optionally image
    
    Args:
        objects: list[str] - Detected object names from YOLO
        image_bytes: bytes - Raw image data for multimodal analysis (optional)
    
    Returns:
        dict with analysis results
    """

    # Rule-based analysis (fast & deterministic)
    risks = analyze_ppe(objects)
    rule_caption = generate_caption(objects)

    # Try LLM reasoning with vision if available
    llm_output = None
    try:
        if gemini_client is None:
            raise Exception("Gemini API key not configured")
        
        # Build K3-specific prompt for construction safety
        k3_prompt = f"""You are a K3 (Occupational Health and Safety) expert analyzing a construction site image.

**Detected objects from YOLO:** {', '.join(objects)}

Please provide a comprehensive safety analysis in JSON format:

{{
  "scene_description": "Detailed description of the construction scene and activities",
  "identified_hazards": [
    "Specific hazard 1",
    "Specific hazard 2",
    "Specific hazard 3"
  ],
  "risk_level": "LOW or MEDIUM or HIGH",
  "safety_recommendations": [
    "Specific actionable recommendation 1",
    "Specific actionable recommendation 2", 
    "Specific actionable recommendation 3"
  ]
}}

**Analysis guidelines:**
- Identify ALL potential safety hazards based on detected objects and scene context
- Assess risk level: HIGH if missing critical PPE or dangerous conditions, MEDIUM if partial compliance, LOW if safe
- Provide specific, actionable recommendations (not generic advice)
- Focus on: PPE compliance (helmet, vest, boots, gloves, goggles), fall protection, machinery safety, electrical hazards

Respond ONLY with valid JSON. No markdown formatting."""

        # Prepare content with image and text
        contents = []
        
        if image_bytes:
            # Add image for visual analysis
            contents.append(
                types.Part.from_bytes(
                    data=image_bytes, 
                    mime_type="image/jpeg"
                )
            )
        
        # Add text prompt
        contents.append(k3_prompt)
        
        # Generate content with Gemini
        response = gemini_client.models.generate_content(
            model=LLM_MODEL,
            contents=contents
        )
        
        llm_output = response.text
            
    except Exception as e:
        print(f"LLM API Error: {e}")
        # Fallback to basic analysis without LLM
        llm_output = json.dumps({
            "scene_description": rule_caption,
            "identified_hazards": risks,
            "risk_level": "LOW" if len(risks) == 0 else "HIGH",
            "safety_recommendations": [
                "Ensure all workers wear complete PPE",
                "Follow safety protocols",
                "Regular safety training required"
            ]
        })

    return {
        "detected_objects": objects,
        "rule_based_caption": rule_caption,
        "rule_based_risks": risks,
        "rule_based_risk_level": "LOW" if len(risks) == 0 else "HIGH",
        "llm_analysis": llm_output
    }


# === LOCAL TEST ===
if __name__ == "__main__":
    yolo_output = [
        "person",
        "vest",
        "helmet",
        "gloves",
        "boots",
        "goggles"
    ]

    result = k3_object_analyzer(yolo_output)
    print(result)