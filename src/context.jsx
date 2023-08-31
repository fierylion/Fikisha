import React, { useContext, useReducer, useState, useEffect } from 'react'
import api from './api'
import axios from 'axios'
import key from './key'
import { useJsApiLoader } from '@react-google-maps/api'
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
   //Update driver's location
    useEffect(() => {
      const sendDriverLocation = async () => {
        if(!agent) return
        console.log('entered')
        try{
          const req = await api.get(`/agent`, {
            headers: {
              Authorization: `Bearer ${agent.token}`,
            },
          })
          const { agent: ag } = req.data

          const roomName = `agent-${req.data.id}`
          const connect = () => {}
          const socket = new WebSocket(
            `wss://fierylion.me/ws/location/${roomName}/`
          )
         
          // Function to send location updates to the server
          const sendLocationUpdate = (latitude, longitude) => {
            const locationData = {
              latitude,
              longitude,
            }
            socket.send(JSON.stringify(locationData))
          }
          // Watch the driver's position and send updates
          const watchPosition = navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              sendLocationUpdate(latitude, longitude)
            },
            (error) => {
              console.error('Error getting location:', error)
            }
          )
          return () => {
            navigator.geolocation.clearWatch(watchPosition)
            socket.close()

          }
        }catch(err){
          console.log('error')
        }
      }
      sendDriverLocation()
    }, [agent])
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-scripts',
    googleMapsApiKey: key,
    libraries: ['places'],
  })

  return (
    <AppContext.Provider
      value={{
        isLoaded,
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

