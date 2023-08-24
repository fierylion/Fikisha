import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
import { useMemo } from "react"
const key  = 'AIzaSyBP3AWvc5kUTn8VwRLjQxxLUt3yj8izYT0'
const TestMap = () => {
  const center = useMemo(()=>({lat:-3.7, lng:-38.2}))
  const {isLoaded} = useJsApiLoader({ id:'google-map-scripts',
    googleMapsApiKey:key })

   async function calculateRoute() {
     if (
       originRef.current.value === '' ||
       destiantionRef.current.value === ''
     ) {
       return
     }
     // eslint-disable-next-line no-undef
     const directionsService = new google.maps.DirectionsService()
     const results = await directionsService.route({
       origin: originRef.current.value,
       destination: destiantionRef.current.value,
       // eslint-disable-next-line no-undef
       travelMode: google.maps.TravelMode.DRIVING,
     })
     setDirectionsResponse(results)
     setDistance(results.routes[0].legs[0].distance.text)
     setDuration(results.routes[0].legs[0].duration.text)
   }

  if(!isLoaded){
    return <div>Loading....</div>
  }
  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
    <Marker position={center}/>

    </GoogleMap>

  )
}

export default TestMap







// import { PositionOptions } from 'mapbox-gl'
// import React, { useState, useEffect } from 'react'
// import Map, {Marker,Source, Layer, GeolocateControl, NavigationControl} from 'react-map-gl'


// const TestMap = () => {
//   const [direction, setDirection] = useState({latitude:0, longitude:0})
//   const mapRef = React.useRef()
//   useEffect(() => {
//     const navigation = navigator.geolocation
    
//    if(navigation){
//     navigation.getCurrentPosition(
//       (position)=>{
//         const {latitude, longitude} = position.coords;
//         mapRef.current?.getMap()?.flyTo({center:[longitude, latitude], zoom:16})
//       }
//     )
//     const watchId =    navigation.watchPosition(
//           (position)=>{
//             const {latitude, longitude} = position.coords;
//             // mapRef.current?.getMap()?.flyTo({center:[longitude, latitude], zoom:16})
//             setDirection({longitude, latitude})
//           }
//     )
//      return () => {
//        navigation.clearWatch(watchId)
//      }
    
    
//    }
  
//   }, [mapRef.current])
  
//   return (
//     <Map
//     ref={mapRef}
//       mapboxAccessToken='pk.eyJ1IjoiZmllcnlsaW9uIiwiYSI6ImNsbGc4aW0weDBwbWYzZ28zc3VxMWozb2MifQ.1SZ_EvI7B-uC8iJht9F46w'
//       initialViewState={{
//         ...direction, 
//         zoom: 12,
//       }}
      
      
//       style={{ width: 600, height: 400 }}
//       mapStyle='mapbox://styles/mapbox/streets-v9'
//     >
//       <Marker longitude={direction.longitude} latitude={direction.latitude}/>
//       <GeolocateControl
//         positionOptions={{enableHighAccuracy: true}}
//         trackUserLocation={true}
//       />
//       <NavigationControl showCompass={true}/>
      
      
      

//     </Map>
//   )
// }

// export default TestMap