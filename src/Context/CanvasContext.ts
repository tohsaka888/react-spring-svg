import { createContext } from "react";

type CanvasContextProps = {
  scaleSize: number;
  setScaleSize: React.Dispatch<React.SetStateAction<number>>;
}

export const CanvasContext = createContext<CanvasContextProps | null>(null);