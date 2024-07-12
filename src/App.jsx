import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import initialCountries from "./components/initialCountries.json";
import { useLoaderData } from "react-router-dom";

function App() {
  const url = useLocation();
  const [countries, setCountries] = useState(initialCountries);
  const [capitals, setCapitals] = useState([]);
  const loadedCapitals = useLoaderData();

  const btn =
    "bg-white rounded-full bg-[radial-gradient(circle_at_bottom_center,#ffc837_15px,#ff8008)] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.2)] h-24 w-24 flex justify-center items-center";

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
      const updatedCountries = countries.filter(
        (country) => country.name !== countryToDelete.name
      );
      setCountries(updatedCountries);
    }
  };

  useEffect(() => {
    const filteredCapitals = loadedCapitals.filter((country) =>
      countries.some((c) => c.name === country.name)
    );
    setCapitals(filteredCapitals);
  }, [loadedCapitals, countries]);

  const contextValue = {
    countries,
    capitals,
    addCountry,
    updateCountry,
    handleDelete,
  };

  return (
    <>
      <header className="flex mr-12 my-8 justify-end">
        <nav>
          {url.pathname === "/cardInfo" ? (
            <Link to="/displayMap" className={btn}>
              Écran 1 →
            </Link>
          ) : (
            <Link to="/cardInfo" className={btn}>
              Écran 2 →
            </Link>
          )}
        </nav>
      </header>
      <Outlet context={contextValue} />
    </>
  );
}

export default App;
