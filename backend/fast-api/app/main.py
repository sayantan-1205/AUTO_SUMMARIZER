from fastapi import FastAPI, HTTPException, UploadFile, File
from app.schemas import SummarizeRequest, SummarizeResponse
from app.model import summarize_text
from app.utils import extract_text_from_image, extract_text_from_pdf

app = FastAPI(title="Auto Summarizer API")

@app.post("/summarize", response_model=SummarizeResponse)
def summarize(request: SummarizeRequest):

    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Input text is empty")

    summary = summarize_text(
        request.text,
        request.max_length
    )

    return {"summary": summary}

@app.post("/summarize-pdf", response_model=SummarizeResponse)
async def summarize_pdf(file: UploadFile = File(...), max_length: int = 150):

    content = await file.read()
    text = extract_text_from_pdf(content)

    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from PDF")

    summary = summarize_text(text, max_length)

    return {"summary": summary}

@app.post("/summarize-image", response_model=SummarizeResponse)
async def summarize_image(file: UploadFile = File(...), max_length: int = 150):

    content = await file.read()
    text = extract_text_from_image(content)

    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from image")

    summary = summarize_text(text, max_length)

    return {"summary": summary}
