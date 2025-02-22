import React from 'react'
import { FaCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-slate-200 '>
      <div className='flex items-center justify-center container mx-auto'>
        <FaCopyright/>
        <span className='p-2 font-bold' title='Project Build By'>2024 Isuru Wijayawardana</span>
      </div>
      
    </footer>
  )
}

export default Footer