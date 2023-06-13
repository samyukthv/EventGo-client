import React from 'react'
import image from "../../assets/images/edwin-andrade-6liebVeAfrY-unsplash.jpg"

function Banner() {
  
  return (
    <div className="w-full h-[70vh]">
            <img src={image} alt="" className='w-full h-[70vh] object-cover' />
            <div className='max-w-[1140px] m-auto'>
                <div className="absolute top-[30%] w-full md:-[50%] max-w-[600px] h-full flex flex-col text-white p-4">
                    <h1 className='font-bold text-4xl'>"Plan your next event with ease."</h1>
                    <h2 className='text-4xl py-4 italic'>with <span className='font-bold'>EventGo</span></h2>
                    <p>
                        Nothing makes you feel better than when you get into a hotel bed, and the sheets feel so good. Why shouldn't you wake up like that every day? Spend money on your mattress and bedding because these things make a difference on your sleep and, ultimately, your happiness.
                    </p>
                </div>
            </div>
        </div>
  )
}

export default Banner
