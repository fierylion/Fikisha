import React, {useState, useEffect, useCallback} from 'react'
import { debounce, set } from 'lodash'
import { useGlobalContext } from '../context'
import MessageAlerts from '../components/MessageAlerts'
import {BiArrowBack} from 'react-icons/bi'
import { useMemo } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks'
import key from '../key'
import { geocodeByLatLng } from 'react-google-places-autocomplete'
import { GoogleMap, StandaloneSearchBox, Marker} from '@react-google-maps/api'
import {HiUserGroup} from 'react-icons/hi'
import {BsFillBoxSeamFill} from 'react-icons/bs'
import {FcDocument} from 'react-icons/fc'
import {GiPathDistance} from 'react-icons/gi'
import { FaMoneyBillAlt } from 'react-icons/fa'
const CustomerConfirmation = ({
  senderName,
  senderPhone,
  receiverName,
  receiverPhone,
  senderLocation,
  receiverLocation,
  category,
  setOrderConfirmation,
}) => {
    const { obtainData, data, error, isLoading } = useFetch()
    const navigate = useNavigate()
    const [deliveryTime, setDeliveryTime] = useState('community')
    const[payer, setPayer] = useState('sender')
    const [mode, setMode] = useState('delivery')
    const [distance, setDistance] = useState(0)
    const [duration, setDuration] = useState('0 mins')
    const [directionResults, setDirectionResults] = useState(null)
    const { customer, isLoaded } = useGlobalContext()
     useEffect(() => {
       if (data) {
         setTimeout(() => {
           navigate('/customer')
         }, 3000)
       }
     }, [data])
     


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
       isLoaded && calculateRoute()
       console.log(distance, duration)
     }, [isLoaded])

    const handleSubmit = (e) => {
      e.preventDefault()
      if (
        senderName &&
        senderPhone &&
        receiverName &&
        receiverPhone &&
        senderLocation &&
        receiverLocation
      ) {
        obtainData(
          'customer/order',
          'post',
          {
            senderName,
            senderPhone,
            receiverName,
            receiverPhone,
            senderLocation: senderLocation.lng + ',' + senderLocation.lat,
            receiverLocation: receiverLocation.lng + ',' + receiverLocation.lat,
            category,
            deliveryTime,
            payer,
            mode,
          },
          {
            headers: {
              Authorization: `Bearer ${customer.token}`,
            },
          }
        )
      } else {
        console.log('fill all fields')
      }
    }
  return (
    <>
      <section className='container-fluid my-5'>
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
            <MessageAlerts
              msg={'Fetching your information!'}
              color={'warning'}
            />
          )}
        </div>
        <div className='border rounded  p-3 shadow-sm'>
          <div className='d-flex'>
            <div className='pe-3'>
              {category === 'parcel' ? (
                <BsFillBoxSeamFill className='fs-1' />
              ) : (
                <FcDocument className='fs-1' />
              )}
            </div>
            <h3 className='text-capitalize'>{category}</h3>
          </div>
        </div>
        <div className='border rounded  p-3 shadow-sm my-3'>
          <div className='text-capitalize'>
            <h5>Sender's Information</h5>
            <p>{senderName}</p>
            <p>{senderPhone}</p>
            <small>{senderLocation.lat + ' , ' + senderLocation.lng}</small>
          </div>
        </div>
        <div className='border rounded  p-3 shadow-sm my-3'>
          <div className='text-capitalize'>
            <h5>Receiver's Information</h5>
            <p>{receiverName}</p>
            <p>{receiverPhone}</p>
            <small>{receiverLocation.lat + ' , ' + receiverLocation.lng}</small>
          </div>
        </div>
        <div className='d-flex flex-wrap  justify-content-around border rounded  p-3 shadow-sm my-3'>
          <div className='d-flex p-3 '>
            <div>
              <GiPathDistance className='fs-1' />
            </div>
            <div className='mb-0 pb-0 ms-2 text-capitalize'>
              <p>Delivery Distance</p>
              <h4>
                {distance}
                <small className='d-block small_text text-success'>
                  Duration: {duration}
                </small>
              </h4>
            </div>
          </div>
          <div className='d-flex  p-3'>
            <div className='h-100'>
              <FaMoneyBillAlt className='fs-1' />
            </div>
            <div className='mb-0 pb-0 ms-2'>
              <p>
                Delivery Fee <small className='text-success'>(Instant)</small>
              </p>

              <h4>Tsh: {parseFloat(distance)  * 1000} </h4>
            </div>
          </div>
          <div className='d-flex p-3 '>
            <div className='h-100'>
              <HiUserGroup className='fs-1' />
            </div>
            <div className='mb-0 pb-0 ms-2'>
              <p>
                Community Sharing
                <small className='small_text text-success d-block'>
                  (Save up to 80%)
                </small>
              </p>

              <h4>Tsh: {(parseFloat(distance) * 1000) / 5}</h4>
            </div>
          </div>
        </div>
        <div className='d-flex flex-column justify-content-around border rounded  p-3 shadow-sm my-3'>
          <div className='d-flex justify-content-around'>
            <button
              className={`btn btn-${
                deliveryTime === 'instant' ? 'secondary' : 'outline-secondary'
              }`}
              onClick={() => setDeliveryTime('instant')}
            >
              Instant
            </button>
            <button
              className={`btn btn-${
                deliveryTime === 'community' ? 'secondary' : 'outline-secondary'
              }`}
              onClick={() => setDeliveryTime('community')}
            >
              Community
            </button>
          </div>
        </div>
        <div className='d-flex flex-column justify-content-around border rounded  p-3 shadow-sm my-3'>
          <h4> Payment By</h4>
          <div className=' '>
            <div className='d-flex justify-content-around'>
              <button
                className={`btn btn-${
                  payer === 'sender' ? 'secondary' : 'outline-secondary'
                }`}
                onClick={() => setPayer('sender')}
              >
                Sender
              </button>
              <button
                className={`btn btn-${
                  payer === 'receiver' ? 'secondary' : 'outline-secondary'
                }`}
                onClick={() => setPayer('receiver')}
              >
                Receiver
              </button>
            </div>
          </div>
        </div>
        <div className='border rounded  p-3 shadow-sm my-3'>
          <h4>Mode of payment</h4>

          <div className='d-flex my-4 justify-content-around'>
            <button
              className={`btn btn-${
                mode === 'delivery' ? 'secondary' : 'outline-secondary'
              }`}
              onClick={() => setMode('delivery')}
            >
              Pay on delivery
            </button>
            <button
              className={`btn btn-${
                mode === 'online' ? 'secondary' : 'outline-secondary'
              }`}
              onClick={() => setMode('online')}
            >
              Online Payment
            </button>
          </div>
        </div>
        {data && (
          <MessageAlerts
            msg={
              "Place order successful! You'll be notified when your order is picked up"
            }
            color={'success'}
          />
        )}
        <div className='text-center'>
          {isLoading ? (
            <div className='spinner-border text-primary'></div>
          ) : (
            <button
              className='btn btn-success'
              type='submit'
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </section>
    </>
  )
}
const CustomerOrder = () => {
  //context
  const [category, setCategory] = useState('parcel')
  const [senderName, setSenderName] = useState('')
  const [senderPhone, setSenderPhone] = useState('')
  const [orderConfirmation, setOrderConfirmation] = useState(false)
  const [errorMessage ,setErrorMessage] = useState('')
  
  const [receiverName, setReceiverName] = useState('')
  const [receiverPhone, setReceiverPhone] = useState('')
  const [receiverMap, setReceiverMap] = useState(false)
  const [senderMap, setSenderMap ] = useState(false)
  const {
    senderLocation,
    setSenderLocation,
    receiverLocation,
    setReceiverLocation,
    
  } = useGlobalContext()
 


 
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
      <div onClick={() => {
        if(orderConfirmation){
          setOrderConfirmation(false)
        }else{
          window.history.back()
        }
      }}>
        <BiArrowBack className='fs-1 pointer ' />
      </div>
      <div className='d-flex flex-row  justify-content-center align-items-center'>
        <h4 className={`text-${!orderConfirmation && 'success'} `}>
          Place Order
        </h4>
        <hr className='line' />
        <h4 className={`text-${orderConfirmation && 'success'}  ms-4`}>
          Confirm order
        </h4>
      </div>
      {orderConfirmation && (
        <CustomerConfirmation
          {...{
            senderName,
            senderPhone,
            receiverName,
            receiverPhone,
            senderLocation,
            receiverLocation,
            setOrderConfirmation,
            category,
          }}
        />
      )}
      {!orderConfirmation && (
        <>
          <div>
            <h1>Place your order</h1>
            
          </div>
          <div>
            {errorMessage && (
              <MessageAlerts
                msg={'Please fill all the fields!'}
                color={'danger'}
              />
            )}
          </div>

          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (
                  senderName &&
                  senderPhone &&
                  receiverName &&
                  receiverPhone &&
                  senderLocation &&
                  receiverLocation
                ) {
                  setErrorMessage('')
                  setOrderConfirmation(true)
                } else {
                  setErrorMessage('Please fill all the fields!')
                }
              }}
            >
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
                  <input
                    type='name'
                    placeholder="Receiver's name"
                    className='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                  />
                </div>
                <div className='mb-3 col-6'>
                  <input
                    type='text'
                    placeholder="Receiver's phone number"
                    className='form-control'
                    id='exampleInputPassword1'
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                  />
                </div>
                <div className='col-12'>
                  <label htmlFor=''>Destination</label>
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
              <div>
                {errorMessage && (
                  <MessageAlerts msg={errorMessage} color={'danger'} />
                )}
              </div>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
          </div>
        </>
      )}
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