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
  if (data) console.log(data)
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
  const created_at = new Date(data.created_at)

  return (
    <>
     
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
          <button className='btn btn-success mx-auto'>Accept</button>
        </div>
      </div>
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

  return (
    <>
      <button className='btn btn-primary' onClick={() => setOpen(true)}>
        Open Tracking
      </button>
      {open && (
        <div>
          <ReactMapGL
            width={'100%'}
            height={100}
            latitude={senderLocation[0]}
            longitude={senderLocation[1]}
            zoom={4}
            mapStyle='mapbox://styles/mapbox/streets-v11'
            mapboxAccessToken={pub}
          >
            <NavigationControl position='bottom-right' />
            <GeolocateControl
              position='top-left'
              trackUserLocation
              onGeolocate={(e) =>
                setLoc({
                  lng: e.coords.longitude,
                  lat: e.coords.latitude,
                })
              }
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

export default OrderDetails
