import React, { useEffect, useRef, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import html2canvas from 'html2canvas';
import Screen from './Screen';

const Map = () => {
  const mapRef = useRef()
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [screenshot, setScreenshot] = useState(null)
  useEffect(()=>{
    // setting the position of map to the users current position
    navigator.geolocation.getCurrentPosition((pos)=>{
      setLatitude(pos.coords.latitude)
      setLongitude(pos.coords.longitude)
    })
  }, [])

//   function to take the image of the visible reg
function handleScreenShot(){
    html2canvas(mapRef.current, {
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        scale: 1,
      }).then(function(canvas) {
        setScreenshot(canvas.toDataURL())
    });
}
  // if users doesn't allow to access their location the will be the location shown in the map
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 15
  };
  return (
    <div>
    <div style={{ height: '94vh', width: '100%' }} ref={mapRef}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBNYHQ-t4tBRZr-izlJLZvRXyMYG-KAqek" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={
          {
            lat: latitude,
            lng: longitude
          }
        }
      >
      </GoogleMapReact>
    </div>
    <button onClick={handleScreenShot}>Inspect Area</button>
    
    {screenshot && (
        <div>
          <Screen screenshot={screenshot} />

          <button className='choose-btn' style={{position:'absolute', top:'5%', right:'10px'}} onClick={()=>setScreenshot(null)}>Choose Another Location</button>
        </div>
      )}
    </div>
  );
}

export default Map