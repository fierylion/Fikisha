import React from 'react'
import { useGlobalContext } from '../context'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children,type }) => {
  
  const { userData, setUserData } = useGlobalContext()
const obtainedData = userData ||(
  localStorage.getItem('aidreach_donor') ||
  localStorage.getItem('aidreach_ngo') ||
  null)
  if (obtainedData) {
    if(obtainedData.type!==type){
      return <Navigate to='/login' replace={true} />
    }
    setUserData(obtainedData)
    return children
  }
  return <Navigate to='/login' replace={true} />
}
export default ProtectedRoute
