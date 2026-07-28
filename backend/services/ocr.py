import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OCR_API_KEY")


def extract_text_from_image(image_bytes: bytes):

    response = requests.post(
        "https://api.ocr.space/parse/image",
        files={"file": ("image.jpg", image_bytes, "image/jpeg")},
        data={"apikey": API_KEY, "language": "eng"},
    )

    result = response.json()

    if result.get("IsErroredOnProcessing"):
        print("OCR ERROR:", result)
        return ""

    parsed_results = result.get("ParsedResults", [])

    if not parsed_results:
        return ""

    return parsed_results[0].get("ParsedText", "")
