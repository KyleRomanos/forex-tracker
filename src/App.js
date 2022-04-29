import './App.css';
import CurrencyInput from "./CurrencyInput";
import {useState, useEffect} from "react";
import axios from "axios";
import React from 'react';
import { FcCurrencyExchange } from 'react-icons/fc';

function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('CAD');
  const [currency2, setCurrency2] = useState('RUB');
  const [rates, setRates] = useState([]);

  const BASE_URL = 'https://v6.exchangerate-api.com/v6/5691898bea28a2d695d6d54b/latest/CAD'

  useEffect(() => {
    axios.get(BASE_URL)
      .then(response => {
        setRates(response.data.conversion_rates);
        // console.log(response)
      })
  }, []);

  useEffect(() => {
    if (!!rates) {
      function convert() {
        handleAmount1Change(1);
      }
      convert();
    }
  }, [rates]);


  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }


  return (
    <div>
      <h1><FcCurrencyExchange/>Forex Tracker</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1} />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2} />
    </div>
  );
}

export default App;