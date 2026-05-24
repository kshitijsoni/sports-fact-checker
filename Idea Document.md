# 💡 Idea Document: Context Auditor

## 1. The Problem
Sports debates and articles online are heavily polluted with hyperbole, cherry-picked statistics, and outright falsehoods (often referred to as "cap"). Currently, users have to open a new tab, search through StatMuse or Basketball Reference, and manually verify the data, which completely breaks their reading flow. 

## 2. The Solution
**Context Auditor** is a frictionless, AI-powered Chrome Extension that acts as an instant, brutal sports fact-checker. It eliminates the need for manual research by integrating directly into the browser's context menu and delivering lightning-fast verdicts via native OS notifications.

## 3. Core Features
* **Highlight & Audit:** Users simply highlight any wild sports claim on any website (Twitter, ESPN, Reddit) and right-click to trigger the "Audit Sports Claim" function.
* **Ultra-Low Latency Inference:** Powered by the Groq API and the `llama-3.1-8b-instant` model, the AI processes natural language claims and cross-references them with its training data in milliseconds.
* **Categorized Verdicts:** The AI is strictly prompted to categorize every claim into one of three distinct, structured verdicts:
    * 🟢 **Validated:** The claim is factually accurate.
    * 🟡 **Cherry-Picked:** The claim is technically true but ignores crucial context to manipulate the narrative.
    * 🔴 **Total Cap:** The claim is factually incorrect.
* **Native Desktop Notifications:** Instead of injecting clunky HTML pop-ups into the webpage, the extension pushes the final verdict and a 2-sentence explanation directly to the user's native Windows/Mac notification center.

## 4. Technical Architecture
* **Frontend:** Vanilla JavaScript Chrome Extension (Manifest V3) utilizing the `contextMenus` and `notifications` APIs.
* **Backend Bridge:** A lightweight Python/FastAPI local server running via Uvicorn. Resolves CORS policies and acts as a secure intermediary.
* **AI Engine:** Groq API prompting Llama 3.1 to output strictly structured JSON (`{verdict: "", reasoning: ""}`) to ensure the UI never breaks.

## 5. Future Scope (Post-Hackathon)
* Add user authentication to allow cloud-hosted backend deployment rather than a localhost server.
* Integrate live, real-time sports data APIs (like Sportradar) to check claims about games happening at this exact moment. 
* Expand auditing categories beyond sports (e.g., Politics, Finance).
