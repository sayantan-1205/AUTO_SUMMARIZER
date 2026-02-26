import React, { useState } from "react";
import toast from "react-hot-toast";

const Manager = () => {
  const [textValue, setTextValue] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [summaryType, setSummaryType] = useState("Select Summary Size");
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    const inputsFilled = [
      textValue.trim() !== "",
      imageFile !== null,
      pdfFile !== null,
    ].filter(Boolean).length;

    if (inputsFilled !== 1) {
      toast.error("Please give only 1 input");
      return;
    }

    if (summaryType === "Select Summary Size") {
      toast.error("Please select summary length");
      return;
    }

    try {
      setLoading(true);
      setSummary("");

      const length = parseInt(summaryType);
      if (textValue.trim() !== "") {
        const res = await fetch("http://localhost:3000/summarize-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: textValue,
            max_length: length,
          }),
        });

        const data = await res.json();
        setSummary(data.summary);
      }

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("max_length", length);

        const res = await fetch("http://localhost:3000/summarize-image", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        setSummary(data.summary);
      }

      if (pdfFile) {
        const formData = new FormData();
        formData.append("file", pdfFile);
        formData.append("max_length", length);

        const res = await fetch("http://localhost:3000/summarize-pdf", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        setSummary(data.summary);
      }

      toast.success("Summary generated!");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-yellow-100">
      <div className="input p-10 pb-2">
        <div className="text_input p-3 mb-3 border rounded-lg ">
          <h1 className="font-bold"> Enter text</h1>
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            className="text_area border border-gray-300 rounded p-2 w-full h-20"
            placeholder="Enter text here..."
          ></textarea>
        </div>

        <div className="img&pdf_input flex gap-5">
          <div className="img_input flex p-3 gap-5 border rounded-lg">
            <h1 className="font-bold"> Upload image </h1>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="file_input bg-gray-200 border border-gray-300 rounded w-50"
            />
          </div>

          <div className="pdf_input p-3 flex gap-8.5 border rounded-lg">
            <h1 className="font-bold"> Upload PDF</h1>
            <input
              type="file"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="file_input bg-gray-200 border border-gray-300 rounded w-50"
            />
          </div>
        </div>
      </div>

      <div className="summarized-size pt-2 flex flex-col items-center gap-3">
        <div>
          <div className="relative w-fit flex gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-green-600 text-white px-4 py-2 rounded w-50"
            >
              {summaryType}
            </button>

            {isOpen && (
              <div className="absolute mt-2 w-48 bg-white border rounded shadow z-10">
                {[20, 50, 100, 150, 200, 250, 300, 400, 500].map((size) => (
                  <div
                    key={size}
                    onClick={() => {
                      setSummaryType(size.toString());
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {size}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="submit">
          <button
            onClick={handleSummarize}
            className="submit_button bg-blue-500 text-white px-2 py-1 rounded"
          >
            Summarize
          </button>
        </div>
      </div>

      <div className="output pt-0 p-10">
        <h1 className="text-lg italic"> Here goes your summary:</h1>
        <textarea
          value={loading ? "Generating summary..." : summary}
          className="text_area border border-gray-300 rounded p-2 w-full h-50"
          placeholder="Summarized text will appear here..."
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default Manager;
