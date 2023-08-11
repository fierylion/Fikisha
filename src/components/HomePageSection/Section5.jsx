import React from 'react'
import { PiBowlFoodFill } from 'react-icons/pi'
import {MdHealthAndSafety} from 'react-icons/md' 
import {FaHandHoldingWater} from 'react-icons/fa'
import {MdCastForEducation} from 'react-icons/md'
import { useInViewport } from 'react-in-viewport'
const Section5 = () => {
  const myRef = React.useRef()
  const { inViewport, enterCount } = useInViewport(myRef, {}, {}, {})
 
  return (
    <>
      <section className='m-5 ' id='sect5' ref={myRef}>
        {inViewport && (
          <div className='row move_effect'>
            <div className='col-sm-6'>
              <h3 className='mb-sm-3 mb-md-5'>
                Connect with Nonprofit Organizations Worldwide{' '}
              </h3>
              <p className='mb-sm-3 mb-md-5 fs-6 w-75'>
                <small>
                  We envision a world where every charitable contribution, no
                  matter how small, leads to significant positive change. By
                  combining blockchain technology with a community-driven
                  approach, we foster transparency, trust, and collaboration
                  among donors and NGOs.
                </small>
              </p>
              <button className='btn btn-outline-dark border'>Donate</button>
            </div>
            <div className='col-sm-6'>
              <div className='row text-center '>
                <div className='col-sm-6 p-3'>
                  <PiBowlFoodFill className='medium_icons' />
                  <h4>Healthy Food</h4>
                  <p className='home_page_paragraph'>
                    We tirelessly provide nutritious meals, ending empty
                    stomachs.
                  </p>
                </div>
                <div className='col-sm-6 p-3'>
                  <MdHealthAndSafety className='medium_icons' />
                  <h4>Medical Help</h4>
                  <p className='home_page_paragraph'>
                    Quality healthcare is a basic right, often inaccessible.
                  </p>
                </div>
                <div className='col-sm-6 p-3'>
                  <FaHandHoldingWater className='medium_icons' />
                  <h4>Clean Water</h4>
                  <p className='home_page_paragraph'>
                    Clean, safe water remains elusive for countless. We ensure
                    access to clean sources
                  </p>
                </div>
                <div className='col-sm-6 p-3'>
                  <MdCastForEducation className='medium_icons' />
                  <h4>Education</h4>
                  <p className='home_page_paragraph'>
                    Support empowers all ages with knowledge, skills, and
                    opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Section5