from transformers import BartTokenizer, BartForConditionalGeneration
import torch

MODEL_NAME = "facebook/bart-large-cnn"

tokenizer = BartTokenizer.from_pretrained(MODEL_NAME)
model = BartForConditionalGeneration.from_pretrained(MODEL_NAME)

model.eval()

LENGTH_MAP = {
    150: 200,
    250: 300,
    375: 450,
    500: 600
}

def summarize_text(text: str, max_length: int = 150) -> str:
    model_max_length = LENGTH_MAP.get(max_length, 200)

    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        max_length=1024
    )

    with torch.no_grad():
        summary_ids = model.generate(
            inputs["input_ids"],
            num_beams=4,
            max_length=model_max_length,
            min_length=100,
            early_stopping=True
        )

    return tokenizer.decode(summary_ids[0], skip_special_tokens=True)
