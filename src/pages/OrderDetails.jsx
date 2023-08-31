import React, { useMemo } from 'react'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useEffect, useRef } from 'react'
import useFetch from '../hooks'
import { useGlobalContext } from '../context'
import key from '../key'
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
            className='btn btn-outline-'
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
  const [open, setOpen] = useState(false)
  const [distance, setDistance] = useState(null)
  const [duration, setDuration] = useState(null)
  const [directionResults, setDirectionResults] = useState(null)


  const { isLoaded } = useGlobalContext();

  async function calculateRoute() {
    if (!agentLocation || !senderLocation) {
      return
    }

    const directionsService = new window.google.maps.DirectionsService() // Use window.google for TypeScript support
    const results = await directionsService.route({
      origin: new window.google.maps.LatLng(
        agentLocation.latitude,
        agentLocation.longitude
      ),
      destination: new window.google.maps.LatLng(
        senderLocation.lat,
        senderLocation.lng
      ),
      travelMode: window.google.maps.TravelMode.DRIVING,
    })

    const route = results.routes[0].legs[0]
    setDistance(route.distance.text)
    setDuration(route.duration.text)
    setDirectionResults(results)
  }

  useEffect(() => {
    isLoaded && calculateRoute()
  }, [isLoaded, agentLocation, senderLocation])
  const center = useMemo(()=>({
              lat: agentLocation.latitude,
              lng: agentLocation.longitude,
            }))
  return (
    <>
      <button className='btn btn-primary' onClick={() => setOpen(true)}>
        Open Tracking
      </button>
      {open && isLoaded && (
        <div>
          <div className='m-2 mt-5'>
            <li>Distance: {distance}</li>
            <li>Duration: {duration}</li>
          </div>
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName='map-container'
          >
            <Marker
              position={{
                lat: agentLocation.latitude,
                lng: agentLocation.longitude,
              }}
            >
              <div>Sender</div>
            </Marker>
            <Marker position={senderLocation}>
              <div>Receiver</div>
            </Marker>
            {directionResults && (
              <DirectionsRenderer directions={directionResults} />
            )}
          </GoogleMap>
          <button
            className='btn btn-danger mb-5 mt-3'
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
            `ws://fierylion.me/ws/location/${roomName}/`
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
  if(!(data && agentLocation)){
    return <div>Loading.....</div>
  }
 const recLoc = data.receiverLocation
              .split(',').map((n) => parseFloat(n));
  const senLoc = data.senderLocation
              .split(',').map((n) => parseFloat(n))

  return (
    <div>
      <DeliveryItemView data={data} />
      <div>
        latitude: {agentLocation.latitude} longitude: {agentLocation.longitude}
      </div>
      {
        <div>
          <MapModal
            receiverLocation={{lat:recLoc[1], lng:recLoc[0]}
              }
            senderLocation={{lat:senLoc[1], lng:senLoc[0]}
              }
            agentLocation={agentLocation}
          />
        </div>
      }
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