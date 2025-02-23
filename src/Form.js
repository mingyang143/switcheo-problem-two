import { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Container,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

function Form({ currencyConvertData }) {
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [inputCurrency, setInputCurrency] = useState("BLUR");
  const [outputCurrency, setOutputCurrency] = useState("USD");
  const [openModal, setOpenModal] = useState(false); // Modal state

  const currencyList = Array.isArray(currencyConvertData)
    ? [...new Set(currencyConvertData.map((v) => v.currency))]
    : [];

  const getCurrencyPrice = (currency) =>
    currencyConvertData?.find((v) => v.currency === currency)?.price ?? null;

  const convertCurrency = (amount, fromCurrency, toCurrency) =>
    getCurrencyPrice(fromCurrency) && getCurrencyPrice(toCurrency)
      ? (
          (amount * getCurrencyPrice(fromCurrency)) /
          getCurrencyPrice(toCurrency)
        ).toFixed(4)
      : "";

  useEffect(() => {
    setOutputAmount(
      convertCurrency(inputAmount, inputCurrency, outputCurrency)
    );
  }, [inputAmount, inputCurrency, outputCurrency]);

  const swapCurrencies = () => {
    setInputCurrency(outputCurrency);
    setOutputCurrency(inputCurrency);
    setInputAmount(outputAmount);
    setOutputAmount(inputAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputAmount || parseFloat(inputAmount) <= 0) {
      setInputAmount("");
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    setOpenModal(true); // Open modal after confirming swap
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        mt: 3,
        p: 3,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5">💱 Currency Converter</Typography>

      <TextField
        label="Amount to Swap"
        type="number"
        fullWidth
        value={inputAmount}
        onChange={(e) => setInputAmount(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Select
        value={inputCurrency}
        onChange={(e) => setInputCurrency(e.target.value)}
        fullWidth
        sx={{ mt: 1 }}
      >
        {currencyList.map((currency, index) => (
          <MenuItem key={index} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>

      <Button
        variant="contained"
        color="primary"
        onClick={swapCurrencies}
        sx={{ mt: 2 }}
      >
        <SwapHorizIcon />
      </Button>

      <TextField
        label="Amount to Receive"
        type="number"
        fullWidth
        value={outputAmount}
        sx={{ mt: 2 }}
        disabled
      />
      <Select
        value={outputCurrency}
        onChange={(e) => setOutputCurrency(e.target.value)}
        fullWidth
        sx={{ mt: 1 }}
      >
        {currencyList.map((currency, index) => (
          <MenuItem key={index} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>

      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        CONFIRM SWAP
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            borderRadius: "12px",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            ✅ Swap Successful!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You swapped{" "}
            <strong>
              {inputAmount} {inputCurrency}
            </strong>{" "}
            for{" "}
            <strong>
              {outputAmount} {outputCurrency}
            </strong>
            .
          </Typography>
          <Typography variant="body2" color="gray" sx={{ mb: 3 }}>
            The transaction was processed successfully.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 1 }}
            onClick={() => setOpenModal(false)}
          >
            Go Back
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default Form;
