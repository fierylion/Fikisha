import React from 'react'
import homeImage from '../../assets/homeimg_1.png'
import { useInViewport } from 'react-in-viewport'
import { Fade, Slide } from 'react-awesome-reveal'
const Section1 = () => {
 


  return (
    <>
      <section className={`py-5 `} id='sect1'>
        <div className='d-flex flex-wrap justify-content-between home-headers-text move_effect'>
          <Slide>
            <div className='text-justify w-50  mx-4'>
              <h3 className='text-justify  lh-base'>
                Efficient, Affordable, and Reliable Package Delivery Solution
              </h3>
              <p className='text-justify my-4 text-wrap w-100'>
                Empowering Local Communities Through Shared Package Deliveries:
                Experience Fast, Affordable, and Eco-Conscious Package Delivery
                with Fikisha.
              </p>
              <button
                className='btn btn-outline-dark'
                onClick={() => (window.location.pathname = '/register')}
              >
                Get Started
              </button>
            </div>
          </Slide>
          <Slide direction='right'>
            <img
              src={homeImage}
              alt=''
              className='home-charity-img float-end  img-fluid  p-2'
            />
          </Slide>
        </div>
      </section>
    </>
  )
}

export default Section1