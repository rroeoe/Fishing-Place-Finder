import React from 'react'
import { useLoadScript } from "@react-google-maps/api";

const GoogleMaps = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyD0p-JdU_mJBuBF83V-EY9g9MECHCkiV18",
      });
  return (
    <></>
  )
}

export default GoogleMaps
