import React, { createContext, MutableRefObject } from "react";

type PointsContextProps = {
  points: MutableRefObject<SVGForeignObjectElement>[]
  setPoints: React.Dispatch<React.SetStateAction<MutableRefObject<SVGForeignObjectElement>[]>>
}

export const PointsContext = createContext<PointsContextProps | null>(null)