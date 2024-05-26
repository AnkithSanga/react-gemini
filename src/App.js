import { useState } from "react";
import "./App.css";

const App = () => {
  const [error, setError] = useState("");
  return (

      <section className="app">
        <p>
          What's up user? What information do you want to seek?
          <button className="surprise"> Surprise!</button>
        </p>
        <div className="input-container">
          <input value={""} placeholder="when is diwali?" onChange={""} />
          {!error && <button>Ask me</button>}
          {error && <button>Clear me</button>}
        </div>
        {error && <p>{error}</p>}
        <div className="result-container">
          <div key={""}>
            <p className="answer"></p>
          </div>
        </div>
      </section>

  );
};

export default App;
