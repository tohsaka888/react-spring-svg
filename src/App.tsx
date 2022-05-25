import React from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import Line from "./components/Line";
import Point from "./components/Point";

function App() {
  return (
    <div style={{ border: "1px solid red", width: "1000px", height: "1000px" }}>
      <Canvas dragAble={true}>
        <Line />
        <Point x={0} y={0} />
      </Canvas>
    </div>
  );
}

export default App;
