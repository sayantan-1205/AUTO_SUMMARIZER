# Auto Summarizer

A **Text Summarization Web Application** that generates concise summaries from long-form text using a **Transformer-based NLP model** and exposes the model through a **REST API**.

---

## 🚀 Features
- Abstractive text summarization
- Transformer-based model (BART)
- REST API for real-time inference
- Clean, modular backend structure
- Easy integration with frontend applications

---

## 🧠 Model Details
- **Model:** BART (facebook/bart-large-cnn)
- **Task:** Abstractive Text Summarization
- **Dataset:** DialogSum
- **Framework:** PyTorch + Hugging Face Transformers

The model was trained and evaluated in **Google Colab**.  
Due to file size constraints, trained model weights are **not stored in this repository**.

---

## 🏗️ Tech Stack

### Machine Learning
- Python
- PyTorch
- Hugging Face Transformers

### Backend
- FastAPI
- Uvicorn
- Pydantic

### Development Tools
- Google Colab (model training)
- VS Code (backend development)
- GitHub (version control)

---

## 📂 Project Structure

AUTO_SUMMARIZER/
│
├── app.py # FastAPI backend
├── requirements.txt # Project dependencies
├── README.md # Project documentation
├── .gitignore # Ignored files and folders
│
├── notebooks/
│ └── text_summarization_training.ipynb # Training notebook
│
└── model/
└── auto_summarizer_model/
└── README.md # Model download instructions

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