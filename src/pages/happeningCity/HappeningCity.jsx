import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import BannerTwo from '../../components/banner/BannerTwo'
import {motion} from 'framer-motion'

function HappeningCity() {
  return (
    <motion.div
    initial={{width:0}}
    animate={{width:'100%'}}
    exit={{x:window.innerWidth,transition:{duration:0.1}}}
    >
      <Navbar/>
      <BannerTwo/>
      

    </motion.div>
  )
}

export default HappeningCity
