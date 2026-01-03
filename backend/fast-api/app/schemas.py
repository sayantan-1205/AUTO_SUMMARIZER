from pydantic import BaseModel

class SummarizeRequest(BaseModel):
    text: str
    max_length: int = 200

class SummarizeResponse(BaseModel):
    summary: str
