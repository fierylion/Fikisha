import React from 'react'
import { Section1, Section2, Section3, Section4, Section5, Section6, Section7 } from '../components/HomePageSection'


import imageCarousel from '../components/HomePageSection/imageCarousel'

const testmonials = [
  {
    img: imageCarousel[0],
    text: '"Fikisha made sending gifts to my family across town so convenient. Fast and hassle-free, they\'ve won my trust!"',
  },
  {
    img: imageCarousel[1],
    text: '\"I love how Fikisha cares for the environment while delivering my packages promptly. It\'s a win-win!\"',
  },
  {
    img: imageCarousel[2],
    text: "\"Choosing Fikisha's cost-effective service saved me money without compromising on quality. Impressive!\"",
  },
  {
    img: imageCarousel[3],
    text: '\"The local delivery agents are friendly and professional. Fikisha truly connects communities.\"',
  },
  {
    img: imageCarousel[4],
    text: '\"Efficient deliveries and a greener approach? Fikisha is the way forward!\"',
  },
  {
    img: imageCarousel[5],
    text: "\"I appreciate the transparency in tracking my delivery. Fikisha's service is both reliable and informative.\"",
  },
]
const Homepage = () => {
  
  return (
    <>
      <Section1 />
      <Section2 />
      {/* <Section3 imageCarousel={imageCarousel} /> */}
      <Section4 />
      <Section5 />
      <Section6 propos={testmonials} />
      <Section7 />
    
    </>
  )
}

export default Homepage