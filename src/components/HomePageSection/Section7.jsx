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
              <h2 className='my-3'>Ready to Get Started?</h2>
              <p className='text-justify'>
                Experience the Future of Package Delivery Today
              </p>
              <button className='btn btn-primary border'>Join Us</button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Section7