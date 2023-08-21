import { PositionOptions } from 'mapbox-gl'
import React, { useState, useEffect } from 'react'
import Map, {Marker,Source, Layer, GeolocateControl} from 'react-map-gl'
const TestMap = () => {
  const [direction, setDirection] = useState({latitude:0, longitude:0})
  useEffect(() => {
    const navigation = navigator.geolocation
   if(navigation){
    navigation.getCurrentPosition(
      (position)=>{
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude)
        setDirection({longitude:longitude, latitude:latitude})


      }
    )
    
   }
  }, [])
  
  return (
    <Map
      mapboxAccessToken='pk.eyJ1IjoiZmllcnlsaW9uIiwiYSI6ImNsbGc4aW0weDBwbWYzZ28zc3VxMWozb2MifQ.1SZ_EvI7B-uC8iJht9F46w'
      initialViewState={{
        ...direction, 
        zoom: 12,
      }}
      
      
      style={{ width: 600, height: 400 }}
      mapStyle='mapbox://styles/mapbox/streets-v9'
    >
    <GeolocateControl

      positionOptions={{enableHighAccuracy:true}}
      trackUserLocation={true}
    />
    </Map>
  )
}

export default TestMap