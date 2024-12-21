import Login from "./components/Login";
import Page from "./components/Page";
import "./App.css";
import { useState } from "react";

function App() {
  const [isConnected, setisConnected] = useState(false);

  window.onload = () => {
    if (localStorage.getItem("token")) {
      setisConnected(true);
    }
  };

  return (
    <div className="App">
      {isConnected ? (
        <Page setisConnected={setisConnected} />
      ) : (
        <Login setisConnected={setisConnected} />
      )}
    </div>
  );
}

export default App;
