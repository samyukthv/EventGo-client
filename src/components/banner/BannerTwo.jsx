import React, { useEffect, useState } from 'react'
import image from "../../assets/images/anthony-delanoix-hzgs56Ze49s-unsplash.jpg"
import { bannerOne } from '../../api/adminApi'
import LazyLoad from 'react-lazy-load';

function Banner() {
    const [banner,setBanner]=useState(null)
    useEffect(()=>{
     bannerOne().then(res=>{
        if(res.data.banner){
            setBanner(res.data.banner)
        }
     }).catch(err=>{
 
     })
    },[]) 
  return (
    <LazyLoad  offset={200}>

    <div className="w-full h-[70vh] sm:w-full">
            <img src={banner?banner[1].image:null} alt="" className='w-full h-[70vh] object-cover' />
            <div className='max-w-[1140px] m-auto'>
                <div className="absolute top-[40%] w-full md:-[50%] max-w-[600px] h-full flex flex-col text-white p-4">
                    <h1 className='font-bold text-4xl bg-gradient-to-b from-violet-500 to-pink-100  text-transparent bg-clip-text'>"{banner?banner[1].title:null}"</h1>
                    <h2 className='text-4xl py-4 italic'>with <span className='font-monoton bg-gradient-to-t from-violet-500 to-pink-100  text-transparent bg-clip-text'>EventGo</span></h2>
                    <p>
                    {banner?banner[1].description:null}
                    </p>
                </div>
            </div>
        </div>

    </LazyLoad>
  )
}

export default Banner
