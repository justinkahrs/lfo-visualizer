// src/components/DroneGenerator.js

import React, { useState, useEffect } from "react";
import DroneControls from "./DroneControls";
import { frequencies } from "../utils/frequencies";

const DroneGenerator = ({ type = "sine", control, setWaveformData }) => {
  const [waveform, setWaveform] = useState("sine");
  const [note, setNote] = useState("C4");
  const [audioContext, setAudioContext] = useState(null);
  const [oscillator, setOscillator] = useState(null);
  const [analyser, setAnalyser] = useState(null);

  useEffect(() => {
    if (!oscillator) return;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(
      frequencies[note],
      audioContext.currentTime
    );
  }, [note, type]);

  useEffect(() => {
    if (!analyser) return;
    const data = new Uint8Array(analyser.fftSize);

    const fetchData = () => {
      if (control === "start") {
        analyser.getByteTimeDomainData(data);
        const normalizedData = Array.from(data).map((byte) => byte / 255.0);
        setWaveformData(normalizedData, audioContext);
        requestAnimationFrame(fetchData);
      }
    };

    fetchData();
  }, [analyser, control, setWaveformData]);

  useEffect(() => {
    if (!audioContext || !oscillator) return;
    const gainNode = audioContext.createGain();
    const newAnalyser = audioContext.createAnalyser();
    oscillator.connect(newAnalyser);
    newAnalyser.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // More setup code...

    setAnalyser(newAnalyser);

    // return stopDrone;
  }, [audioContext, oscillator]);

  useEffect(() => {
    if (control === "start") {
      startDrone();
    } else if (control === "stop" && oscillator) {
      stopDrone();
    }
  }, [control]);

  const startDrone = () => {
    if (!audioContext) {
      const newAudioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      setAudioContext(newAudioContext);

      const newOscillator = newAudioContext.createOscillator();
      newOscillator.type = type;
      newOscillator.frequency.setValueAtTime(
        frequencies[note],
        newAudioContext.currentTime
      );
      newOscillator.connect(newAudioContext.destination);
      newOscillator.start();

      setOscillator(newOscillator);
    }
  };

  const stopDrone = () => {
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
      setOscillator(null);
      audioContext.close();
      setAudioContext(null);
    }
  };

  return (
    <DroneControls
      note={note}
      setWaveform={setWaveform}
      setNote={setNote}
      waveform={waveform}
    />
  );
};

export default DroneGenerator;
