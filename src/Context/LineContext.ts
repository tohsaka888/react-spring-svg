import React, { createContext, MutableRefObject } from "react";

type LineContextProps = {
  lines: MutableRefObject<SVGPathElement>[]
  setLines: React.Dispatch<React.SetStateAction<MutableRefObject<SVGPathElement>[]>>
}

export const LineContext = createContext<LineContextProps | null>(null)