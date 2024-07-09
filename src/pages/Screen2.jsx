import { useState } from "react";
import PropTypes from "prop-types";

export default function Screen2({ countries, capitals }) {
  const [editingCountry, setEditingCountry] = useState(null);
  const [editedPopulation, setEditedPopulation] = useState("");
  const [editedLatitude, setEditedLatitude] = useState("");
  const [editedLongitude, setEditedLongitude] = useState("");

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
      const updatedCountries = countries.map((c) => {
        if (c.name === editingCountry.name) {
          return {
            ...c,
            pop: parseInt(editedPopulation),
            latitude: parseFloat(editedLatitude),
            longitude: parseFloat(editedLongitude),
          };
        }
        return c;
      });
      // Mettre à jour le tableau countries avec les informations modifiées
      // Cela peut être fait en passant une fonction de mise à jour dans les props
      // ou en utilisant un hook de mise à jour d'état s'il est géré au niveau supérieur
      console.log("Pays mis à jour :", updatedCountries);
      // Exemple d'une fonction de mise à jour passée par les props
      // updateCountries(updatedCountries);
    }
    // Réinitialiser l'état de l'édition
    setEditingCountry(null);
  };

  if (!countries || !capitals) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1 className="text-xl text-center mb-8 font-bold">
        Liste des pays et de leurs informations correspondantes :
      </h1>
      <ul className="flex flex-wrap hoverCard mx-10">
        {capitals.map((country) => {
          const countryInfo = countries.find((c) => c.name === country.name);
          return (
            <li key={country.iso2} className="m-4 p-4 border rounded shadow">
              <ul className="[&>*:first-child]:font-bold">
                <li>{country.name}</li>
                <li>Capitale : {country.capital}</li>
                <li>
                  Population :{" "}
                  {countryInfo ? `${countryInfo.pop} millions` : "N/A"}
                </li>
                <li>Latitude : {countryInfo ? countryInfo.latitude : "N/A"}</li>
                <li>
                  Longitude : {countryInfo ? countryInfo.longitude : "N/A"}
                </li>
              </ul>
              {editingCountry && editingCountry.name === country.name ? (
                <form className="flex flex-col mt-10 items-center [&>input]:text-center [&>input]:border-2 [&>input]:border-rose-600 [&>input]:rounded">
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
                  >
                    Enregistrer
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => setEditingCountry(null)}
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
};
