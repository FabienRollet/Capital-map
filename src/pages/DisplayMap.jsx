import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function DisplayMap() {
  const { capitals, countries } = useOutletContext();
  useEffect(() => {
    if (!Array.isArray(capitals) || capitals.length === 0) {
      console.error("Capitals is not an array or is empty");
      return;
    }

    const capitalMap = capitals.reduce((acc, capital) => {
      acc[capital.name] = capital.capital;
      return acc;
    }, {});

    const map = L.map("map").setView([47, 5], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const cities = countries.map((country) => ({
      desc: `${country.name}, Population : ${
        country.pop
      } millions, Capitale : ${capitalMap[country.name]}`,
      coords: [country.latitude, country.longitude],
    }));

    cities.forEach((city) => {
      L.marker(city.coords).addTo(map).bindPopup(city.desc);
    });

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCoords = [
              position.coords.latitude,
              position.coords.longitude,
            ];
            map.setView(userCoords, 10);
            L.marker(userCoords)
              .addTo(map)
              .bindPopup("Vous êtes ici")
              .openPopup();
          },
          (error) => {
            console.error("Erreur de géolocalisation : ", error);
          }
        );
      } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
      }
    };

    getUserLocation();

    return () => {
      map.remove();
    };
  }, [countries, capitals]);

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl text-center mb-8 font-bold">
        Carte des capitales
      </h1>
      <div id="map" className="w-screen h-96"></div>
    </main>
  );
}

DisplayMap.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      pop: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })
  ).isRequired,
  capitals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      capital: PropTypes.string.isRequired,
      iso2: PropTypes.string.isRequired,
      iso3: PropTypes.string.isRequired,
    })
  ).isRequired,
};
