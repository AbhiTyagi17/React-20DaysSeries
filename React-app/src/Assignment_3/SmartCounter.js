import { useState } from "react";

function Smartcounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);
  
  const toggle = () => setIsVisible(!isVisible);

  const stepChange = (e) => {
    let value = parseInt(e.target.value);
    setStep(value > 0 ? value : 1);
  };

  return (
    <>
      <div
        style={{
          border: "2px solid #007bff",
          borderRadius: "12px",
          padding: "20px",
          margin: "15px",
          width: "300px",
          display: "inline-block",
          backgroundColor: "#f0f8ff",
        }}
      >
        <h3>Smart Counter</h3>
        <div>
          <label>Step : </label>
          <input
            type="number"
            value={step}
            onChange={stepChange}
            min="1"
            style={{ width: "60px", marginRight: "10px" }}
          />
          <span>(current step: {step}) </span>
        </div>

        {isVisible ? (
          <div>
            <h1 style={{ fontSize: "3rem", margin: "10px" }}>{count}</h1>
          </div>
        ) : (
          <p style={{ color: "red", fontStyle: "italic" }}> Counter is hidden</p>
        )}

        <div>
          <button onClick={increment} style={buttonStyle}>
            Increment
          </button>
          <button onClick={decrement} style={buttonStyle}>
            Decrement
          </button>
          <button onClick={reset} style={{ ...buttonStyle, backgroundColor: "#ffc107" }}>
            Reset
          </button>
          <button onClick={toggle} style={{ ...buttonStyle, backgroundColor: "#6c757d" }}>
            {isVisible ? "Hide" : "Show"}
          </button>
        </div>
      </div>
    </>
  );
}

const buttonStyle = {
  margin: "5px",
  padding: "8px 12px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer",
  fontSize: "14px",
};

export default Smartcounter;