import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import React from "react";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Home />
      <Sidebar />
    </div>
  );
}

export default App;
