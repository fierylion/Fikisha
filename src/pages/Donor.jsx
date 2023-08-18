import React from 'react'
import { Summary,Graphs,DonorProposals,Impact,Invite } from '../components/DonorComponents'
import useFetch from '../hooks'
import { useGlobalContext } from '../context'
import MessageAlerts from '../components/MessageAlerts'
import { useNavigate } from 'react-router-dom'
const Donor = () => {
  const { customer } = useGlobalContext()
  const { data, isLoading, error, obtainData } = useFetch()
  React.useEffect(() => {
    obtainData(`/customer`, 'get', {}, {
      headers:{
      Authorization: `Bearer ${customer.token}`,
      },
    })
  }, [])
  const navigate = useNavigate()
  return (
    <article className='container-fluid'>
      <div>
        {error && (
          <MessageAlerts
            msg={error.response?.data?.msg || error.response?.data?.err}
            color={'danger'}
          />
        )}
        {isLoading && (
          <MessageAlerts
            msg={'Fetching your information!'}
            color={'warning'}
          />
        )}
      </div>
      <div className='m-4'>
        <h3>Welcome Back,</h3>
        <h5>Daniel</h5>
        <small>Preview your summary</small>
        <small className='d-block   p-1 my-2 fw-bold text-muted '>Email: {data && data.customer.email}</small>
        <button className='btn btn-outline-primary ms-2 my-3' onClick={()=>{ navigate('/customer/order')

        }}>Place Order</button>
      </div>
      {data && <Summary success={data.orders} number = {data.successfull_orders}/>}
      {/* <DonorProposals propos={[1, 2, 3, 4, 5]} /> */}
      <Graphs />
      <Impact />
      <Invite />
    </article>
  )
}

export default Donor