import React from 'react'
import CountUp from 'react-countup'
import {useInViewport} from 'react-in-viewport'
const Section4 = () => {
 // no of donors, proposals, ngos, donations
 const data = {
  donors: 100,
  proposals: 100,
  ngos: 100,
  donations: 100
 }
 const myRef = React.useRef();
 const {inViewport, enterCount} = useInViewport(myRef, {}, {}, {});

  return (
    <section className='p-3 my-5' id='sect4' ref={myRef}>
      {inViewport && (
        <div className='text-center move_effect move_effect'>
          <div className='row'>
            <div className=' col-lg-3 col-sm-6 p-3'>
              <h4>Impact Contributions</h4>
              <h1>
                <CountUp start={0} end={data.donations} duration={5} /> +
              </h1>
            </div>
            <div className=' col-lg-3 col-sm-6 p-3 '>
              <h4>Empowerment Proposals</h4>
              <h1>
                <CountUp start={0} end={data.proposals} duration={5} /> +
              </h1>
            </div>
            <div className=' col-lg-3 col-sm-6 p-3'>
              <h4>Humanitarian Supporters</h4>
              <h1>
                <CountUp start={0} end={data.donors} duration={5} /> +
              </h1>
            </div>
            <div className='col-sm-6 col-lg-3  p-3 '>
              <h4>Change Agents</h4>
              <h1>
                <CountUp start={0} end={data.ngos} duration={5} /> +
              </h1>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Section4