import { useDrag } from "@use-gesture/react";
import React from "react";
import { useSpring, animated, config } from "react-spring";
import { Position } from "../../type";
import { PointContainer } from "./index.style";

function Point({ x = 0, y = 0 }: Position) {
  const [position, setPosition] = useSpring(() => ({
    x: x,
    y: y,
    config: config.stiff,
  }));

  const drag = useDrag(
    ({ event, offset: [ox, oy] }) => {
      // 阻止事件冒泡
      event.stopPropagation();
      event.preventDefault();
      setPosition.start({ x: ox, y: oy, immediate: true });
    },
    {
      filterTaps: true,
    }
  );

  return (
    <animated.foreignObject
      {...drag()}
      {...position}
      style={{ width: "100px", height: "100px", touchAction: "none" }}
    >
      <PointContainer>Point</PointContainer>
    </animated.foreignObject>
  );
}

export default Point;
