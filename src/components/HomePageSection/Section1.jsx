import React from 'react'
import charityImage from '../../assets/charit.png'
import { useInViewport } from 'react-in-viewport'
const Section1 = () => {
  const myRef = React.useRef()
   const { inViewport, enterCount } = useInViewport(myRef, {}, {}, {});

  return (
    <>
      <section className={`py-5 `} id='sect1' ref={myRef}>
      { inViewport &&
        <div className='d-flex flex-wrap justify-content-between home-headers-text move_effect'>
          <div className='text-justify w-50  mx-4'>
            <h3 className='text-justify  lh-base'>
              Empowering Transparent Charity Donations with Web3
            </h3>
            <p className='text-justify my-4 text-wrap w-100'>
              Join us to revolutionize giving, empowering NGOs, and creating a
              better world through blockchain transparency. Vote for change!
            </p>
          </div>
          <img
            src={charityImage}
            alt=''
            className='home-charity-img float-end  img-fluid '
          />
        </div>
        }  
        </section>
    
     
    </>
  )
}

export default Section1