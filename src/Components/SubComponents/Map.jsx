import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";

const createMarker = (
  houseId,
  houseName,
  locationName,
  status,
  userType,
  coordinates,
  setSelectedHouse
) => {
  const c = coordinates.split(",");
  const lat = c[0];
  const lng = c[1];
  return (
    <Marker position={[lat,lng]} key={houseId}>
      <Popup>
        <p className="fw-bolder">House Name : </p> <p>{houseName}</p>
        <p className="fw-bolder">Location Name : </p> <p>{locationName}</p>{" "}
        <p className="fw-bolder">Status : </p> <p>{status}</p>
        {userType === "Admin" && (
          <button className="btn btn-danger btn-sm">Sil</button>
        )}
        {userType === "User" && (
          <button className="btn btn-success btn-sm">Ekle</button>
        )}
        {userType === "Expert" && (
          <button
            className="btn btn-primary btn-sm"
            onClick= { () => setSelectedHouse(houseName)}
          >
            Yorum Ekle
          </button>
        )}
      </Popup>
    </Marker>
  );
};

export const Map = ({ userType, setSelectedHouse }) => {
  const [houses, setHouses] = useState([]);
  useEffect( () => {
    const fetchHouses = async ()  => {
      const response = await fetch("http://localhost:8090/house/getAllHouses");
      const data = await response.json();
      setHouses(data);
    }
    fetchHouses().catch(err => console.log(err));
  }, [houses])

  return (
    <>
      <MapContainer
        center={[39.57, 32.53]}
        zoom={6}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "calc(75vh - 4rem)" }}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {(userType === "Admin" || userType === "User") &&
          houses.map((house) =>
            createMarker(
              house.id,
              house.houseName,
              house.locationName,
              house.confidenceLevel,
              userType,
              house.coordinates
            )
          )
          }
        {userType === "Expert" &&
          houses.map((house) =>
            createMarker(
              house.id,
              house.houseName,
              house.locationName,
              house.confidenceLevel,
              userType,
              house.coordinates,
              setSelectedHouse
            )
          )
        }
      </MapContainer>
    </>
  );
};
