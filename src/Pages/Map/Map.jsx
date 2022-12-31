import React, { useState } from "react";
import { useData } from "../../Services/DataContext";
import "../../Assets/Marker.png";
import Cards from "../../Components/Cards/Cards";
import { MapStyles, center, containerStyleMap } from "../../Services/MapStyles";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SwitchButton from "../../Components/SwitchButton/SwitchButton";

function Map(){
  const [activeMarker, setActiveMarker] = useState(null);
  const { data } = useData();

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    gestureHandling: "greedy",
    styles: MapStyles,
  };

  const google = window.google;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD0p-JdU_mJBuBF83V-EY9g9MECHCkiV18",
  });

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyleMap}
        center={center}
        zoom={8}
        options={options}
        onClick={() => setActiveMarker(null)}
      >
        {data.map((props) => (
          <Marker
            key={props.documentId}
            position={{
              lat: props.googleLocation.latitude,
              lng: props.googleLocation.longitude,
            }}
            // label={{text: props.fields.name, color: "black"}}
            onClick={() => handleActiveMarker(props.name)}
            icon={{
              url: require("../../Assets/Marker.png"),
              scaledSize: new google.maps.Size(50, 50),
            }}
          >
            {activeMarker === props.name ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <Cards
                  name={props.name}
                  createdAt={props.createdAt}
                  image={props.picture}
                  id={props.favoriteId}
                  place={props.place}
                  canton={props.canton}
                  averageRating={props.averageRating}
                  sana={props.sana}
                  favorite={props.favorite}
                  maxWidth={300}
                  height={200}
                />
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
      <SwitchButton
        icon={<FormatListBulletedIcon sx={{ mr: 1 }} />}
        navigate="/"
        text="Liste anzeigen"
      />
    </>
  ) : (
    <p>Error</p>
  );
};

export default React.memo(Map);
