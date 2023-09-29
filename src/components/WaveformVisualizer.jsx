// src/components/WaveformVisualizer.js

import React, { useRef, useEffect } from "react";
import p5 from "p5";

const WaveformVisualizer = ({ waveformData }) => {
  const myP5 = useRef();

  useEffect(() => {
    myP5.current = new p5(Sketch, "waveform-canvas");
    return () => {
      myP5.current.remove();
    };
  }, []);

  useEffect(() => {
    if (myP5.current) {
      myP5.current.myCustomRedrawAccordingToNewPropsHandler({ waveformData });
    }
  }, [waveformData]);

  const Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.noLoop();
    };

    p.myCustomRedrawAccordingToNewPropsHandler = ({
      waveformData: newData,
    }) => {
      if (myP5.current) {
        waveformData = newData;
        p.redraw();
      }
    };

    p.draw = () => {
      p.background(240);

      p.stroke(50);
      p.noFill();
      p.beginShape();
      for (let i = 0; i < waveformData.length; i++) {
        const y = p.map(waveformData[i], 0, 1, p.height, 0);
        p.vertex(i, y);
      }
      p.endShape();
    };
  };

  return (
    <div
      id="waveform-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    ></div>
  );
};

export default WaveformVisualizer;
