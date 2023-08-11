import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { useGlobalContext } from '../../context'
import { useInViewport } from 'react-in-viewport'

  
const Section3 = ({imageCarousel}) => {
  const {divideToThree} =useGlobalContext()
  const myRef = React.useRef()
   const { inViewport, enterCount } = useInViewport(myRef, {}, {}, {})
   


  const handleResize = (end=true)=>{
    const width = window.innerWidth;
    if (width < 420){
      end && setNoImages(1)
      return 1
    }
    if (width < 830) {
        end && setNoImages(2)
        return 2
    }
    

    end && setNoImages(3)
    return 3
    
  }
   const [noImages, setNoImages] = useState(handleResize(false))
   
  useEffect(
    ()=>{
      
      window.addEventListener('resize', handleResize)
      return ()=> window.removeEventListener('resize', handleResize)
    },[]
  )
  const images =(imageCarousel)? divideToThree(noImages, imageCarousel): []
  return (
    <>
      <section className='m-4 ' id='sect3' ref={myRef}>
      { inViewport &&
        <div className='move_effect'>
          <div id='demo' className='carousel slide' data-bs-ride='carousel'>
            {/* Indicators/dots */}
            <div className='carousel-indicators'>
              {images.map((arr, ind) => (
                <button
                  type='button'
                  data-bs-target='#demo'
                  data-bs-slide-to={ind}
                  className={`${ind === 0 && 'active'}`}
                  key={uuid()}
                />
              ))}
            </div>
            {/* The slideshow/carousel */}
            <div className='carousel-inner'>
              {images.map((img, ind) => {
                return (
                  <div
                    className={`carousel-item ${ind === 0 && 'active'}`}
                    key={uuid()}
                  >
                    <div className='row text-center'>
                      {img.map((singleImage, ind) => {
                        const noImages = img.length
                        const imgWidthMap = new Map([
                          [1, 12],
                          [2, 6],
                          [3, 4],
                        ])

                        return (
                          <div
                            className={`col-${imgWidthMap.get(noImages)}`}
                            key={uuid()}
                          >
                            <img
                              src={singleImage}
                              alt={`Image ${ind}`}
                              className='card_img'
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Left and right controls/icons */}
            <button
              className='carousel-control-prev'
              type='button'
              data-bs-target='#demo'
              data-bs-slide='prev'
            >
              <span className='carousel-control-prev-icon' />
            </button>
            <button
              className='carousel-control-next'
              type='button'
              data-bs-target='#demo'
              data-bs-slide='next'
            >
              <span className='carousel-control-next-icon' />
            </button>
          </div>
        </div>
      }
      </section>
    </>
  )
}

export default Section3