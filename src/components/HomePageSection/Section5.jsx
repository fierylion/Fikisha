import React from 'react'
import { BiLeaf } from 'react-icons/bi'
import { GiReceiveMoney } from 'react-icons/gi' 
import { LuHeartHandshake } from 'react-icons/lu'
import { GrSecure } from 'react-icons/gr'
import { useInViewport } from 'react-in-viewport'
import { Slide } from 'react-awesome-reveal'
const Section5 = () => {
 
  return (
    <>
      <section className='m-5 ' id='sect5'>
        <div className='row move_effect'>
          <div className='col-sm-6'>
            <Slide>
              <h3 className='mb-sm-3 mb-md-5'>
                Fikisha is all about community empowerment
              </h3>
              <p className='mb-sm-3 mb-md-5 fs-6 w-75'>
                <small>
                  By utilizing local motorcycles and autorickshaws, we're not
                  only reducing delivery costs but also creating income
                  opportunities for individuals in your community
                </small>
              </p>
              <button
                className='btn btn-primary border'
                onClick={() => (window.location.pathname = '/register')}
              >
                Join Us
              </button>
            </Slide>
          </div>

          <div className='col-sm-6'>
            <Slide direction='right'>
              <div className='row text-center '>
                <div className='col-md-6 p-3'>
                  <BiLeaf className='medium_icons' />
                  <h4>Conserving Environment</h4>
                  <p className='home_page_paragraph'>
                    By utilizing eco-friendly modes of transportation, we're
                    reducing carbon emissions and contributing to a cleaner
                    planet.
                  </p>
                </div>
                <div className='col-md-6 p-3'>
                  <GiReceiveMoney className='medium_icons' />
                  <h4>Cost-Effective</h4>
                  <p className='home_page_paragraph'>
                    Our community-driven approach allows us to offer
                    cost-effective delivery solutions without compromising on
                    quality.
                  </p>
                </div>
                <div className='col-md-6 p-3'>
                  <GrSecure className='medium_icons' />
                  <h4>Trusted Deliveries</h4>
                  <p className='home_page_paragraph'>
                    We deliver trust – every time. Our commitment to reliability
                    and honesty ensures secure deliveries you can depend on.
                  </p>
                </div>
                <div className='col-md-6 p-3'>
                  <LuHeartHandshake className='medium_icons' />
                  <h4>Local Empowerment</h4>
                  <p className='home_page_paragraph'>
                    We're not just delivering packages, but also creating income
                    opportunities for local riders, boosting your neighborhood's
                    economy.
                  </p>
                </div>
              </div>
            </Slide>
          </div>
        </div>
      </section>
    </>
  )
}

export default Section5