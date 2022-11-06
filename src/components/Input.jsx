import React from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { useState } from "react";

function Input({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleUnits = (e) => {
    const selectedUnits = e.currentTarget.name;
    if (units !== selectedUnits) setUnits(selectedUnits);
  };

  const handleSearch = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          placeholder="Search for city...."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearch}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocation}
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnits}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnits}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Input;
