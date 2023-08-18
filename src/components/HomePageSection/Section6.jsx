import React from 'react'
import { useGlobalContext } from '../../context';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {AiOutlineArrowRight} from 'react-icons/ai'
import { BiSolidDownvote } from 'react-icons/bi'
import { BiSolidUpvote } from 'react-icons/bi'
import uuid from 'react-uuid';
import { useInViewport } from 'react-in-viewport'
import { Slide } from 'react-awesome-reveal';

const Section6 = ({propos}) => {
 const [page, setPage] = React.useState(0);
 const {divideToThree}=useGlobalContext();
  

   const handleResize = (end = true) => {
     const width = window.innerWidth
     if (width < 780) {
       end && setNoImages(1)
       return 1
     }
     if (width < 1000) {
       end && setNoImages(2)
       return 2
     }

     end && setNoImages(3)
     return 3
   }
   const [noImages, setNoImages] = React.useState(handleResize(false))
   React.useEffect(() => {
   
     window.addEventListener('resize', handleResize)
     return () => window.removeEventListener('resize', handleResize)
   }, [])
 const dividedArr = divideToThree(noImages, propos);

  return (
    <>
      <section className='m-5 move_effect' id='sect6'>
        <Slide>
          <div>
            <div className='d-flex justify-content-around move_effect'>
              <h5 className='w-75'>
                Hear from our satisfied customers about their experiences with
                Fikisha
              </h5>
              <div>
                <button
                  className='btn btn-outline-warning mx-3 my-1'
                  onClick={() =>
                    setPage((page - 1 + dividedArr.length) % dividedArr.length)
                  }
                >
                  <AiOutlineArrowLeft />
                </button>
                <button
                  className='btn btn-outline-warning mx-3 my-1'
                  onClick={() => setPage((page + 1) % dividedArr.length)}
                >
                  <AiOutlineArrowRight />
                </button>
              </div>
            </div>

            <div className='mt-5 '>
              <ProposalCards proposals={dividedArr[page]} />
            </div>
          </div>
        </Slide>
      </section>
    </>
  )
}
const ProposalCards=({proposals, cd})=>{
 

 return (
   
     <div className='row'>
       {proposals.map((proposal, ind) => {
         const propLength = proposals.length
         const propWidthMap = new Map([
           [1, 12],
           [2, 6],
           [3, 4],
         ])
         const size = propWidthMap.get(propLength)
         return (
           <div
           key={uuid()}
             className={`${
               propLength !== 1
                 ? 'col-' + size
                 : 'd-flex justify-content-center'
             }`}
           >
             <div className={`card`} style={{ width: '18rem' }}>
               <img className='card-img-top home_image' src={proposal.img} alt='Card image cap' />
               <div className='card-body'>
              
                 <p className='card-text text-center text-justify  my-3'>
              {proposal.text}
                 </p>
               </div>
               
                
             </div>
           </div>
         )
       })}
     </div>
   
 )
}


export default Section6