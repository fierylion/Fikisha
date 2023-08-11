import React from 'react'
import {
  Summary,
  Graphs,
  DonorProposals,
  Impact,
  Invite,
  VerificationComponent,
  ProposalModal,
  VerificationModal
} from '../components/NgoComponents'

const Ngos = () => {
  const isVerified = true;
  return (
    <article className='container-fluid'>
      <div className='m-4'>
        <h3>Welcome Back,</h3>
        <h5>Fierylion Org</h5>
        {isVerified && <small>Preview your summary</small>}
      </div>
      { !isVerified && 
      <VerificationComponent status={'unsubmitted'}/>
      }

      {isVerified && (
        <>
          <Summary />
          <DonorProposals propos={[1, 2, 3, 4, 5]} />
          <Graphs />
        </>
      )}
      <Impact />
      <Invite />
      <ProposalModal/>
      <VerificationModal/>
    </article>
  )
}

export default Ngos
