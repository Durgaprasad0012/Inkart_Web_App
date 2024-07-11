import React from 'react'
import image from "../../../assets/img/loginbg.jpg";
import image2 from "../../../assets/img/d.jpg";
import './Banners.css'

const Banners = () => {
  return (
    <div className='banner-content'>
        <img src={image2} alt='banners'/>
        <button>info</button>    
    </div>
  )
}

export default Banners