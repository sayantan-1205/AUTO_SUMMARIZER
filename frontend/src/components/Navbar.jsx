import React from 'react'

export default function Navbar() {
  return (
    <>
      <div className="bg-gray-900 p-4 text-white font-bold text-3xl">
        News Summarizer
      </div>

      <div className="flex justify-center space-x-4 py-2 bg-black text-white ">
        <button className="hover:underline" onClick={() => setCategory("general")}>General</button>
        <button className="hover:underline" onClick={() => setCategory("business")}>Finance</button>
        <button className="hover:underline" onClick={() => setCategory("technology")}>Technology</button>
        <button className="hover:underline" onClick={() => setCategory("entertainment")}>Entertainment</button>
        <button className="hover:underline" onClick={() => setCategory("sports")}>Sports</button>
        <button className="hover:underline" onClick={() => setCategory("health")}>Health</button>
      </div>
    </>
  )
}
