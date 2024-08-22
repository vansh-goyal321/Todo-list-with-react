import React from 'react'

const navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-800 text-white py-2'>
      <div className='logo'>
        <span className='font-bold text-xl mx-8 cursor-pointer'>iTask</span>
      </div>
      <ul className='flex gap-4 mx-9'>
        <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all '>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default navbar
