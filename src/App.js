import "./App.css";
import Form from "./Form";
import { useEffect, useState } from "react";

const CURRENCY_INFORMATION_URL = "https://interview.switcheo.com/prices.json";

function App() {
  const [currencyConvertData, setCurrencyConvertData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(CURRENCY_INFORMATION_URL);
        if (!response.ok) throw new Error("Failed to fetch prices");
        const data = await response.json();
        setCurrencyConvertData(data);
      } catch (error) {
        alert(
          "There was an error fetching currency information. Please reload the page"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <div className="App">
      <Form currencyConvertData={currencyConvertData} />
    </div>
  );
}

export default App;
