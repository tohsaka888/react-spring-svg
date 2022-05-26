import { useDrag } from "@use-gesture/react";
import React, { useContext, useEffect, useRef } from "react";
import { useSpring, animated, config } from "react-spring";
import { CanvasContext } from "../../Context/CanvasContext";
import { LineContext } from "../../Context/LineContext";
import { PointsContext } from "../../Context/PointsContext";
import { Entity, POINT, Position } from "../../type";
import { PointContainer, PointName } from "./index.style";
const Point = React.memo(function ({
  x = 0,
  y = 0,
  d = 50,
  id,
  name,
  label,
}: Position & POINT & Entity) {
  const [position, setPosition] = useSpring(() => ({
    x: x,
    y: y,
    config: config.stiff,
  }));

  const { lines } = useContext(LineContext)!;
  const { scaleSize } = useContext(CanvasContext)!;

  const pointRef = useRef<SVGForeignObjectElement>(null!);

  const { setPoints } = useContext(PointsContext)!;

  const edges = lines.filter((line) => line.current.id.includes(id));
  const fromLines = edges.filter((line) => line.current.id.indexOf(id) === 0);
  const toLines = edges.filter((line) => line.current.id.indexOf(id) !== 0);

  console.log("rerender");

  const drag = useDrag(
    ({ event, offset: [ox, oy] }) => {
      // 阻止事件冒泡
      event.stopPropagation();
      event.preventDefault();

      let newX = ox / scaleSize + x;
      let newY = oy / scaleSize + y;
      setPosition.start({ x: newX, y: newY, immediate: true });
      fromLines.forEach((line) => {
        const originPath = line.current.attributes[0].value;
        const tempArr = originPath.split("L");
        const newPath = `M ${newX + d / 2} ${newY + d / 2} L${tempArr[1]}`;
        line.current.attributes[0].value = newPath;
      });
      toLines.forEach((line) => {
        const originPath = line.current.attributes[0].value;
        const tempArr = originPath.split("L");
        const newPath = `${tempArr[0]} L ${newX + d / 2} ${newY + d / 2}`;
        line.current.attributes[0].value = newPath;
      });
    },
    {
      filterTaps: true,
      pointer: {
        capture: true,
      },
    }
  );

  useEffect(() => {
    if (pointRef) {
      setPoints((points) => [...points, pointRef]);
    }
  }, [setPoints]);

  return (
    <animated.foreignObject
      {...drag()}
      {...position}
      id={id}
      style={{ width: d + 10, height: d + 30, touchAction: "none" }}
      ref={pointRef}
    >
      <PointContainer d={d}>{label}</PointContainer>
      <PointName width={d + 5}>{name}</PointName>
    </animated.foreignObject>
  );
});

export default Point;
