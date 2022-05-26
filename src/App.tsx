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
import { EDGE, Entity } from "./type";
import Line from "./components/Line";
import { LineContext } from "./Context/LineContext";

function App() {
  const [model, setModel] = useState<Entity[]>([]);
  const [property, setProperty] = useState<Entity[]>([]);
  const [assets, setAssets] = useState<Entity[]>([]);
  const [datameta, setDatameta] = useState<Entity[]>([]);
  const [codeInfo, setCodeInfo] = useState<Entity[]>([]);
  const [restPoint, setRestPoint] = useState<Entity[]>([]);
  const [terminology, setTerminology] = useState<Entity[]>([]);
  const [assetField, setAssetField] = useState<Entity[]>([]);
  const [edges, setEdges] = useState<EDGE[]>([]);

  const [points, setPoints] = useState<
    MutableRefObject<SVGForeignObjectElement>[]
  >([]);

  const [lines, setLines] = useState<MutableRefObject<SVGPathElement>[]>([]);
  const formatData = useCallback(() => {
    fake_data.data.entities.forEach((item) => {
      if (item.label === "model") {
        setModel((model) => [...model, item]);
      } else if (item.label === "asset") {
        setAssets((assets) => [...assets, item]);
      } else if (item.label === "property") {
        setProperty((property) => [...property, item]);
      } else if (item.label === "datameta") {
        setDatameta((datameta) => [...datameta, item]);
      } else if (item.label === "codeinfo") {
        setCodeInfo((codeInfo) => [...codeInfo, item]);
      } else if (item.label === "terminology") {
        setTerminology((terminology) => [...terminology, item]);
      } else if (item.label === "assetfield") {
        setAssetField((assetField) => [...assetField, item]);
      } else {
        setRestPoint((restPoint) => [...restPoint, item]);
      }
    });
    setEdges(fake_data.data.edges);
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
                {edges.map((item) => (
                  <Line {...item} d={50} />
                ))}
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
            {datameta.map((item, index) => {
              let x = 160 * (index + 1);
              let y = 50;
              return <Point {...item} x={x} y={y} key={item.id} />;
            })}
            {assets.map((item) => {
              let x = 500;
              let y = 500;
              return <Point {...item} x={x} y={y} key={item.id} />;
            })}
            {restPoint.map((item, index) => {
              let x = 80 * index + 1;
              let y = 400;
              return <Point {...item} x={x} y={y} key={item.id} />;
            })}
            {codeInfo.map((item, index) => {
              let x = 80 * index + 1;
              let y = 600;
              return <Point {...item} x={x} y={y} key={item.id} />;
            })}
            {terminology.map((item, index) => {
              let x = 80 * index + 1;
              let y = 300;
              return <Point {...item} x={x} y={y} key={item.id} />;
            })}
            {assetField.map((item, index) => {
              let x = 80 * index + 1;
              let y = 700;
              return <Point {...item} x={x} y={y} key={item.id} />;
            })}
          </LineContext.Provider>
        </PointsContext.Provider>
      </Canvas>
    </div>
  );
}

export default App;
