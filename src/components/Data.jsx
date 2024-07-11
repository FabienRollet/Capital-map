import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Screen1 from "../pages/Screen1";
import Screen2 from "../pages/Screen2";
import initialCountries from "./InitialCountries";

export default function Data() {
  const url = useLocation();
  const [countries, setCountries] = useState(initialCountries);
  const [capitals, setCapitals] = useState([]);

  const addCountry = (newCountry) => {
    setCountries([...countries, newCountry]);
  };

  const updateCountry = (updatedCountry) => {
    setCountries(
      countries.map((country) =>
        country.name === updatedCountry.name ? updatedCountry : country
      )
    );
  };

  const handleDelete = (iso2) => {
    const countryToDelete = capitals.find((country) => country.iso2 === iso2);
    if (countryToDelete) {
      const updatedCountries = countries.filter((country) => country.name !== countryToDelete.name);
      setCountries(updatedCountries);
    }
  };

  useEffect(() => {
    const fetchCapitals = () => {
      fetch("https://countriesnow.space/api/v0.1/countries/capital")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const filteredCapitals = data.data.filter((country) =>
            countries.some((c) => c.name === country.name)
          );
          setCapitals(filteredCapitals);
        })
        .catch((error) => {
          console.error("Error fetching capitals:", error);
        });
    };
    fetchCapitals();
  }, [countries]);

  return (
    <>
      {url.pathname === "/" ? (
        <Screen1 capitals={capitals} countries={countries} />
      ) : (
        <Screen2
          capitals={capitals}
          countries={countries}
          addCountry={addCountry}
          updateCountry={updateCountry}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}

