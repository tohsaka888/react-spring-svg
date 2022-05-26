import React, { useContext, useEffect, useRef } from "react";
import { primaryColor } from "../../common.style";
import { LineContext } from "../../Context/LineContext";
import { PointsContext } from "../../Context/PointsContext";
import { EDGE } from "../../type";

function Line({ d, ...edge }: EDGE & { d: number }) {
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
          d={`M ${startPoint?.current.x.animVal.value + d / 2} ${
            startPoint?.current.y.animVal.value + d / 2
          } L ${endPoint?.current.x.animVal.value + d / 2} ${
            endPoint?.current.y.animVal.value + d / 2
          }`}
          stroke={primaryColor}
          strokeWidth="1"
          id={edge.fromId + edge.toId}
          ref={lineRef}
        ></path>
      )}
    </>
  );
}

export default Line;
