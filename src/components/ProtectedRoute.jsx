import React, {useEffect} from 'react'
import { useGlobalContext } from '../context'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children,type }) => {
  
  const { agent, setAgent , customer, setCustomer } = useGlobalContext()
const cust = JSON.parse(localStorage.getItem('fikisha_customer'))
const ag = JSON.parse(localStorage.getItem('fikisha_agent'))
useEffect(() => {
  if (cust) {
    setCustomer(cust)
  }
  if (ag) {
    setAgent(ag)
  }
}, [])
  if (type === 'customer' && customer) {
    return children
  }
  if (type === 'agent' && agent) {
    return children
  }
  return <Navigate to='/login' replace={true} />
}
export default ProtectedRoute
