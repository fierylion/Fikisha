import React from 'react'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useEffect, useRef } from 'react'
import useFetch from '../hooks'
import { useGlobalContext } from '../context'

import { useState } from 'react'
const OrderDetails = () => {
  const {obtainData, data, isLoading, error} = useFetch()
  const {customer} = useGlobalContext()
    useEffect(() => {
      obtainData(
        '/customer/order',
        'get',
        {},
        {
          headers: {
            Authorization: `Bearer ${customer.token}`,
          },
        }
      )
    }, [customer])
  const [category, setCategory] = useState('pending')
  const [currentData, setCurrentData] = useState([])
  useEffect(() => {
    const filterOders = (dt, ind) => {
      if (category === 'pending') {
        return dt.transport === null
      }
      if (category === 'inprogress') {
        return dt.transport !== null && dt.transport.status === 'pending'
      }
      return dt.transport !== null && dt.transport.status === 'delivered'
    }
    if (data) {
      data.orders.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
      setCurrentData(data.orders.filter(filterOders))
    }
  }, [category, data])
 
  return (
    <section>
      <h1 className='text-center'>Order Details</h1>

      <div>
        <div className='d-flex justify-content-around'>
          <button
            className='btn btn-outline-primary'
            onClick={() => setCategory('pending')}
          >
            Pending Driver
          </button>
          <button
            className='btn btn-outline-warning'
            onClick={() => setCategory('inprogress')}
          >
            In Progress Delivery
          </button>
          <button
            className='btn btn-outline-success'
            onClick={() => setCategory('delivered')}
          >
            {' '}
            Delivered
          </button>
        </div>
      </div>
      <div>
        {currentData.map((order, index) => (
          <SingleDetail data={order} key={index} category={category} />
        ))}
      </div>
    </section>
  )
}
const SingleDetail = ({data, category}) => {

  
  
  return (
    <>
      <div className='p-4'>
        {category === 'pending' && <PendingDelivery data={data} />}
        {category === 'inprogress' && <InProgressDelivery data={data} />}
        {category === 'delivered' && <DeliveredDelivery data={data} />}
      </div>
    </>
  )
}
const MapModal = ({ receiverLocation, senderLocation, agentLocation }) => {
  const [open, setOpen] = React.useState(false)
 const [distance, setDistance] = useState(null)
 const [direction, setDirection] = useState(null)
 const [directionResults, setDirectionResults] = useState({})
  const key = 'AIzaSyBP3AWvc5kUTn8VwRLjQxxLUt3yj8izYT0'
 const { isLoaded } = useJsApiLoader({
   id: 'google-map-scripts',
   googleMapsApiKey: key,
 })
 async function calculateRoute() {
   if (!agentLocation || !senderLocation) {
     return
   }

   const directionsService = new google.maps.DirectionsService()
   const results = await directionsService.route({
     origin: new google.maps.LatLng(agentLocation.lat, agentLocation.lng),
     destination: new google.maps.LatLng(
       senderLocation.lat,
       senderLocation.lng
     ),
     travelMode: google.maps.TravelMode.DRIVING,
   })

   const distance = results.routes[0].legs[0].distance.text
   const duration = results.routes[0].legs[0].duration.text
   setDistance(distance)
   setDirection(duration)
   setDirectionResults(results)

   
 }

  const mapRef = useRef()
  

  return (
    <>
      <button className='btn btn-primary' onClick={() => setOpen(true)}>
        Open Tracking
      </button>
      {isLoaded && (
        <div>
          <GoogleMap
            zoom={10}
            center={senderLocation}
            mapContainerClassName='map-container'
          >
            <Marker
              location={{ lat: agentLocation.lat, lng: agentLocation.lng }}
            >
              <div>Sender</div>
            </Marker>
            <Marker
              location={{ lat: senderLocation.lat, lng: senderLocation.lng }}
            >
              <div>Receiver</div>
            </Marker>
            <DirectionsRenderer directions={directionResults} />
          </GoogleMap>
          <button
            className='btn btn-danger mb-5'
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  )
}
const DeliveryItemView = ({ data }) => {
  const created_at = new Date(data.created_at)
  const [location, setLocation] = useState()

  return (
    <div>
      <h6 className='col-6'>Category: {data.category}</h6>
      <div className='row '>
        <h6 className='col-4 text-muted'>
          Created_At: {created_at.toLocaleDateString()}{' '}
          {created_at.toLocaleTimeString()}
        </h6>
        <h6 className='col-6'></h6>
        <h6 className='col-6'>Sender: {data.senderName}</h6>
        <h6 className='col-6'>Sender Phone: {data.senderPhone}</h6>
        <h6 className='col-6'>Receiver: {data.receiverName}</h6>
        <h6 className='col-6'>Receiver Phone: {data.receiverPhone}</h6>
      </div>
    </div>
  )
}

const InProgressDelivery = ({ data }) => {
  
  const [agentLocation, setAgentLocation] = useState({
    latitude: 0,
    longitude: 0,
  })
  const agent = data.transport?.agent
  const roomName = `agent-${data.transport?.agent}`
  useEffect(
    () => {
      const connect = () => {
        if (agent) {
          const socket = new WebSocket(
            `ws://localhost:8000/ws/location/${roomName}/`
          )
          socket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            console.log(data)
            setAgentLocation(data)
          }
        }
      }
      connect()
    },[agent]

  )
  

  return (
    <div>
      <DeliveryItemView data={data} />
      <div>
        latitude: {agentLocation.latitude} longitude: {agentLocation.longitude}
      </div>
      <div>
        <MapModal receiverLocation={data.receiverLocation.split(',')} senderLocation={data.senderLocation.split(',')} agentLocation = {agentLocation}/>
      </div>
    </div>
  )
}
const DeliveredDelivery = ({ data }) => {
  return (
    <div>
      <DeliveryItemView data={data} />
      <div>

      </div>
    </div>
  )
}
const PendingDelivery = ({ data }) => {
  return (
    <div>
      <DeliveryItemView data={data} />
      <div></div>
    </div>
  )
}


export default OrderDetails