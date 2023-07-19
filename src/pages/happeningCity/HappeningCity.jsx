import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import BannerTwo from '../../components/banner/BannerTwo'
import {motion} from 'framer-motion'
import Footer from '../../components/footer/Footer'
import Content from './Content'

function HappeningCity() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    <motion.div
    initial={{width:0}}
    animate={{width:'100%'}}
    exit={{x:window.innerWidth,transition:{duration:0.1}}}
    >
      <Navbar/>
      <BannerTwo/>
      <Content/>
      <Footer/>

    </motion.div>
  )
}

export default HappeningCity
