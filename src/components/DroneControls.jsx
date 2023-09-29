// src/components/DroneControls.js

import React from "react";
import { notes } from "../utils/frequencies";

const DroneControls = ({ note, setWaveform, setNote, waveform }) => {
  const waveformOptions = [
    { value: "sine", label: "Sine" },
    { value: "square", label: "Square" },
    { value: "triangle", label: "Triangle" },
    { value: "sawtooth", label: "Sawtooth" },
  ];

  const handleWaveformChange = (event) => {
    setWaveform(event.target.value);
  };

  const handleNoteChange = (val) => {
    setNote(notes[Math.round(val.target.value)]);
  };

  return (
    <div>
      <label>Waveform</label>
      <select value={waveform} onChange={handleWaveformChange}>
        {waveformOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label>Note</label>
      <select onChange={handleNoteChange} value={notes.indexOf(note)}>
        {notes.map((note, i) => (
          <option key={note} value={i}>
            {note}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DroneControls;
