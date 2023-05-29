import React, { useState } from "react";
import { Map } from "../SubComponents/Map";

export const AddLocation = () => {
  const userType = "Admin";
  const [houseName, setHouseName] = useState([]);
  const [locationName, setLocationName] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  async function submitLocation(e) {
    e.preventDefault()
    const body = {
      houseName: houseName,
      locationName: locationName,
      coordinates: coordinates,
    };
    const response = await fetch("http://localhost:8090/house/addHouse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setHouseName('')
    setLocationName('')
    setCoordinates('')
    const data = await response.json();
    console.log(data);
  }

  return (
    <section className="py-5 mt-5">
      <div className="container py-4 py-xl-5">
        <div className="row gy-4 gy-md-0">
          <div className="col-md-3 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
            <div
              style={{
                maxWidth: "380px",
              }}
              className="shadow-lg p-3 mb-5 bg-white rounded"
            >
              <form style={{ textAlign: "center", maxWidth: "360px" }} onSubmit={submitLocation}>
                <p className="fs-3">Konum Ekle</p>
                <input
                  className="form-control"
                  type="text"
                  style={{ marginBottom: "12px" }}
                  placeholder="Konut İsmi"
                  onChange={(e) => {
                    setHouseName(e.target.value);
                  }}
                  value={houseName}
                />
                <input
                  className="form-control"
                  type="text"
                  style={{ marginBottom: "12px" }}
                  placeholder="Lokasyon İsmi"
                  onChange={(e) => {
                    setLocationName(e.target.value);
                  }}
                  value={locationName}
                />
                <div className="input-group" style={{ marginBottom: "12px" }}>
                  <input
                    className="form-control w-100 mb-3"
                    type="text"
                    placeholder="Enlem,Boylam"
                    onChange={(e) => {
                      setCoordinates(e.target.value);
                    }}
                    value={coordinates}
                  />
                </div>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value={"Kaydet"}
                />
              </form>
            </div>
          </div>
          <div className="col-md-9">
            <div>
              <Map userType={userType} ></Map>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
