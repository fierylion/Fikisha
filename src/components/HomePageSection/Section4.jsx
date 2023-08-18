import React from 'react'
import CountUp from 'react-countup'
import {useInViewport} from 'react-in-viewport'
import { Fade } from 'react-awesome-reveal'
const Section4 = () => {
 // no of donors, proposals, ngos, donations
 const data = {
  donors: 100,
  proposals: 100,
  ngos: 10,
  donations: 100
 }

  return (
    <section className='p-3 my-5' id='sect4'>
      <Fade>
        <div className='text-center move_effect move_effect'>
          <div className='row'>
            <div className=' col-lg-3 col-sm-6 p-3'>
              <h4>Deliveries Completed</h4>
              <h1>
                <CountUp start={0} end={data.donations} duration={5} /> +
              </h1>
            </div>
            <div className=' col-lg-3 col-sm-6 p-3 '>
              <h4>Satisfied Customers</h4>
              <h1>
                <CountUp start={0} end={data.proposals} duration={5} /> +
              </h1>
            </div>
            <div className=' col-lg-3 col-sm-6 p-3'>
              <h4>Delivery Agents</h4>
              <h1>
                <CountUp start={0} end={data.donors} duration={5} /> +
              </h1>
            </div>
            <div className='col-sm-6 col-lg-3  p-3 '>
              <h4>Office Locations</h4>
              <h1>
                <CountUp start={0} end={data.ngos} duration={5} /> +
              </h1>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  )
}

export default Section4