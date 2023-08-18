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
import useFetch from '../hooks'
import { useGlobalContext } from '../context'
import MessageAlerts from '../components/MessageAlerts'
import { useNavigate } from 'react-router-dom'
const Ngos = () => {
   const { agent } = useGlobalContext()
   const { data, isLoading, error, obtainData } = useFetch()
   React.useEffect(() => {
     obtainData(
       `/agent`,
       'get',
       {},
       {
         headers: {
           Authorization: `Bearer ${agent.token}`,
         },
       }
     )
   }, [])
   const navigate = useNavigate()
  return (
    <article className='container-fluid'>
      <div className='m-4'>
        <h3>Welcome Back,</h3>
        <h5>Agent</h5>
        <small>Preview your summary</small>
        <small className='d-block   p-1 my-2 fw-bold text-muted '>
          Email: {data && data.agent.email}
        </small>
      </div>
      <button className='btn btn-outline-success' onClick={()=>navigate('/agent/orders')}>Orders</button>
      <div>
        {error && (
          <MessageAlerts
            msg={error.response?.data?.msg || error.response?.data?.err}
            color={'danger'}
          />
        )}
        {isLoading && (
          <MessageAlerts msg={'Fetching your information!'} color={'warning'} />
        )}
      </div>

      {data && (
        <Summary success={data.orders} number={data.successfull_orders} />
      )}
     
     
    </article>
  )
}

export default Ngos
