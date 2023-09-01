import React from 'react'
import { useEffect, useRef, useMemo } from 'react'
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
  const { navigate } = useNavigate()
  const { agent } = useGlobalContext()
  const [category, setCategory] = useState('pending')
  const [currentData, setCurrentData] = useState([])
  useEffect(() => {
    obtainData(
      '/agent/order/deliver',
      'get',
      {},
      {
        headers: {
          Authorization: `Bearer ${agent.token}`,
        },
      }
    )
  }, [agent])
  useEffect(
    ()=>{
      const filterOders = (dt, ind)=>{
        
      if(category==='pending'){
        return (dt.transport === null)
      }
      if(category==='inprogress'){
        console.log(dt)
        return ( dt.status==='pending')
      }
      return dt.transport !== null && dt.status === 'delivered'
    }
    if(data){
      data.orders.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
    
      setCurrentData(data.orders.filter(filterOders))
    }

    }, [category, data]
  )
 

  return (
    <section>
      <button
        className='btn btn-outline-dark '
        onClick={() => (window.location.pathname = '/agent')}
      >
        Back
      </button>
      <h1 className='text-center'> Some Orders You Accepted</h1>
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
        <div className='d-flex justify-content-around'>
       
          <button
            className='btn btn-outline-primary'
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
        {
          currentData.map((order, index) => (
            <SingleDetail data={order} key={index} category={category}/>
          ))}
      </div>
    </section>
  )
}
const SingleDetail = ({ data, category }) => {
 
 console.log('current data', category)

  return (
    <>
      <div className='m-3'>
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

  const { isLoaded } = useGlobalContext()

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
  const center = useMemo(() => ({
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
      <h6 className='col-6'>Category: {data.product.category}</h6>
      <div className='row '>
        <h6 className='col-4 text-muted'>
          Created_At: {created_at.toLocaleDateString()}{' '}
          {created_at.toLocaleTimeString()}
        </h6>
        <h6 className='col-6'></h6>
        <h6 className='col-6'>Sender: {data.product.senderName}</h6>
        <h6 className='col-6'>Sender Phone: {data.product.senderPhone}</h6>
        <h6 className='col-6'>Receiver: {data.product.receiverName}</h6>
        <h6 className='col-6'>Receiver Phone: {data.product.receiverPhone}</h6>
      </div>
    </div>
  )
}
const InProgressDelivery = ({ data }) => {
  const senLoc = data.product.senderLocation
              .split(',').map((n) => parseFloat(n))
  const [location, setLocation] = useState({latitude:0, longitude:0})
  useEffect(() => {
        const watchPosition = navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              setLocation({latitude, longitude})
            },
            (error) => {
              console.error('Error getting location:', error)
            }
          )
          return () => {
            navigator.geolocation.clearWatch(watchPosition)
           

          } }, [])

  return (
    <div>
      <DeliveryItemView data={data} />
      <div>
        <MapModal senderLocation={{lat:senLoc[1], lng:senLoc[0]}} agentLocation={location} />
      </div>
    </div>
  )
}

const DeliveredDelivery = ({ data }) => {
  return (
    <div>
    <DeliveryItemView data={data}/>
    <div>

    </div>
    </div>
  )
}
const PendingDelivery = ({ data }) => {
  console.log('inprogress')
  return (
    <div>
    <DeliveryItemView data={data}/>
    <div>
   
    </div>
    </div>
  )
}



export default OrderDetails
