import React, {useState, useEffect, useCallback} from 'react'
import { debounce } from 'lodash'
import { useGlobalContext } from '../context'
import MessageAlerts from '../components/MessageAlerts'
import { useMemo } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks'
import key from '../key'
import { geocodeByLatLng } from 'react-google-places-autocomplete'
import { GoogleMap, StandaloneSearchBox, Marker} from '@react-google-maps/api'
const CustomerOrder = () => {
  //context
  const [category, setCategory] = useState('document')
  const [senderName, setSenderName] = useState('')
  const [senderPhone, setSenderPhone] = useState('')
  
  const [receiverName, setReceiverName] = useState('')
  const [receiverPhone, setReceiverPhone] = useState('')
  const [receiverMap, setReceiverMap] = useState(false)
  const [senderMap, setSenderMap ] = useState(false)
  const {
    senderLocation,
    setSenderLocation,
    receiverLocation,
    setReceiverLocation,
    customer,
    modalData,
    setModalData,
  } = useGlobalContext()
 
  const {obtainData, data, error, isLoading} = useFetch()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if(senderName && senderPhone && receiverName && receiverPhone && senderLocation && receiverLocation){
      
      obtainData('customer/order', 'post', {senderName, senderPhone, receiverName, receiverPhone,senderLocation:senderLocation.lng + ','+senderLocation.lat, receiverLocation: receiverLocation.lng +','+receiverLocation.lat, category }, {
        headers:{
          Authorization: `Bearer ${customer.token}`,
        },
        
      })
      
    }else{
      console.log('fill all fields')
    }


  }
 useEffect(() => {
    if(data){
      setTimeout(() => {
        navigate('/customer')
      }, 3000);
    }
  }, [data])
 
  useEffect(() => {
   
      fetch('https://ipapi.co/json')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
         
          setSenderLocation({lng:data.longitude, lat:data.latitude})
          setReceiverLocation({ lng: data.longitude, lat: data.latitude })
        })
    
  }, [])

  return (
    <section className='container my-5'>
      <button
        className='btn btn-outline-dark'
        onClick={() => (window.location.pathname = '/customer')}
      >
        Back
      </button>
      <div>
        <h1>Place your order</h1>
        <p>Fill the form below</p>
      </div>
      <div>
        {error && (
          <MessageAlerts
            msg={error.response?.data?.msg || error.response?.data?.err}
            color={'danger'}
          />
        )}
        {data && (
          <MessageAlerts
            msg={
              "Place order successful! You'll be notified when your order is picked up"
            }
            color={'success'}
          />
        )}
        {isLoading && (
          <MessageAlerts msg={'Fetching your information!'} color={'warning'} />
        )}
      </div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Category
            </label>
            <select
              name='category'
              id='category'
              className='form-control'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='document'>Document</option>
              <option value='parcel'>Parcel</option>
            </select>
            <div id='emailHelp' className='form-text'>
              Help us identify the category of your package
            </div>
          </div>
          <div className='row'>
            <h3 className='my-2'>Sender's Information</h3>
            <div className='mb-3 col-6'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Sender Name
              </label>
              <input
                type='name'
                placeholder='Sender name'
                className='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
            </div>
            <div className='mb-3 col-6'>
              <label htmlFor='exampleInputPassword1' className='form-label'>
                Sender Phone Number
              </label>
              <input
                type='text'
                placeholder='Sender phone number'
                className='form-control'
                id='exampleInputPassword1'
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
              />
            </div>
            <div className='col-12'>
              <label htmlFor=''>Choose Location</label>
              <input
                type='text'
                className='form-control'
                value={senderLocation.lat + ' , ' + senderLocation.lng}
                onChange={(e) => setSenderLocation(e.target.value)}
              />
              <div className='d-flex justify-content-around my-3'>
                <button
                  className='btn btn-success'
                  data-bs-toggle='modal'
                  data-bs-target='#locationModal'
                  type='button'
                  onClick={() => setSenderMap(true)}
                >
                  Set From Map
                </button>
                <button className='btn btn-success' type='button'>
                  Set From Saved Address
                </button>
              </div>
            </div>
            <div className='col-12'>
              {senderMap && (
                <MapModal
                  lng={senderLocation.lng}
                  lat={senderLocation.lat}
                  setLoc={setSenderLocation}
                  closeMap={setSenderMap}
                />
              )}
            </div>
          </div>
          <div className='row'>
            <h3 className='my-2'>Receiver's Information</h3>
            <div className='mb-3 col-6'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Sender Name
              </label>
              <input
                type='name'
                placeholder='Sender name'
                className='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
              />
            </div>
            <div className='mb-3 col-6'>
              <label htmlFor='exampleInputPassword1' className='form-label'>
                Sender Phone Number
              </label>
              <input
                type='text'
                placeholder='Sender phone number'
                className='form-control'
                id='exampleInputPassword1'
                value={receiverPhone}
                onChange={(e) => setReceiverPhone(e.target.value)}
              />
            </div>
            <div className='col-12'>
              <label htmlFor=''>Choose Location</label>
              <input
                type='text'
                className='form-control'
                value={receiverLocation.lat + ' , ' + receiverLocation.lng}
                onChange={(e) => setReceiverLocation(e.target.value)}
              />
              <div className='d-flex justify-content-around my-3'>
                <button
                  className='btn btn-success'
                  type='button'
                  data-bs-toggle='modal'
                  data-bs-target='#locationModal'
                  onClick={(e) => {
                    setReceiverMap(true)
                  }}
                >
                  Set From Map
                </button>
                <button className='btn btn-success' type='button'>
                  Set From Saved Address
                </button>
              </div>
            </div>
            <div className='col-12'>
              {receiverMap && (
                <MapModal
                  lng={receiverLocation.lng}
                  lat={receiverLocation.lat}
                  setLoc={setReceiverLocation}
                  closeMap={setReceiverMap}
                />
              )}
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
const MapModal = ({lat, lng, setLoc, closeMap}) => {
 
   const [map, setMap] = useState(null)
   const [markerPosition, setMarkerPosition] = useState({lat,lng})
   const [searchBox, setSearchBox] = useState(null)
  const{isLoaded} = useGlobalContext()

  const center = useMemo(()=>({lat, lng}))
   const handleMapLoad = useCallback((mapInstance) => {
     setMap(mapInstance)
   }, [])

   const handleSearchBoxLoad = useCallback((searchBoxInstance) => {
     setSearchBox(searchBoxInstance)
   }, [])
   const handleCenterChanged =debounce( ()=>{
    if(map){
      console.log(map)
      const newCenter = map.getCenter();
      const newPosition = { lat: newCenter.lat(), lng: newCenter.lng() }
      if(newPosition.lat !== markerPosition.lat || newPosition.lng !== markerPosition.lng){
        setMarkerPosition(newPosition)
        setLoc(newPosition)


      }
          }

   }, 100)
    const handlePlacesChanged = useCallback(() => {
      const places = searchBox.getPlaces()
      if (places && places.length > 0) {
        const selectedLocation = {
          lat: places[0].geometry.location.lat(),
          lng: places[0].geometry.location.lng(),
        }
        const zoom = 16
        if(map){
          map.panTo(selectedLocation)
          map.setZoom(zoom)
          setLoc(selectedLocation)

        }
        
      }
    }, [searchBox, setLoc])
    
 
  return (
    <>
      <>
        <div>
          {isLoaded && (
            <>
              <div>
              <h4>Search for a location</h4>
                <StandaloneSearchBox
                  onLoad={handleSearchBoxLoad}
                  onPlacesChanged={handlePlacesChanged}
                >
                  <input
                    type='text'
                    placeholder='Search for a location'
                  className='form-control mb-3'

                  />
                </StandaloneSearchBox>
              </div>
              <GoogleMap
                zoom={16}
                onCenterChanged={handleCenterChanged}
                center={markerPosition}
                onLoad={handleMapLoad}
                mapContainerClassName='map-container'
              >
                
                  <Marker
                    
                    position={markerPosition}
                    
                  />
                

                {/* <Geocoder /> */}
              </GoogleMap>
            </>
          )}
        </div>
        <button className='btn btn-danger mb-5' onClick={() => closeMap(false)}>
          Close
        </button>
      </>
    </>
  )
}

export default CustomerOrder