// Assignment 4 – Interactive Event Playground
// Create a component called EventDemo that showcases various event handlers:

// Live Typing Display

// An <input type="text"> that updates a <p> below it in real‑time as you type (using onChange).

// Greet Button

// A "Greet" button that shows an alert saying "Hello, [typed text]!" when clicked (using onClick).

// Form Submission

// A <form> with an <input> and a "Submit" button.

// On submit, prevent the page from reloading (e.preventDefault()), and display the submitted message in a <p> below the form.

// Also, clear the input after submission.

// Hover Box

// A <div> that is initially lightgray.

// When the mouse enters (onMouseEnter), it turns dodgerblue.

// When the mouse leaves (onMouseLeave), it returns to lightgray.

// In the App component: Render <EventDemo />.

import { useState } from "react";

function EventDemo() {
  const [typedText, setTypedtext] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [boxColor, setBoxColor] = useState("lightgray");

  const handleTyping = (e) => {
    setTypedtext(e.target.value);
  };

  const handleGreet = () => {
    if (typedText.trim() === "") {
      alert("Please type something...!");
    } else {
      alert(`Hello, ${typedText}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formInput = document.getElementById("formInput");

    const message = formInput.value.trim();

    if (message === "") {
      alert("Please enter something..!");
    } else {
      setSubmittedMessage(message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>react Event playground..</h2>

      <div style={sectionStyle}>
        <h4>Live Typing</h4>
        <input
          type="text"
          placeholder="Type something.."
          onChange={handleTyping}
          style={inputStyle}
        />
        <p>
          <strong>You typed:</strong>
          {typedText || "nothing yet"}
        </p>
        <button onClick={handleGreet} style={buttonStyle}>
          Greet
        </button>
      </div>

      <div style={sectionStyle}>
        <h4>Form Submission (no reload!)</h4>
        <form onSubmit={handleSubmit}>
          <input
            id="formInput"
            type="text"
            placeholder="Enter a message..."
            style={inputStyle}
          />
          <button
            type="submit"
            style={{ ...buttonStyle, backgroundColor: "#28a745" }}
          >
            Submit
          </button>
        </form>
        {submittedMessage && (
          <p
            style={{
              backgroundColor: "#d4edda",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            Submitted: {submittedMessage}
          </p>
        )}
      </div>

      <div style={sectionStyle}>
        <h4>Hover Box</h4>
        <div
          onMouseEnter={() => setBoxColor("dodgerblue")}
          onMouseLeave={() => setBoxColor("lightgray")}
          style={{
            width: "200px",
            height: "100px",
            backgroundColor: boxColor,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.3s ease",
            border: "1px solid #ccc",
          }}
        >
          {boxColor === "lightgray" ? "Hover me!" : "Hovering!"}
        </div>
      </div>
    </div>
  );
}

const sectionStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  marginBottom: '20px',
  backgroundColor: '#fafafa',
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '100%',
  marginBottom: '10px',
  boxSizing: 'border-box',
};

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

export default EventDemo;
