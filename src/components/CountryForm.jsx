import PropTypes from "prop-types";

export default function CountryForm({
  fields,
  handleNewInfo,
  setEditingCountry,
}) {
  return (
    <form className="flex flex-col items-center [&>*>input]:text-center [&>*>input]:border-2 [&>*>input]:border-neutral-600 [&>input]:rounded">
      {fields.map((field) => (
        <fieldset key={field.id}>
          <label htmlFor={field.htmlFor}>{field.text}</label>
          <input
            type={field.type}
            id={field.id}
            value={field.value}
            onChange={field.onChange}
          />
        </fieldset>
      ))}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2"
        onClick={handleNewInfo}
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
  );
}

CountryForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      htmlFor: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
    })
  ).isRequired,
  handleNewInfo: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  setEditingCountry: PropTypes.func.isRequired,
  country: PropTypes.shape({
    iso2: PropTypes.string.isRequired,
  }).isRequired,
};
