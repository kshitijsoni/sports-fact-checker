# 🕵️‍♂️ Context Auditor: AI Sports Fact-Checker

An AI-powered Chrome Extension built for instantaneous, data-driven fact-checking of sports claims across the web. Highlight any sports take, right-click, and get a brutal, mathematically sound verdict delivered directly to your desktop.

## 🚀 The Tech Stack
* **Frontend:** Vanilla JavaScript Chrome Extension (Manifest V3)
* **Backend:** Python / FastAPI / Uvicorn (Localhost Server)
* **AI Brain:** Groq API (`llama-3.1-8b-instant` for ultra-low latency inference)

## ✨ Features
* **Seamless UI Integration:** Injects directly into Chrome's native right-click context menu.
* **Instantaneous Inference:** Uses Groq's Llama 3.1 model to process natural language and verify statistical sports claims in milliseconds.
* **Native Notifications:** Bypasses intrusive popups in favor of clean, native OS desktop notifications.
* **Structured JSON Output:** Forces the LLM to return strictly formatted JSON data (`Verdict` and `Reasoning`) for predictable backend handling.

---

## 🛠️ Installation & Setup

### 1. Start the AI Backend (Python)
You need to run the local server so the Chrome extension has a brain to talk to.
1. Clone this repository to your local machine.
2. Open the main folder in your terminal and install the required dependencies:
   ```bash
   pip install fastapi uvicorn groq pydantic

                          Boot up the server:

Bash
python -m uvicorn main:app --reload

2. Install the Chrome Extension
Open Google Chrome and navigate to chrome://extensions/.
Toggle Developer mode ON (top right corner).
Click Load unpacked (top left corner).
Select the extension folder from this repository.

🎯 How to Use It
Navigate to any website (Twitter, Reddit, ESPN, Cricbuzz, etc.).
Highlight a wild sports claim (e.g., "LeBron James has never missed a playoff game.").
Right-click the highlighted text and click "Audit Sports Claim".
Look at your desktop notifications for the final AI verdict:

🟢 Validated
🟡 Cherry-Picked
🔴 Total Cap
