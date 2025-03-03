import React, { useState } from "react";
import "../index.css"; // Ensure this path is correct

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);

  const handleButtonClick = (value) => {
    // Clear result when a new button is pressed
    if (result !== null) {
      setExpression(value);
      setResult(null);
    } else {
      setExpression((prev) => prev + value);
    }
  };

  const evaluateExpression = () => {
    try {
      // Replace square root and cube symbols with corresponding functions
      let evalExpression = expression
        .replace(/√/g, "Math.sqrt") // Handle square root
        .replace(/x²/g, "**2") // Handle square
        .replace(/x³/g, "**3") // Handle cube
        .replace(/×/g, "*") // Replace multiplication symbol
        .replace(/÷/g, "/"); // Replace division symbol

      const evalResult = eval(evalExpression);
      setResult(evalResult);
    } catch (error) {
      alert("Invalid Expression!");
      setResult(null);
    }
  };

  const clearExpression = () => {
    setExpression("");
    setResult(null);
  };

  const deleteLastCharacter = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  return (
    <div className="calculator">
      <h1 className="title">Calculator</h1> {/* Title set here */}
      <input
        type="text"
        value={result !== null ? result : expression}
        readOnly
        className="input"
      />
      <div className="calculator-grid">
        {[
          "C", "x²", "x³", "+",
          1, 2, 3, "÷",
          4, 5, 6, "×",
          7, 8, 9, "-",
          0, "⌫", ".", "="
        ].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === "=") {
                evaluateExpression();
              } else if (btn === "C") {
                clearExpression();
              } else if (btn === "⌫") {
                deleteLastCharacter(); // Handle delete/backspace
              } else {
                handleButtonClick(btn.toString());
              }
            }}
            className={`button ${isNaN(btn) ? "button-symbol" : ""}`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;