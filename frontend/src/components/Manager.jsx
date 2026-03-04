import React, {useState} from 'react';
import toast from 'react-hot-toast';

const Manager = () => {
  const [textValue, setTextValue] = useState ('');
  const [imageFile, setImageFile] = useState (null);
  const [pdfFile, setPdfFile] = useState (null);
  const [summaryType, setSummaryType] = useState ('Select Summary Length');
  const [isOpen, setIsOpen] = useState (false);
  const [summary, setSummary] = useState ('');
  const [loading, setLoading] = useState (false);

  const handleSummarize = async () => {
    const inputsFilled = [
      textValue.trim () !== '',
      imageFile !== null,
      pdfFile !== null,
    ].filter (Boolean).length;

    if (inputsFilled !== 1) {
      toast.error ('Please give only 1 input');
      return;
    }

    if (summaryType === 'Select Summary Length') {
      toast.error ('Please select summary length');
      return;
    }

    try {
      setLoading (true);
      setSummary ('');

      const length = parseInt (summaryType);
      if (textValue.trim () !== '') {
        const res = await fetch ('http://localhost:3000/summarize-text', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify ({
            text: textValue,
            max_length: length,
          }),
        });

        const data = await res.json ();
        setSummary (data.summary);
      }

      if (imageFile) {
        const formData = new FormData ();
        formData.append ('file', imageFile);
        formData.append ('max_length', length);

        const res = await fetch ('http://localhost:3000/summarize-image', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json ();
        setSummary (data.summary);
      }

      if (pdfFile) {
        const formData = new FormData ();
        formData.append ('file', pdfFile);
        formData.append ('max_length', length);

        const res = await fetch ('http://localhost:3000/summarize-pdf', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json ();
        setSummary (data.summary);
      }

      toast.success ('Summary generated!');
    } catch (err) {
      toast.error ('Something went wrong');
    } finally {
      setLoading (false);
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
    <div className="min-h-[85vh] bg-gray-900 text-white">
      <div className="input p-10 pb-2 ">
        <div className="text_input bg-gray-950 p-3 mb-3 border-2 border-gray-800 rounded-lg shadow-[5px_0_10px_-5px_rgba(255,255,255,0.4),_-5px_0_10px_-5px_rgba(255,255,255,0.4)]">
          <h1 className="font-bold"> Enter text</h1>
          <textarea
            value={textValue}
            onChange={e => setTextValue (e.target.value)}
            className="text_area border border-gray-300 rounded p-2 w-full h-50 hover:scale-101 transition duration-300"
            placeholder="Enter text here..."
          />
        </div>

        <div className="img&pdf_input flex gap-5">
          <div className="img_input flex p-3 gap-5  bg-gray-950 mb-3 border-2 border-gray-800 rounded-lg shadow-[5px_0_10px_-5px_rgba(255,255,255,0.4),_-5px_0_10px_-5px_rgba(255,255,255,0.4)] ">
            <h1 className="font-bold"> Upload Image </h1>
            <input
              type="file"
              onChange={e => setImageFile (e.target.files[0])}
              className="file_input bg-gray-800 p-2 border border-gray-300 rounded w-50 hover:scale-103 transition duration-200"
            />
          </div>

          <div className="pdf_input p-3 flex gap-8.5  bg-gray-950 mb-3 border-2 border-gray-800 rounded-lg shadow-[5px_0_10px_-5px_rgba(255,255,255,0.4),_-5px_0_10px_-5px_rgba(255,255,255,0.4)]">
            <h1 className="font-bold"> Upload PDF</h1>
            <input
              type="file"
              onChange={e => setPdfFile (e.target.files[0])}
              className="file_input bg-gray-800 p-2 border border-gray-300 rounded w-50 hover:scale-103 transition duration-200"
            />
          </div>
        </div>
      </div>

      <div className="summarized-size pt-2 flex flex-col items-center gap-3">
        <div>
          <div className="relative w-fit flex gap-4">
            <button
              onClick={() => setIsOpen (!isOpen)}
              className="w-52 text-white bg-gradient-to-r from-gray-800 to-gray-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-black dark:focus:ring-gray-800 font-medium rounded-lg  px-4 py-2 text-center"
            >
              {summaryType === "Select Summary Length"
  ? summaryType
  : `Summary Length : ${summaryType}`}
            </button>

            {isOpen &&
              <div className="absolute mt-2 w-48 bg-gray-900 border rounded shadow z-10">
                {[20, 50, 100, 150, 200, 250, 300, 400, 500].map (size => (
                  <div
                    key={size}
                    onClick={() => {
                      setSummaryType (size.toString ());
                      setIsOpen (false);
                    }}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    {size}
                  </div>
                ))}
              </div>}
          </div>
        </div>

        <div className="submit">
          <button
            onClick={handleSummarize}
            className="bg-gradient-to-r from-gray-500 to-gray-900   
          text-white font-bold 
          px-4 py-2 md:px-6 md:py-3 
          rounded-xl 
          shadow-lg shadow-gray-600/40 
          hover:shadow-black/60 
          hover:scale-105 
          active:scale-95
          transition-all duration-300"
          >
            Summarize
          </button>
        </div>
      </div>

      <div className="output pt-0 p-10">
        <h1 className="text-sm italic text-gray-400 p-1"> Here goes your summary:</h1>
        <textarea
          value={loading ? 'Generating summary...' : summary}
          className="text_area border bg-gray-950 border-gray-900 rounded-lg p-2 w-full h-50 border-4 shadow-[5px_0_10px_-5px_rgba(255,255,255,0.2),_-5px_0_10px_-5px_rgba(255,255,255,0.4)]"
          placeholder="Summarized text will appear here..."
          readOnly
        />
        {summary && !loading && (
  <div className="mt-4 flex justify-end">
    <button
      onClick={handleDownload}
      className="flex gap-2
      bg-gray-500 
      text-white font-semibold
      px-2 py-1 md:px-3 md:py-1
      rounded-lg
      shadow-lg shadow-black/40
      hover:scale-102
      active:scale-95
      transition-all duration-100"
    >
      <svg className="w-[28px] h-[28px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8" d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"/>
</svg>
Download Summary
    </button>
  </div>
)}
      </div>
    </div>
  );
};

export default Manager;
