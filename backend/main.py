from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.gemma import analyze_fraud
from fastapi import UploadFile, File, Form
from services.ocr import extract_text_from_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    content: str


@app.post("/api/analyze")
async def analyze(text: str = Form(""), file: UploadFile = File(None)):
    content = text

    if file:
        file_bytes = await file.read()

        if file.content_type.startswith("image/"):
            extracted_text = extract_text_from_image(file_bytes)
    
            print("OCR TEXT:")
            print(extracted_text)
    
            content += f"IMAGE CONTENT DETECTED: {extracted_text}"

    result = await analyze_fraud(content)

    return result


@app.post("/api/analyze/text")
async def analyze_text(data: AnalyzeRequest):
    result = await analyze_fraud(data.content)
    return result
