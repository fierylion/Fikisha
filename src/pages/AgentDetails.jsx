import React from 'react'
import { useEffect, useRef } from 'react'
import useFetch from '../hooks'
import { useGlobalContext } from '../context'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useState } from 'react'
import MessageAlerts from '../components/MessageAlerts'
import { useNavigate } from 'react-router-dom'
const OrderDetails = () => {
  const { obtainData, data, isLoading, error } = useFetch()
  const {navigate} = useNavigate()
  const { agent } = useGlobalContext()
  useEffect(() => {
    obtainData(
      '/agent/orders',
      'get',
      {},
      {
        headers: {
          Authorization: `Bearer ${agent.token}`,
        },
      }
    )
  }, [agent])
  if (data) {
   data.orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  }
  
  return (
    <section>
    <button className='btn btn-outline-dark ' onClick={()=>window.location.pathname='/agent'}>Back</button>
      <h1 className='text-center'>  Hello, Accept Some Orders</h1>
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
      <div>
        {data &&
          data.orders.map((order, index) => (
            <SingleDetail data={order} key={index} />
          ))}
      </div>
    </section>
  )
}
const SingleDetail = ({ data }) => {
  const [location, setLocation] = useState()
  const {agent} = useGlobalContext()
  const created_at = new Date(data.created_at)
   const {obtainData, data:resData, isLoading, error} = useFetch()
  const handleAccept = ()=>{
   
    obtainData(`/agent/order/accept/${data.id}`, 'get', {}, {
      headers: {
        Authorization: `Bearer ${agent.token}`
      }
    }) 

  }
 

  return (
    <>
      <div>
        {error && (
          <MessageAlerts
            msg={error.response?.data?.msg || error.response?.data?.err}
            color={'danger'}
          />
        )}
        {resData && (
          <MessageAlerts msg={'Thank you for accepting the order, You can check the order'} color={'success'} />
        )}
        {isLoading && (
          <MessageAlerts msg={'Snding Data!!!'} color={'warning'} />
        )}
      </div>
      {resData && <button className='btn btn-outline-success ' onClick={()=>window.location.pathname='/agent/orders/accepted'}>Accepted Orders</button>}
      { !resData &&
      <div className='border rounded p-4 text-capitalize  mx-auto'>
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
        <div>
          <MapModal
            senderLocation={data.senderLocation.split(',')}
            receiverLocation={data.receiverLocation.split(',')}
            setLoc={setLocation}
          />
          <button className='btn btn-success mx-auto' onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
      }
    </>
  )
}
const MapModal = ({ receiverLocation, senderLocation, setLoc, closeMap }) => {
  const [open, setOpen] = React.useState(false)
  senderLocation = {lat: parseFloat(senderLocation[1]), lng:parseFloat( senderLocation[0])}
  receiverLocation = {lat:parseFloat(receiverLocation[1]), lng:parseFloat(receiverLocation[0])}
const [distance, setDistance] = useState(null)
const [duration, setDuration] = useState(null)
const [directionResults, setDirectionResults] = useState(null)

const { isLoaded } = useGlobalContext()

async function calculateRoute() {
  if (!receiverLocation || !senderLocation) {
    return
  }

  const directionsService = new window.google.maps.DirectionsService() // Use window.google for TypeScript support
  const results = await directionsService.route({
    origin: new window.google.maps.LatLng(
      senderLocation.lat,
      senderLocation.lng
    ),
    destination: new window.google.maps.LatLng(
      receiverLocation.lat,
      receiverLocation.lng
    ),
    travelMode: window.google.maps.TravelMode.DRIVING,
  })

  const route = results.routes[0].legs[0]
  setDistance(route.distance.text)
  setDuration(route.duration.text)
  setDirectionResults(results)
}
useEffect(() => {
  console.log(isLoaded)
  isLoaded && calculateRoute()
}, [isLoaded])



  return (
    <>
    {senderLocation && receiverLocation &&
      <>
        <button className='btn btn-primary' onClick={() => setOpen(true)}>
          Open Tracking
        </button>
        {open && isLoaded && (
          <div>
            <GoogleMap
              zoom={10}
              center={senderLocation}
              mapContainerClassName='map-container'
            >
              <Marker position={senderLocation} />
              <Marker position={receiverLocation} />

              {directionResults && (
                <DirectionsRenderer directions={directionResults} />
              )}
            </GoogleMap>
            <button
              className='btn btn-danger mb-5'
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        )}
      </>}
    </>
  )
}

export default OrderDetails
