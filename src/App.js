import Main from "./components/Main";

import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <div
        style={{
          margin: "1.5rem 0 0 2.5rem",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <a rel="noreferrer" target="_blank" href="https://etherscan.io/">
          <img
            src="https://etherscan.io/assets/svg/logos/logo-etherscan-light.svg?v=0.0.5"
            alt="etherscan"
            style={{ width: "150px", height: "35px" }}
          />
        </a>
      </div>
      <Main />
    </div>
  );
}

export default App;
