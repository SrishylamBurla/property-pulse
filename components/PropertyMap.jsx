
"use client";
import dynamic from "next/dynamic";

const PropertyMapContent = dynamic(() => import("./PropertyMapContent"), {
  ssr: false,
});

const PropertyMap = ({ property }) => {
  return <PropertyMapContent property={property} />;
};

export default PropertyMap;





// "use client";
// import { useEffect, useState } from "react";
// import { fromAddress, setDefaults } from "react-geocode";
// import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";

// // import pin from '@/assets/images/pin.svg'
// // import Map, {Marker} from 'react-map-gl'
// // import Image from "next/image";

// const DefaultIcon = L.icon({
//   iconUrl,
//   shadowUrl: iconShadow,
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// const PropertyMap = ({ property }) => {
//   const [lat, setLat] = useState(null);
//   const [lng, setLng] = useState(null);
//   const [viewport, setViewport] = useState({
//     latitude: 0,
//     longitude: 0,
//     zoom: 12,
//     height: "500px",
//     width: "100%",
//   });

//   const [isLoading, setIsLoading] = useState(true);
//   const [geocodeError, setGeocodeError] = useState(false);

//   useEffect(() => {
//     setDefaults({
//       key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
//       language: "en",
//       region: "us",
//     });
//     const fetchCoords = async () => {
//       try {
//         const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;
//         const res = await fetch(
//           `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//             address
//           )}&key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY}`
//         );
//         const data = await res.json();
//         if (!data || !data.results || data.results.length === 0) {
//           setGeocodeError(true);
//           return;
//         }
//         const { lat, lng } = data.results[0].geometry;

//         // const res =
//         //   await fromAddress(`${property.location.street} ${property.location.city}
//         //         ${property.location.state} ${property.location.zipcode}`);
//         // if (res.results.length === 0) {
//         //   setGeocodeError(true);
//         // }
//         // const { lat, lng } = res.results[0].geometry.location;
//         setLat(lat);
//         setLng(lng);
//         setViewport({
//           ...viewport,
//           latitude: lat,
//           longitude: lng,
//         });
//       } catch (error) {
//         console.log(error);
//         setGeocodeError(true);
//         return;
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCoords();
//   }, []);

//   if (isLoading) return <h1>Loading...</h1>;
//   if (geocodeError)
//     return <div className="text-xl font-bold">No location data found</div>;

//   return (
//     <div>
//       <MapContainer center={[lat, lng]} zoom={12} scrollWheelZoom={false} style={{ height: "500px", width: "100%" }}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[lat, lng]}>
//           <Popup>
//             {property.name} <br /> {property.location}
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default PropertyMap;
