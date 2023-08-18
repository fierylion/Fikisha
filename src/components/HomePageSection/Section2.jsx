import React from 'react'
import { FaRoute } from 'react-icons/fa'
import { BiSolidShoppingBags } from 'react-icons/bi'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { useInViewport } from 'react-in-viewport'
const Section2 = () => {
  // scale - balanced - Decentralized
  //check-to-slot - voting
  //file-contract -proposal
  //  NGO Proposals: Verified NGOs post their impactful projects, and the details are recorded on the blockchain for complete transparency.

  // Voting Power: As a donor, you have the power to vote for the projects you believe in. Each Filecoin token you contribute grants you voting power.

  // Decentralized Governance: The blockchain governs the allocation of funds. The project with the most votes receives the funds, ensuring complete fairness and accountability.-
  const myRef = React.useRef()
  const { inViewport, enterCount } = useInViewport(myRef, {}, {}, {})
  


  return (
    <>
      <section className='my-5 ' id='sect2' ref={myRef}>
        {inViewport && (
          <div className='row mx-2 move_effect'>
            <div className='col-md-6 p-3'>
              <div className='text-center mb-4'>
                <BiSolidShoppingBags className='icons' />
                <h3 className='mt-4 mb-2'> Place Your Order</h3>
              </div>
              <p className='text-justify '>
                Use our easy-to-navigate platform to place your delivery order.
              </p>
            </div>
            <div className='col-md-6 p-3'>
              <div className='text-center mb-4'>
                <AiOutlineFieldTime className='icons' />
                <h3 className='mt-4 mb-2'>Choose Your Mode: Fast or Shared</h3>
              </div>
              <p className='text-justify'>
                Need it lightning-fast? Opt for our Ultrafast option. Prefer to
                wait and share cost? Choose our Community Sharing option
              </p>
            </div>
            <div className='col-md-6 p-3'>
              <div className='text-center mb-4'>
                <FaRoute className='icons' />
                <h3 className=''>Track Your Delivery</h3>
              </div>
              <p className='text-justify '>
                Keep tabs on your delivery in real-time as it makes its way to
                its destination.
              </p>
            </div>
          </div>
        )}{' '}
      </section>
    </>
  )
}

export default Section2