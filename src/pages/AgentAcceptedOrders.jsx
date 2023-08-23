import React from 'react'
import { useEffect, useRef } from 'react'
import useFetch from '../hooks'
import { useGlobalContext } from '../context'
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Source,
  Layer,
} from 'react-map-gl'
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
        return (dt.transpot !== null && dt.transport.status==='pending')
      }
      return dt.transpot !== null && dt.transport.status === 'delivered'
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
        {
          currentData.map((order, index) => (
            <SingleDetail data={order} key={index} />
          ))}
      </div>
    </section>
  )
}
const SingleDetail = ({ data, category }) => {
 
 

  return (
    <>
     {category === 'pending' && <PendingDelivery data={data} />}
      {category === 'inprogress' && <InProgressDelivery data={data} />}
      {category === 'delivered' && <DeliveredDelivery data={data} />}
    </>
  )
}
const MapModal = ({ receiverLocation, senderLocation, setLoc, closeMap }) => {
  const [open, setOpen] = React.useState(false)
  const token =
    'sk.eyJ1IjoiZmllcnlsaW9uIiwiYSI6ImNsbGc4a2RyMjBjcDUzZHBxcm5ndzM4d2MifQ.qw8QZ5XfKUKrfLtF1zGJ2Q'
  const pub =
    'pk.eyJ1IjoiZmllcnlsaW9uIiwiYSI6ImNsbGc4aW0weDBwbWYzZ28zc3VxMWozb2MifQ.1SZ_EvI7B-uC8iJht9F46w'

  const mapRef = useRef()
  const [direction, setDirection] = useState({
    latitude: 0,
    longitude: 0,
  })
  useEffect(() => {
    const navigation = navigator.geolocation

    if (navigation) {
      navigation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        mapRef.current
          ?.getMap()
          ?.flyTo({ center: [longitude, latitude], zoom: 16 })
      })
      const watchId = navigation.watchPosition((position) => {
        const { latitude, longitude } = position.coords
        // mapRef.current?.getMap()?.flyTo({center:[longitude, latitude], zoom:16})
        setDirection({ longitude, latitude })
      })
      return () => {
        navigation.clearWatch(watchId)
      }
    }
  }, [mapRef.current])
  return (
    <>
      <button className='btn btn-primary' onClick={() => setOpen(true)}>
        Open Tracking
      </button>
      {open && (
        <div>
          <ReactMapGL
            style={{ width: 600, height: 400 }}
            initialViewState={{
              latitude: direction.latitude,
              longitude: direction.longitude,
              zoom: 16,
            }}
            mapStyle='mapbox://styles/mapbox/streets-v9'
            mapboxAccessToken={pub}
          >
            <NavigationControl position='bottom-right' />
            <GeolocateControl
              position='top-left'
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
            <Marker
              latitude={direction.latitude}
              longitude={direction.longitude}
            />
            <Marker latitude={senderLocation[0]} longitude={senderLocation[1]}>
              <div>Sender</div>
            </Marker>
            <Marker
              latitude={receiverLocation[0]}
              longitude={receiverLocation[1]}
            >
              <div>Receiver</div>
            </Marker>
            <Source
              type='geojson'
              data={{
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: [
                    [direction.longitude, direction.latitude],
                    [senderLocation[1], senderLocation[0]],
                    [receiverLocation[1], receiverLocation[0]],
                  ],
                },
              }}
            >
              <Layer
                type='line'
                paint={{
                  'line-color': '#FF0000',
                  'line-width': 2,
                }}
              />
            </Source>
          </ReactMapGL>
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
  return (
    <div>
    <DeliveryItemView data={data}/>
    <div>

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
  return (
    <div>
    <DeliveryItemView data={data}/>
    <div>
    </div>
    </div>
  )
}



export default OrderDetails
