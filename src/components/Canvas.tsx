import React, { ReactNode, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useDrag, useWheel } from "@use-gesture/react";
import { Position } from "../type";

type Props = {
  children?: ReactNode;
  dragAble?: boolean;
};

function Canvas({ children, dragAble = true }: Props) {
  const [scaleSize, setScaleSize] = useState<number>(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const [wheelStyle, setWheelStyle] = useSpring(() => ({
    transform: "scale(1)",
  }));

  const [dragStyle, setDragStyle] = useSpring(() => ({
    transform: "translate(0, 0)",
  }));

  const canvasWheel = useWheel(({ event, memo }) => {
    let currentSize = scaleSize;

    if (event.deltaY > 0) {
      if (currentSize - 0.1 > 0.01) {
        currentSize *= 0.9;
      }
    } else {
      currentSize *= 1.1;
    }
    setScaleSize(currentSize);
    setWheelStyle.start({ transform: `scale(${currentSize})` });

    return currentSize;
  });

  const canvasDrag = useDrag(({ event, delta, cancel }) => {
    event.stopPropagation();
    !dragAble && cancel();
    let x = position.x + delta[0];
    let y = position.y + delta[1];
    setDragStyle.start({
      transform: `translate(${x}, ${y})`,
    });
    setPosition((pos) => ({ x: pos.x + delta[0], y: pos.y + delta[1] }));
  });

  return (
    <svg
      style={{
        width: "100%",
        height: "100%",
        touchAction: "none",
        cursor: "grab",
      }}
      {...canvasWheel()}
      {...canvasDrag()}
    >
      <animated.g {...dragStyle}>
        <animated.g {...wheelStyle}>{children}</animated.g>
      </animated.g>
    </svg>
  );
}

export default Canvas;
