import React from 'react'
import lastImage from '../../assets/join.png'
import { useInViewport } from 'react-in-viewport'
const Section7 = () => {
 const myRef = React.useRef()
  const { inViewport, enterCount } = useInViewport(myRef, {}, {}, {})
  

  return (
    <>
      <section className='m-5 p-3 ' id='sect7' ref={myRef}>
        {inViewport && (
          <div className='row move_effect'>
            <div className='col-md-6'>
              <img
                src={lastImage}
                alt='Join Us'
                className='last_image mx-auto '
              />
            </div>
            <div className='col-md-6'>
              <h5 className='my-2 mt-3 '>Volunteer</h5>
              <h2 className='my-2'>Helping Today, Helping Tommorow</h2>
              <p className='text-justify'>
                Be a Changemaker with AidReach. Join our movement for
                transparent and impactful charity donations. Together, we can
                make a lasting difference. Join us today!
              </p>
              <button className='btn btn-outline-dark border'>Join Us</button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Section7