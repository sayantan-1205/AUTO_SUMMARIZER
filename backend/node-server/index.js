const express = require("express");
const axios = require("axios");
const cors = require("cors");
const multer = require("multer");
const FormData = require("form-data");

const upload = multer();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Node server is running");
});


app.post("/summarize-text", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/summarize",
      {
        text: req.body.text,
        max_length: req.body.max_length || 150
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Text summarization failed" });
  }
});

app.post("/summarize-pdf", upload.single("file"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("file", req.file.buffer, req.file.originalname);

    const response = await axios.post(
      "http://127.0.0.1:8000/summarize-pdf",
      formData,
      {
        headers: formData.getHeaders(),
        params: {
          max_length: req.body.max_length || 150
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "PDF summarization failed" });
  }
});

app.post("/summarize-image", upload.single("file"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("file", req.file.buffer, req.file.originalname);

    const response = await axios.post(
      "http://127.0.0.1:8000/summarize-image",
      formData,
      {
        headers: formData.getHeaders(),
        params: {
          max_length: req.body.max_length || 150
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Image summarization failed" });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Node server running on http://localhost:${PORT}`);
});