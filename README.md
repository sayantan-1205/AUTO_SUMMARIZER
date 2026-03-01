# AI Document Summarizer

An intelligent document summarization system that generates concise summaries from:

-  Plain Text
-  PDF Documents
-  Images (via OCR)

Built using:
- FastAPI (Python Backend)
- Node.js (Middleware Layer)
- React + Vite (Frontend)
- HuggingFace Transformers (BART Model)
- Tesseract OCR

---

## Features

- Text summarization
- PDF summarization
- Image-to-text summarization (OCR)
- Adjustable summary length (150, 250, 375, 500 words)
- Clean modular backend architecture
- RESTful API design

---

##  System Architecture

User  
↓  
Frontend (React + Vite)  
↓  
Node.js (Express Middleware)  
↓  
FastAPI (Python Backend)  
├── Text → Summarizer  
├── PDF → Extract Text → Summarizer  
└── Image → OCR → Extract Text → Summarizer  
↓  
Summary Response  

---

# ⚙️ Backend Setup (FastAPI)

###  Navigate to backend

cd backend/fast-api

###  Create Virtual Environment

Windows (PowerShell):
python -m venv .venv
.venv\Scripts\Activate.ps1

Git Bash:
python -m venv .venv
source .venv/Scripts/activate

### Install Dependencies

pip install -r requirements.txt

### Run FastAPI Server

uvicorn app.main:app --reload

Open:
http://127.0.0.1:8000/docs

---

# OCR Setup (Windows Only)

1. Download Tesseract from:
   https://github.com/UB-Mannheim/tesseract/wiki

2. Install to:
   C:\Program Files\Tesseract-OCR

3. If required, set path inside utils.py:

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

---

# Node.js Setup

cd node-server
npm install
node index.js

Server runs at:
http://localhost:3000

---

# Frontend Setup

cd frontend
npm install
npm run dev

Open:
http://localhost:5173

---

# API Endpoints

## Text Summarization
POST /summarize

Example JSON:
{
  "text": "Your text here",
  "max_length": 150
}

---

## PDF Summarization
POST /summarize-pdf

Form-data:
- file → PDF file
- max_length → 150

---

## Image Summarization
POST /summarize-image

Form-data:
- file → Image file
- max_length → 150

---

# Model Used

Model: facebook/bart-large-cnn  
Beam Search: num_beams = 4  
Input Limit: 1024 tokens  

---


## Trained Model Files

Due to GitHub file size limitations, the trained text summarization model is not stored in this repository.

### Download Link (Google Drive)
https://drive.google.com/drive/folders/1zHeh5Q3bazDMkPMs_QymzmwHZ0Y3IlCl?usp=drive_link

### Setup Instructions
1. Open the link above
2. Download the folder (Google Drive will create a ZIP)
3. Extract it
4. Place the extracted files inside:

model/auto_summarizer_model/
