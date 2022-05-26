export type Position = {
  x: number;
  y: number;
}

export type POINT = {
  d?: number;
}

export type Entity = {
  id: string;
  name: string;
  label: string;
  childEntities?: {
    id: string;
    name: string;
    label: string;
  }[]
}

export type EDGE = {
  fromId: string;
  toId: string;
  name: string | null;
  isDraw?: boolean;
  showArraw?: boolean;
}

export type DATA = {
  model: Entity[];
  centerPoint: Entity[];
  defaultPoint: Entity[];
  datameta: Entity[];
  codeInfo: Entity[];
  terminology: Entity[];
  property: Entity[];
  assetField: Entity[];
  edges: EDGE[];
}