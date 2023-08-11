import React from 'react'
import { FaFileContract } from 'react-icons/fa'
import { GiVote } from 'react-icons/gi'
import { HiScale } from 'react-icons/hi'
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
      { inViewport &&
        <div className='row mx-2 move_effect'>
          <div className='col-md-6 p-3'>
            <div className='text-center mb-4'>
              <FaFileContract className='icons' />
              <h3 className='mt-4 mb-2'> NGO Proposals</h3>
            </div>
            <p className='text-justify '>
              Verified NGOs post their impactful projects, and the details are
              recorded on the blockchain for complete transparency.
            </p>
          </div>
          <div className='col-md-6 p-3'>
            <div className='text-center mb-4'>
              <GiVote className='icons' />
              <h3 className='mt-4 mb-2'>Voting Power</h3>
            </div>
            <p className='text-justify'>
              As a donor, you have the power to vote for the projects you
              believe in. Each Filecoin token you contribute grants you voting
              power.
            </p>
          </div>
          <div className='col-md-6 p-3'>
            <div className='text-center mb-4'>
              <HiScale className='icons' />
              <h3 className=''>Decentralized Governance</h3>
            </div>
            <p className='text-justify '>
              The blockchain governs the allocation of funds. The project with
              the most votes receives the funds, ensuring complete fairness and
              accountability.
            </p>
          </div>
        </div>
       } </section>
    
    </>
  )
}

export default Section2