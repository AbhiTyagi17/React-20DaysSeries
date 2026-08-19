// Build a component called TemperatureConverter that syncs two inputs: Celsius and Fahrenheit.
// State (lifted to parent):
// temperature – a string (to handle empty input).
// scale – either 'c' or 'f' – tells us which input was last edited.
// 	Requirements:
// Parent Component (TemperatureConverter):
// Manages temperature and scale state.
// Defines conversion functions:
// toCelsius(f) – converts Fahrenheit to Celsius.
// toFahrenheit(c) – converts Celsius to Fahrenheit.
// tryConvert(temperature, convert) – tries to convert a string input; returns empty string if invalid.
// Renders two child components: <CelsiusInput> and <FahrenheitInput>.
// Passes down the temperature, scale, and callback functions.
// Child Components (CelsiusInput and FahrenheitInput):
// Each is a controlled <input> element.
// Their value is determined by the parent state and the current scale:
// If scale === 'c', Celsius shows temperature, Fahrenheit shows the converted value.
// If scale === 'f', Fahrenheit shows temperature, Celsius shows the converted value.
// On onChange, they call the parent callback with the new value and their scale.
// Extra Display:
// Below the inputs, show a read‑only message: "Temperature is X°C / Y°F" (with actual values, or "Invalid temperature" if input is not a number).

// src/Assignment_9/TemperatureConverter.js
import { useState } from 'react';

// ---- Helper conversion functions ----
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// Tries to convert a value; returns empty string if invalid
function tryConvert(temperature, convertFn) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) return '';
  const output = convertFn(input);
  const rounded = Math.round(output * 100) / 100;
  return rounded.toString();
}

// ---- Child Component: Celsius Input ----
function CelsiusInput({ temperature, onTemperatureChange }) {
  const handleChange = (e) => {
    onTemperatureChange(e.target.value, 'c');
  };

  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>Celsius:</label>
      <input
        type="text"
        value={temperature}
        onChange={handleChange}
        placeholder="Enter °C"
        style={inputStyle}
      />
    </div>
  );
}

// ---- Child Component: Fahrenheit Input ----
function FahrenheitInput({ temperature, onTemperatureChange }) {
  const handleChange = (e) => {
    onTemperatureChange(e.target.value, 'f');
  };

  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>Fahrenheit:</label>
      <input
        type="text"
        value={temperature}
        onChange={handleChange}
        placeholder="Enter °F"
        style={inputStyle}
      />
    </div>
  );
}

// ---- Parent Component ----
function TemperatureConverter() {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c'); // 'c' or 'f'

  // Callback for when Celsius input changes
  const handleCelsiusChange = (value) => {
    setTemperature(value);
    setScale('c');
  };

  // Callback for when Fahrenheit input changes
  const handleFahrenheitChange = (value) => {
    setTemperature(value);
    setScale('f');
  };

  // ---- Compute values to display ----
  let celsiusValue = '';
  let fahrenheitValue = '';
  let isValid = true;

  if (temperature === '') {
    // Both empty
    celsiusValue = '';
    fahrenheitValue = '';
    isValid = true;
  } else if (scale === 'c') {
    // Celsius input was last edited
    celsiusValue = temperature;
    const converted = tryConvert(temperature, toFahrenheit);
    fahrenheitValue = converted;
    isValid = converted !== '';
  } else {
    // Fahrenheit input was last edited
    fahrenheitValue = temperature;
    const converted = tryConvert(temperature, toCelsius);
    celsiusValue = converted;
    isValid = converted !== '';
  }

  return (
    <div style={containerStyle}>
      <h2>Temperature Converter</h2>
      <p style={{ color: '#6c757d' }}>
        Enter a value in either field – the other will update automatically.
      </p>

      {/* Celsius Input */}
      <CelsiusInput
        temperature={celsiusValue}
        onTemperatureChange={handleCelsiusChange}
      />

      {/* Fahrenheit Input */}
      <FahrenheitInput
        temperature={fahrenheitValue}
        onTemperatureChange={handleFahrenheitChange}
      />

      {/* Read-only summary display */}
      <div style={summaryStyle}>
        {isValid && temperature !== '' ? (
          <span>
            <strong>{celsiusValue}°C</strong> equals{' '}
            <strong>{fahrenheitValue}°F</strong>
          </span>
        ) : temperature !== '' ? (
          <span style={{ color: '#dc3545' }}>
            Please enter a valid number.
          </span>
        ) : (
          <span style={{ color: '#6c757d' }}>
            Enter a temperature to see the conversion.
          </span>
        )}
      </div>
    </div>
  );
}

// --- Styles ---
const containerStyle = {
  maxWidth: '500px',
  margin: '40px auto',
  padding: '30px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  border: '1px solid #e0e0e0',
  textAlign: 'center',
};

const fieldStyle = {
  marginBottom: '20px',
  textAlign: 'left',
};

const labelStyle = {
  display: 'block',
  fontWeight: '600',
  marginBottom: '6px',
  fontSize: '16px',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '6px',
  border: '2px solid #ccc',
  fontSize: '18px',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s ease',
};

const summaryStyle = {
  marginTop: '20px',
  padding: '15px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  fontSize: '18px',
  fontWeight: '500',
};

export default TemperatureConverter;