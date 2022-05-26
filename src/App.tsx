import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import Point from "./components/Point";
import fake_data from "./mock/fake_data.json";
import { PointsContext } from "./Context/PointsContext";
import { Entity } from "./type";
import Line from "./components/Line";
import { LineContext } from "./Context/LineContext";

function App() {
  const [model, setModel] = useState<Entity[]>([]);
  const [property, setProperty] = useState<Entity[]>([]);
  const [points, setPoints] = useState<
    MutableRefObject<SVGForeignObjectElement>[]
  >([]);
  const [lines, setLines] = useState<MutableRefObject<SVGPathElement>[]>([]);
  const formatData = useCallback(() => {
    let centerPoint: Entity[] = [];
    let defaultPoint: Entity[] = [];
    let datameta: Entity[] = [];
    let codeInfo: Entity[] = [];
    let terminology: Entity[] = [];
    let assetField: Entity[] = [];
    fake_data.data.entities.forEach((item) => {
      if (item.label === "model") {
        setModel((model) => [...model, item]);
      } else if (item.label === "asset") {
        centerPoint.push(item);
      } else if (item.label === "property") {
        console.log(item);
        setProperty((property) => [...property, item]);
      } else if (item.label === "datameta") {
        datameta.push(item);
      } else if (item.label === "codeinfo") {
        codeInfo.push(item);
      } else if (item.label === "terminology") {
        terminology.push(item);
      } else if (item.label === "assetfield") {
        assetField.push(item);
      } else {
        defaultPoint.push(item);
      }
    });
  }, []);

  useEffect(() => {
    formatData();
  }, [formatData]);
  return (
    <div style={{ border: "1px solid red", width: "1000px", height: "1000px" }}>
      <Canvas dragAble={true}>
        <PointsContext.Provider value={{ points, setPoints }}>
          <LineContext.Provider value={{ lines, setLines }}>
            {points.length > 0 && (
              <>
                <Line
                  fromId="model3058461587483181059"
                  toId="property3058461587483181063"
                  name={""}
                  d={50}
                />
                <Line
                  fromId="model3058461587483181059"
                  toId="property3058461587483181062"
                  name={""}
                  d={50}
                />
              </>
            )}
            {model.map((item, index) => {
              let x = 50 * (index + 1);
              let y = 50;
              return <Point {...item} x={x} y={y} key={item.id} />;
            })}
            {property.map((item, index) => {
              let x = 60 * (index + 1);
              let y = 150;
              return <Point {...item} x={x} y={y} key={item.id} />;
            })}
          </LineContext.Provider>
        </PointsContext.Provider>
      </Canvas>
    </div>
  );
}

export default App;
