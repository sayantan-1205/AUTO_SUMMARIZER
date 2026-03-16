import React from 'react'

export default function Navbar() {
  return (
    <>
      {/* <div className="bg-black p-4 text-white font-bold text-3xl font-serif drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
        <h1 className="text-4xl font-bold text-white ">Text Summarizer</h1>
        
      </div> */}
      <div className="py-3 text-center">
  <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 bg-clip-text text-transparent">
    Multi-Content Summarizer
  </h1>

  <p className="text-gray-400  text-sm md:text-base">
    Summarize Text, Images and PDFs instantly
  </p>
</div>
    </>
  )
}
