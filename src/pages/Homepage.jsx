import React from 'react'
import { Section1, Section2, Section3, Section4, Section5, Section6, Section7 } from '../components/HomePageSection'


import imageCarousel from '../components/HomePageSection/imageCarousel'

const Homepage = () => {
  
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 imageCarousel={imageCarousel} />
      <Section4 />
      <Section5 />
      <Section6 propos={[1, 2, 3, 4, 5, 6]} />
      <Section7 />
    
    </>
  )
}

export default Homepage