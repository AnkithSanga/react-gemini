import { useState } from "react";
import "./App.css";

const App = () => {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Who is the second man to walk on the moon?",
    "why pizza comes in a square box?",
    "What is the best thing about India?",
  ];

  const surprise = () => {
    const randomIndex = Math.floor(Math.random() * surpriseOptions.length);
    setValue(surpriseOptions[randomIndex]);
  };

  const getResponse = async () => {
    if (!value) {
      setError("Go on! Throw a question mate");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: value,
        },
        {
          role: "model",
          parts: data,
        },
      ]);
      setValue("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong mate, try again");
    }
  };

  const clear = () =>{
    setChatHistory([]);
    setValue("");
    setError("");
  }

  return (
    <section className="app">
      <p>
        What's up user? What information do you want to seek?
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>
          {" "}
          Surprise!
        </button>
      </p>
      <div className="input-container">
        <input
          value={value}
          placeholder="when is diwali?"
          onChange={(e) => setValue(e.target.value)}
        />
        {!error && <button onClick={getResponse}>Ask me</button>}
        {error && <button onClick={clear}>Clear me</button>}
      </div>
      {error && <p>{error}</p>}
      <div className="result-container">
        {chatHistory.map((chatItem, index) => (
          <div key={index}>
            <p className="answer">
              {chatItem.role} : {chatItem.parts}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default App;
