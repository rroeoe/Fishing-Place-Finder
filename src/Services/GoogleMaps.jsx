import React from 'react'
import { useLoadScript } from "@react-google-maps/api";

const GoogleMaps = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
      });
  return (
    <></>
  )
}

export default GoogleMaps
