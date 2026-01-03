from fastapi import FastAPI, HTTPException
from app.schemas import SummarizeRequest, SummarizeResponse
from app.model import summarize_text

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
