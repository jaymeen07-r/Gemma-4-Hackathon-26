import json
import os
import re

from dotenv import load_dotenv
from google import genai
import traceback

load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

with open("prompts/fraud_prompt.txt", "r", encoding="utf-8") as f:
    SYSTEM_PROMPT = f.read()


async def analyze_fraud(content: str):

    prompt = f"""
{SYSTEM_PROMPT}

Content:

{content}
"""
    print("===== PROMPT =====")
    print(prompt)
    print("==================")
    print("Prompt length:", len(prompt))
    print(len(SYSTEM_PROMPT))
    try:
        print("API KEY EXISTS:", bool(os.getenv("GOOGLE_API_KEY")))
        print("Calling Gemma...")
        response = client.models.generate_content(
            model="gemma-4-26b-a4b-it",
            contents=prompt,
        )
        print("Gemma call completed")

        text = response.text.strip()

        print("MODEL RESPONSE:")
        print(text)
        print("RAW RESPONSE:")
        print(response.text)

        match = re.search(r"\{.*\}", text, re.DOTALL)

        if not match:
            raise ValueError("No JSON found in model response")

        parsed = json.loads(match.group())
        parsed["riskLevel"] = parsed["riskLevel"].upper()
        return parsed

    except Exception as e:
        print("========== GEMMA ERROR ==========")
        traceback.print_exc()
        print("=================================")
        return {
            "riskLevel": "UNKNOWN",
            "fraudType": "Service Error",
            "confidence": 0,
            "summary": "AI analysis service unavailable.",
            "indicators": [],
            "tactics": [],
            "steps": [],
            "warning": str(e),
        }
