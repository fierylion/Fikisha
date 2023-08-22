import { PositionOptions } from 'mapbox-gl'
import React, { useState, useEffect } from 'react'
import Map, {Marker,Source, Layer, GeolocateControl, NavigationControl} from 'react-map-gl'


const TestMap = () => {
  const [direction, setDirection] = useState({latitude:0, longitude:0})
  const mapRef = React.useRef()
  useEffect(() => {
    const navigation = navigator.geolocation
    
   if(navigation){
    navigation.getCurrentPosition(
      (position)=>{
        const {latitude, longitude} = position.coords;
        mapRef.current?.getMap()?.flyTo({center:[longitude, latitude], zoom:16})
      }
    )
    const watchId =    navigation.watchPosition(
          (position)=>{
            const {latitude, longitude} = position.coords;
            // mapRef.current?.getMap()?.flyTo({center:[longitude, latitude], zoom:16})
            setDirection({longitude, latitude})
          }
    )
     return () => {
       navigation.clearWatch(watchId)
     }
    
    
   }
  
  }, [mapRef.current])
  
  return (
    <Map
    ref={mapRef}
      mapboxAccessToken='pk.eyJ1IjoiZmllcnlsaW9uIiwiYSI6ImNsbGc4aW0weDBwbWYzZ28zc3VxMWozb2MifQ.1SZ_EvI7B-uC8iJht9F46w'
      initialViewState={{
        ...direction, 
        zoom: 12,
      }}
      
      
      style={{ width: 600, height: 400 }}
      mapStyle='mapbox://styles/mapbox/streets-v9'
    >
      <Marker longitude={direction.longitude} latitude={direction.latitude}/>
      <GeolocateControl
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
      />
      <NavigationControl showCompass={true}/>
      
      
      

    </Map>
  )
}

export default TestMap