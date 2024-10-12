import React from 'react'
import { InfiniteMovingCards } from './ui/InfiniteMovingCards'
import { testimonials } from '@/data'

const Testimonials = () => {
  return (
    <div id='testi'>
    <div className='relative flex items-center w-full'>
        <InfiniteMovingCards
        items={testimonials}
        direction="left"            
        speed="slow"              
        pauseOnHover={true}         
        className="mt-10"           
      />
    </div>
    </div>
  )
}

export default Testimonials