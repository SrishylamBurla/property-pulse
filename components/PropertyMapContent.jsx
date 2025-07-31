// components/PropertyMapContent.jsx
"use client";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import pin from '@/assets/images/pin.svg'
import Spinner from "./Spinner";


// Fix Leaflet marker icons
const DefaultIcon = L.icon({
  iconUrl: pin.src,
  iconSize: [35, 45],
  iconAnchor: [17, 46],
  popupAnchor: [0, -40],
  shadowUrl: iconShadow.src,
});
L.Marker.prototype.options.icon = DefaultIcon;

const PropertyMapContent = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            address
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY}`
        );
        const data = await res.json();

        if (!data || !data.results || data.results.length === 0) {
          setGeocodeError(true);
          return;
        }

        const { lat, lng } = data.results[0].geometry;
        setLat(lat);
        setLng(lng);
      } catch (error) {
        console.error(error);
        setGeocodeError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (isLoading) return <Spinner />;
  if (geocodeError) return <div className="text-xl font-bold">No location data found</div>;

  return (
    <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={true} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>{property.name || "Property Location"}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default PropertyMapContent;
