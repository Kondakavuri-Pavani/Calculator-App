import React, { useState, useEffect } from "react";
import "../index.css"; // Ensure this path is correct

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);

  const operators = ["+", "-", "×", "÷", "%", "^"];
  const functions = ["x²", "x³", "√"];

  const handleButtonClick = (value) => {
    if (result !== null && !operators.includes(value)) {
      setExpression(value);
      setResult(null);
      return;
    }

    // Prevent multiple operators in a row
    if (
      operators.includes(value) &&
      (expression === "" || operators.includes(expression.slice(-1)))
    ) {
      return;
    }

    // Ensure functions (x², x³, √) apply only once per number
    if (functions.includes(value) && expression !== "" && !operators.includes(expression.slice(-1))) {
      setExpression((prev) => prev + value);
      return;
    }

    // Prevent multiple decimals in a number
    if (value === "." && /\d*\.\d*$/.test(expression)) {
      return;
    }

    setExpression((prev) => prev + value);
  };

  const evaluateExpression = () => {
    try {
      let evalExpression = expression
        .replace(/π/g, "Math.PI") // Pi constant
        .replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)") // Square root
        .replace(/x²/g, "**2") // Square
        .replace(/x³/g, "**3") // Cube
        .replace(/\^/g, "**") // Power operator
        .replace(/×/g, "*") // Multiplication
        .replace(/÷/g, "/") // Division
        .replace(/%/g, "/100"); // Percentage

      if (operators.includes(expression.slice(-1))) return; // Prevent eval error

      const evalResult = new Function(`return ${evalExpression}`)();
      setExpression(evalResult.toString()); // Keep result for further calculations
      setResult(null); // Prevent reset
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
    setExpression((prev) => (prev.length > 0 ? prev.slice(0, -1) : ""));
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      if (!isNaN(key) || operators.includes(key) || key === "." || key === "^") {
        handleButtonClick(key);
      } else if (key === "Enter") {
        evaluateExpression();
      } else if (key === "Backspace") {
        deleteLastCharacter();
      } else if (key === "Escape") {
        clearExpression();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expression]);

  return (
    <div className="calculator">
      <h1 className="title">Calculator</h1>
      <input
        type="text"
        value={expression}
        readOnly
        className="input"
      />
      <div className="calculator-grid">
        {[
          "C", "x²", "x³", "√",
          "π", "^", "%", "+",
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
                deleteLastCharacter();
              } else {
                handleButtonClick(btn.toString());
              }
            }}
            className={`button ${isNaN(btn) && btn !== "." ? "button-symbol" : ""}`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
