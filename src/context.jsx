import React, { useContext, useReducer, useState, useEffect } from 'react'
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
 const [customer, setCustomer] = useState(
   JSON.parse(localStorage.getItem('fikisha_customer'))
 )
 const [agent, setAgent] = useState(
   JSON.parse(localStorage.getItem('fikisha_agent'))
 )
  
  const divideToThree = (noEle, arr) => {
    let sta = 0
    let en = noEle
    let result = []
    while (sta < arr.length) {
      result.push(arr.slice(sta, en))
      sta = en
      en += noEle
    }
    return result
  }
  const [modalData, setModalData] = useState({center:{
    lat: 0,
    lng: 0,
  }})
   const [receiverLocation, setReceiverLocation] = useState({
     lat: 0,
     lng: 0,
   })
   const [senderLocation, setSenderLocation] = useState({ lat: 0, lng: 0})
  


  return (
    <AppContext.Provider
      value={{
        modalData,
        setModalData, 
        senderLocation,
        setSenderLocation,
        receiverLocation,
        setReceiverLocation,
        divideToThree,
        customer,
        setCustomer,
        agent,
        setAgent,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// custom hook
const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppContext, AppProvider, useGlobalContext }

