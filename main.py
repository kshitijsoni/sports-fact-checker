import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

# Initialize the Groq client with your API key
client = Groq(api_key="YOUR_API_KEY")

app = FastAPI()

# Allow the Chrome extension to communicate with this server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=False,  # <-- The CORS fix!
    allow_methods=["*"],
    allow_headers=["*"],
)

class ClaimRequest(BaseModel):
    text: str

@app.post("/audit")
def audit_claim(req: ClaimRequest):
    prompt = f"""
    You are a brutal, data-driven sports fact-checker. 
    Analyze this text: "{req.text}"
    
    Output a JSON object with exactly two keys:
    1. "verdict": must be exactly one of ['Validated', 'Cherry-Picked', 'Total Cap']
    2. "reasoning": 2 sentences max explaining the actual stats.
    """
    
    # Send the prompt to Groq's super-fast Llama 3 model
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        response_format={ "type": "json_object" }
    )
    
    # Send the JSON result back to the Chrome Extension
    return json.loads(response.choices[0].message.content)