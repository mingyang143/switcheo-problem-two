import { useState, useEffect } from "react";

function Form({ currencyConvertData }) {
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [inputCurrency, setInputCurrency] = useState("BLUR");
  const [outputCurrency, setOutputCurrency] = useState("USD");

  const currencyList = Array.isArray(currencyConvertData)
    ? [...new Set(currencyConvertData.map((v) => v.currency))]
    : [];

  const getCurrencyPrice = (currency) => {
    const foundCurrency = currencyConvertData?.find(
      (v) => v.currency === currency
    );
    return foundCurrency ? foundCurrency.price : null;
  };

  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    const fromPrice = getCurrencyPrice(fromCurrency);
    const toPrice = getCurrencyPrice(toCurrency);
    if (!fromPrice || !toPrice) return "";

    return ((amount * fromPrice) / toPrice).toFixed(4);
  };

  useEffect(() => {
    if (inputAmount && inputCurrency && outputCurrency) {
      const convertedValue = convertCurrency(
        inputAmount,
        inputCurrency,
        outputCurrency
      );
      setOutputAmount(convertedValue);
    }
  }, [inputAmount, inputCurrency, outputCurrency]);

  const swapCurrencies = () => {
    setInputCurrency(outputCurrency);
    setOutputCurrency(inputCurrency);
    setInputAmount(outputAmount);
    setOutputAmount(inputAmount);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setInputAmount("");
    setOutputAmount("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h5>Swap Currencies</h5>

      <div>
        <label>Amount to send</label>
        <input
          type="number"
          id="input-amount"
          onChange={(e) => setInputAmount(e.target.value)}
          value={inputAmount}
          required
        />
        <select
          value={inputCurrency}
          onChange={(e) => setInputCurrency(e.target.value)}
        >
          {currencyList.map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={swapCurrencies}>
        🔄
      </button>

      <div>
        <label>Amount to receive</label>
        <input type="number" id="output-amount" value={outputAmount} readOnly />
        <select
          value={outputCurrency}
          onChange={(e) => setOutputCurrency(e.target.value)}
        >
          {currencyList.map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">CONFIRM SWAP</button>
    </form>
  );
}

export default Form;
