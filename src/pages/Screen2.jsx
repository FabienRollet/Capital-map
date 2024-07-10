import { useState } from "react";
import PropTypes from "prop-types";

export default function Screen2({
  countries,
  capitals,
  updateCountry,
  addCountry,
}) {
  const [editingCountry, setEditingCountry] = useState("");
  const [editedPopulation, setEditedPopulation] = useState("");
  const [editedLatitude, setEditedLatitude] = useState("");
  const [editedLongitude, setEditedLongitude] = useState("");
  const [addedName, setAddedName] = useState("");
  const [addedPopulation, setAddedPopulation] = useState("");
  const [addedLatitude, setAddedLatitude] = useState("");
  const [addedLongitude, setAddedLongitude] = useState("");

  const handleEdit = (countryName) => {
    const countryInfo = countries.find((c) => c.name === countryName);
    if (countryInfo) {
      setEditingCountry(countryInfo);
      setEditedPopulation(countryInfo.pop.toString());
      setEditedLatitude(countryInfo.latitude.toString());
      setEditedLongitude(countryInfo.longitude.toString());
    }
  };

  const handleSave = () => {
    if (editingCountry) {
      const updatedCountry = {
        ...editingCountry,
        pop: parseInt(editedPopulation),
        latitude: parseFloat(editedLatitude),
        longitude: parseFloat(editedLongitude),
      };
      updateCountry(updatedCountry);
      setEditingCountry(null);
    } else {
      const newCountry = {
        name: addedName,
        pop: parseInt(addedPopulation),
        latitude: parseFloat(addedLatitude),
        longitude: parseFloat(addedLongitude),
      };
      addCountry(newCountry);
      setAddedName("");
      setAddedPopulation("");
      setAddedLatitude("");
      setAddedLongitude("");
    }
  };

  return (
    <main>
      <h1 className="text-xl text-center mb-8 font-bold">
        Liste des pays et de leurs informations correspondantes :
      </h1>
      <ul className="invisible group mx-10 [&>*]:visible [&>*]:max-w-[15rem] [&>*]:bg-white [&>*]:p-4 flex flex-wrap justify-center [&>*]:flex-auto [&>*]:m-1 [&>*]:text-center [&>*]:text-[#bb1d1d] [&>*]:no-underline">
        <form className="flex flex-col mt-10 items-center [&>input]:text-center [&>input]:border-2 [&>input]:border-rose-600 rounded">
          <h2>Ajouter une capitale</h2>
          <label htmlFor="name">Nom du pay:</label>
          <input
            type="text"
            id="name"
            value={addedName}
            onChange={(e) => setAddedName(e.target.value)}
            placeholder="Ex : Japan"
          />
          <label htmlFor="population">Population (en million) :</label>
          <input
            type="text"
            id="population"
            value={addedPopulation}
            onChange={(e) => setAddedPopulation(e.target.value)}
            placeholder="Ex : 14"
          />
          <label htmlFor="latitude">Latitude :</label>
          <input
            type="text"
            id="latitude"
            value={addedLatitude}
            onChange={(e) => setAddedLatitude(e.target.value)}
            placeholder="Ex : 34.886"
          />
          <label htmlFor="longitude">Longitude :</label>
          <input
            type="text"
            id="longitude"
            value={addedLongitude}
            onChange={(e) => setAddedLongitude(e.target.value)}
            placeholder="Ex : 134.379"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2"
            onClick={handleSave}
            type="button"
          >
            Enregistrer
          </button>
        </form>
        {capitals.map((country) => {
          const countryInfo = countries.find((c) => c.name === country.name);
          return (
            <li key={country.iso2} className="m-4 p-4 border rounded shadow">
              <ul className="[&>*:first-child]:font-bold">
                <li>{country.name}</li>
                <li>Capitale : {country.capital}</li>
                <li>Population : {`${countryInfo.pop} millions`}</li>
                <li>Latitude : {countryInfo.latitude}</li>
                <li>Longitude : {countryInfo.longitude}</li>
              </ul>
              {editingCountry && editingCountry.name === country.name ? (
                <form className=" [&>input]:text-center [&>input]:border-2 [&>input]:border-rose-600 [&>input]:rounded">
                  <label htmlFor="population">Population :</label>
                  <input
                    type="text"
                    id="population"
                    value={editedPopulation}
                    onChange={(e) => setEditedPopulation(e.target.value)}
                    placeholder="Population"
                  />
                  <label htmlFor="latitude">Latitude :</label>
                  <input
                    type="text"
                    id="latitude"
                    value={editedLatitude}
                    onChange={(e) => setEditedLatitude(e.target.value)}
                    placeholder="Latitude"
                  />
                  <label htmlFor="longitude">Longitude :</label>
                  <input
                    type="text"
                    id="longitude"
                    value={editedLongitude}
                    onChange={(e) => setEditedLongitude(e.target.value)}
                    placeholder="Longitude"
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2"
                    onClick={handleSave}
                    type="button"
                  >
                    Enregistrer
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => setEditingCountry(null)}
                    type="button"
                  >
                    Annuler
                  </button>
                </form>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleEdit(country.name)}
                >
                  Modifier
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

Screen2.propTypes = {
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
  updateCountry: PropTypes.func.isRequired,
};
