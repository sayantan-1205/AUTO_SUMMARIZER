import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Manager = () => {
  const [textValue, setTextValue] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [summaryType, setSummaryType] = useState('Select Summary Length');
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    const inputsFilled = [
      textValue.trim() !== '',
      imageFile !== null,
      pdfFile !== null,
    ].filter(Boolean).length;

    if (inputsFilled !== 1) {
      toast.error('Please give only 1 input');
      return;
    }

    if (summaryType === 'Select Summary Length') {
      toast.error('Please select summary length');
      return;
    }

    try {
      setLoading(true);
      setSummary('');

      const length = parseInt(summaryType);

      if (textValue.trim() !== '') {
        const res = await fetch('http://localhost:3000/summarize-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
        formData.append('file', imageFile);
        formData.append('max_length', length);

        const res = await fetch('http://localhost:3000/summarize-image', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        setSummary(data.summary);
      }

      if (pdfFile) {
        const formData = new FormData();
        formData.append('file', pdfFile);
        formData.append('max_length', length);

        const res = await fetch('http://localhost:3000/summarize-pdf', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        setSummary(data.summary);
      }

      toast.success('Summary generated!');
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!summary) {
      toast.error("No summary to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success("Summary copied!");

      setTimeout(() => {
        setCopied(false);
      }, 1500);

    } catch (err) {
      toast.error("Copy failed");
    }
  };

  const handleDownload = () => {
    if (!summary) {
      toast.error("No summary to download");
      return;
    }

    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "summary.txt";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Download started!");
  };

  return (
    // <div className="min-h-[85vh] bg-gray-900 text-white">
    <div className="min-h-[85vh] bg-gradient-to-br from-blue-950 via-gray-950 to-blue-950 text-white">

      <div className="input p-10 pb-2 ">

        {/* TEXT INPUT */}
        <div className="text_input bg-gray-950 p-3 mb-3 border-2 border-gray-800 rounded-lg shadow-[5px_0_10px_-5px_rgba(255,255,255,0.4),_-5px_0_10px_-5px_rgba(255,255,255,0.4)]">
          <h1 className="font-bold"> Enter Text</h1>
          <textarea
            value={textValue}
            onChange={e => {
              setTextValue(e.target.value);
              setImageFile(null);
              setPdfFile(null);
            }}
            className="text_area border border-gray-300 rounded p-2 w-full h-50 hover:scale-101 transition duration-300"
            placeholder="Enter text here..."
          />
        </div>

        {/* IMAGE + PDF */}
        <div className="img&pdf_input flex flex-col md:flex-row gap-5">

          {/* IMAGE INPUT */}
          <div className="img_input flex p-3 gap-5 bg-gray-950 mb-3 border-2 border-gray-800 rounded-lg shadow-[5px_0_10px_-5px_rgba(255,255,255,0.4),_-5px_0_10px_-5px_rgba(255,255,255,0.4)] ">
            <h1 className="font-bold"> Upload Image </h1>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0];

                if (file && !file.type.startsWith("image/")) {
                  toast.error("Please upload appropriate file format");
                  e.target.value = null;
                  return;
                }

                setImageFile(file);
                setPdfFile(null);
                setTextValue('');
              }}
              className="file_input bg-gray-800 p-2 border border-gray-300 rounded w-50 hover:scale-103 transition duration-200"
            />
          </div>

          {/* PDF INPUT */}
          <div className="pdf_input p-3 flex gap-8.5 bg-gray-950 mb-3 border-2 border-gray-800 rounded-lg shadow-[5px_0_10px_-5px_rgba(255,255,255,0.4),_-5px_0_10px_-5px_rgba(255,255,255,0.4)]">
            <h1 className="font-bold"> Upload PDF</h1>
            <input
              type="file"
              accept="application/pdf"
              onChange={e => {
                const file = e.target.files[0];

                if (file && file.type !== "application/pdf") {
                  toast.error("Please upload appropriate file format");
                  e.target.value = null;
                  return;
                }

                setPdfFile(file);
                setImageFile(null);
                setTextValue('');
              }}
              className="file_input bg-gray-800 p-2 border border-gray-300 rounded w-50 hover:scale-103 transition duration-200"
            />
          </div>

        </div>
      </div>

      {/* SUMMARY LENGTH */}
      <div className="summarized-size pt-2 flex flex-col items-center gap-3">

        <div className="relative w-fit flex gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-52 text-white bg-gradient-to-r from-gray-800 to-gray-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg px-4 py-2 text-center"
          >
            {summaryType === "Select Summary Length"
              ? summaryType
              : `Summary Length : ${summaryType}`}
          </button>

          {isOpen &&
            <div className="absolute mt-2 w-48 bg-gray-900 border rounded shadow z-10">
              {[20, 50, 100, 150, 200, 250, 300, 400, 500].map(size => (
                <div
                  key={size}
                  onClick={() => {
                    setSummaryType(size.toString());
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                >
                  {size}
                </div>
              ))}
            </div>}
        </div>

        {/* SUMMARIZE BUTTON */}
        <div className="submit">
          <button
            onClick={handleSummarize}
            disabled={loading}
            className="bg-gradient-to-r from-gray-500 to-gray-900 text-white font-bold px-4 py-2 md:px-6 md:py-3 rounded-xl shadow-lg shadow-gray-600/40 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Summarize"}
          </button>
        </div>

      </div>

      {/* OUTPUT */}
      <div className="output pt-0 p-10">
        <h1 className="text-sm italic text-gray-400 p-1"> Here goes your summary:</h1>

        <div className="relative w-full">
          <textarea
            value={summary}
            className="text_area border bg-gray-950 border-gray-900 rounded-lg p-2 w-full h-50 border-4 shadow-[5px_0_10px_-5px_rgba(255,255,255,0.2),_-5px_0_10px_-5px_rgba(255,255,255,0.4)]"
            placeholder="Summarized text will appear here..."
            readOnly
          />

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/80 rounded-lg">

              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-3"></div>

              <p className="text-gray-300 text-sm animate-pulse">
                Generating summary...
              </p>

            </div>
          )}
        </div>

        {summary && !loading && (
          <div className="mt-4 flex justify-end gap-3">

            {/* COPY BUTTON */}
            <button
              onClick={handleCopy}
              className="flex gap-2 bg-gray-500 text-white font-semibold px-3 py-1 rounded-lg shadow-lg shadow-black/40 hover:scale-102 active:scale-95 transition-all duration-100"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
                <rect x="4" y="5" width="13" height="13" rx="2" stroke="currentColor" fill="none" strokeWidth="1.5" />
              </svg>

              {copied ? "Copied!" : "Copy"}
            </button>

            {/* DOWNLOAD BUTTON */}
            <button
              onClick={handleDownload}
              className="flex gap-2 bg-gray-500 text-white font-semibold px-2 py-1 md:px-3 md:py-1 rounded-lg shadow-lg shadow-black/40 hover:scale-102 active:scale-95 transition-all duration-100"
            >
              Download Summary
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default Manager;