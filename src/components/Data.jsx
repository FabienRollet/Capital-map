import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";
import Screen1 from "../pages/Screen1";
import Screen2 from "../pages/Screen2";

export default function Data() {
  const url = useLocation();
  const countries = [
    { name: "France", pop: 67, latitude: 48.866, longitude: 2.333 },
    { name: "United Kingdom", pop: 66, latitude: 51.507, longitude: -0.127 },
    { name: "Belgium", pop: 11, latitude: 50.85, longitude: 4.351 },
    { name: "Spain", pop: 47, latitude: 40.463, longitude: -3.749 },
    { name: "Germany", pop: 83, latitude: 52.520, longitude: 13.404 },
  ];

  const [capitals, setCapitals] = useState([]);

  useEffect(() => {
    const fetchCapitals = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/capital"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch capitals");
        }
        const data = await response.json();
        const filteredCapitals = data.data.filter((country) =>
          countries.some((c) => c.name === country.name)
        );
        setCapitals(filteredCapitals);
      } catch (error) {
        console.error("Error fetching capitals:", error);
      }
    };
    fetchCapitals();
  }, []);

  return (
    <>
      {url.pathname === "/" ? (
        <Screen1 capitals={capitals} countries={countries} />
      ) : (
        <Screen2 capitals={capitals} />
      )}
    </>
  );
}

Data.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      pop: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })
  ).isRequired,
};
