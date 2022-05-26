import React, { useContext, useEffect, useRef } from "react";
import { LineContext } from "../../Context/LineContext";
import { PointsContext } from "../../Context/PointsContext";
import { EDGE } from "../../type";

function Line(edge: EDGE) {
  const { points } = useContext(PointsContext)!;
  const startPoint = points.find((point) => point.current.id === edge.fromId);
  const endPoint = points.find((point) => point.current.id === edge.toId);
  const lineRef = useRef<SVGPathElement>(null!);
  const { setLines } = useContext(LineContext)!;

  useEffect(() => {
    if (lineRef) {
      setLines((lines) => [...lines, lineRef]);
    }
  }, [setLines]);

  return (
    <>
      {startPoint?.current && endPoint?.current && (
        <path
          d={`M ${startPoint?.current.x.animVal.value + 25} ${
            startPoint?.current.y.animVal.value + 25
          } L ${endPoint?.current.x.animVal.value + 25} ${
            endPoint?.current.y.animVal.value + 25
          }`}
          stroke="black"
          strokeWidth="1"
          id={edge.fromId + edge.toId}
          ref={lineRef}
        ></path>
      )}
    </>
  );
}

export default Line;
