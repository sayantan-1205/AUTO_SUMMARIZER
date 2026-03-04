import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Manager from './components/Manager'


function App() {
 
  return (
    <>
      <Navbar/>
      <Manager className="w-full"/>
      <Footer className="fixed bottom-0 w-full"/>
    </>
  )
}

export default App
