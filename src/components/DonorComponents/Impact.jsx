import React from 'react'
import worldGif from '../../assets/delivery.png'
import CountUp from 'react-countup'
import { useInViewport } from 'react-in-viewport'
const Impact = () => {
 const myRef = React.useRef()
 const { inViewport, enterCount } = useInViewport(myRef, {}, {}, {})
  return (
    <section className='m-5 ' ref={myRef}>
      <h1 className='text-center m-4  '>Deliver Anytime, Anywhere</h1>
      <div className='d-flex justify-content-between flex-wrap'>
        <div>
          <img
            src={worldGif}
            alt='world'
            className='d-block mx-auto my-3 rounded w-100'
          />
        </div>

        {inViewport && (
          <div className='mx-auto my-4 p-5 border shadow rounded'>
            <div className='m-2 my-3'>
              <h2>Delivery Agents</h2>
              <h3>
                <CountUp start={0} end={1000} duration={2.4} /> +
              </h3>
            </div>
            <div className='m-2 my-3'>
              <h2>Office Locations</h2>
              <h3>
                <CountUp start={0} end={10} duration={2.4} /> +
              </h3>
            </div>
           
            
          </div>
        )}
      </div>
    </section>
  )
}

export default Impact