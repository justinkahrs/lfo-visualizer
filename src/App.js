// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import DroneGenerator from "./components/DroneGenerator";
import WaveformVisualizer from "./components/WaveformVisualizer";

function App() {
  const [count, setCount] = useState(1);
  const [control, setControl] = useState("stop");

  const [waveformData, setWaveformData] = useState([]);

  const toggleDrone = () => {
    setControl((prevControl) => (prevControl === "start" ? "stop" : "start"));
  };

  const handleAddDrone = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="App">
      <h1>LFO Visualizer</h1>
      <button onClick={toggleDrone}>
        {control === "start" ? "Stop All Drones" : "Start All Drones"}
      </button>

      <button onClick={handleAddDrone}>Add</button>
      <button onClick={() => setCount(count - 1)}>Remove</button>

      {Array.from({ length: count }, (_, i) => (
        <DroneGenerator
          key={i}
          control={control}
          setWaveformData={setWaveformData}
        />
      ))}

      <WaveformVisualizer waveformData={waveformData} />
    </div>
  );
}

export default App;
