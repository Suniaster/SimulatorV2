import Vector2D from "./Vector2D";

export type EntityInfo = {
  position: Point;
  vel: Vector2D;
  accel: Vector2D;
  type: string;
  id: string;
  growthRate: number;
  maxVel: number;
  size?: { width: number; height: number };
};

export type EntityOptions = {
  position?: Point;
  points?: number[][];
  id?: string;
  vel?: Vector2D;
  accel?: Vector2D;
  maxVel?: number;
  growthRate?: number;
  size?: { width: number; height: number };
};

export type Point = {
  x: number;
  y: number;
};

export type Vector = {
  a: Point;
  b: Point;
};

export type WorldConfig = {
  updateRate?: number;
  handleCollisions?: boolean;
  drawWorld?: boolean;
  dom?: WorldDomConfig;
};

export type WorldDomConfig = {
  canvasId?: string;
  canvasCtx?: CanvasRenderingContext2D;
  canvas?: HTMLCanvasElement;
};

export type ClientEngineConfig = {
  canvas?: {
    width?: number;
    height?: number;
    id?: string;
  };
  handleCollisions?: boolean;
};

export type ServerEngineConfig = {};
