import React from 'react'
import bannerImg from '../../assets/banner.png'
const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>

       <div className='md:w-1/2 w-full flex items-center md:justify-end '>
        <img src={bannerImg} alt=''/>
      </div>

      <div className=' md:w-1/2 w-full'>
        <h1 className='md:text-5xl font-medium mb-7'>New Releases,This Week!</h1>
        <p className='mb-18'>It’s time to refresh your reading list with the latest and greatest releases in the literary world. From heart-pounding thrillers to captivating memoirs, this week’s new arrivals have something for every reader
        </p>
        <button className='btn-primary'>Join US</button>
      </div>  

    </div>
  )
}

export default Banner
