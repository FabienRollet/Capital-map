export const CapitalLoader = async () => {
    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries/capital");
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching capitals:", error);
      return [];
    }
  };