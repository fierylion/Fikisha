import React from 'react'
import { Summary,Graphs,DonorProposals,Impact,Invite } from '../components/DonorComponents'

const Donor = () => {
  return (
    <article className='container-fluid'>
      <div className='m-4'>
        <h3>Welcome Back,</h3>
        <h5>Daniel</h5>
        <small>Preview your summary</small>
      </div>
      <Summary />
      <DonorProposals propos={[1,2,3,4,5]}/>
      <Graphs />
      <Impact/>
      <Invite/>
    </article>
  )
}

export default Donor