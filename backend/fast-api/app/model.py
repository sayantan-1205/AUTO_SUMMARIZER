from transformers import BartTokenizer, BartForConditionalGeneration
import torch

MODEL_NAME = "facebook/bart-large-cnn"

tokenizer = BartTokenizer.from_pretrained(MODEL_NAME)
model = BartForConditionalGeneration.from_pretrained(MODEL_NAME)

model.eval()

LENGTH_MAP = {
    20: 20,
    50: 50,
    100: 100,
    150: 150,
    200: 200,
    250: 250,
    300: 300,
    400: 400,
    500: 500
}

def summarize_text(text: str, max_length: int = 150) -> str:
    model_max_length = LENGTH_MAP.get(max_length, 150)

    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        max_length=1024
    )
    min_len = int(model_max_length * 0.6)

    with torch.no_grad():
        summary_ids = model.generate(
            inputs["input_ids"],
            num_beams=4,
            max_length=model_max_length,
            min_length=min_len,
            early_stopping=True
        )

    result = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    if not result.endswith("."):
        result = result.rsplit(".", 1)[0] + "."

    return result