import React from 'react'
import {BsThreeDots} from 'react-icons/bs'
import { Fade, Slide } from 'react-awesome-reveal'
const Summary = ({success, number}) => {
  return (
    <section>
      <div className='row'>
        <div className='col-sm-6'>
          <Slide>
            <SingleSummary name={'Orders'} amount={success} />
          </Slide>
        </div>
        <div className='col-sm-6'>
          <Slide direction='right'>
            <SingleSummary name={'Delivered'} amount={number} />
          </Slide>
        </div>
      </div>
    </section>
  )
}
const SingleSummary =({name, amount})=>{
 return (
   <div className='col-sm-6  '>
     <div className='m-5 text-center border h-75 w-75 shadow rounded p-4 d-flex flex-column '>
       <div className='d-flex mt-auto'>
         <h3 className='text-capitalize mt-auto fw-1 me-1'>{name}</h3>
         <BsThreeDots className='ms-auto' />
       </div>
       <div className='d-flex mt-3'>
         <h2 className='text-start mb-auto me-2 text-nowrap'>{amount}</h2>
         <small className='align-self-end  p-1 bg-warning rounded shadow small_text text-primary'>3d ago</small>
       </div>
     </div>
   </div>
 )
}

export default Summary