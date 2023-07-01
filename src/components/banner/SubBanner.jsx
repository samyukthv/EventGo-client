import React from 'react'
import img1 from '../../assets/images/sustainable_event_management_positive_impact_575x843.jpg'
import img2 from '../../assets/images/sam-moghadam-khamseh-Wnn0_XvXLfU-unsplash.jpg'
import img3 from '../../assets/images/massive-mural-art-exhibition-2.jpg'
import './SubBanner.css'

function SubBanner() {
  return (
    <div className="max-w-[1140px] m-auto w-full md:flex mt-[-120px]">
    <div className="relative p-4 transform hover:scale-105 transition duration-500">
      <h3 className='absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-2xl font-bold'>Creating the best day ever.</h3>
      <img className='w-72 h-72 object-cover relative border-4 border-white shadow-lg' src={img1} alt="" />
    </div>
    <div className="relative p-4 transform hover:scale-105 transition duration-500">
      <h3 className='absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-2xl font-bold'>Make your reservation.</h3>
      <img className='w-72 h-72 object-cover relative border-4 border-white shadow-lg' src={img2} alt="" />
    </div>
    <div className="relative p-4 transform hover:scale-105 transition duration-500">
      <h3 className='absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-2xl font-bold'>Discover the Best Events in Town!</h3>
      <img className='w-72 h-72 object-cover relative border-4 border-white shadow-lg' src={img3} alt="" />
    </div>
  </div>
  
  )
}

export default SubBanner
