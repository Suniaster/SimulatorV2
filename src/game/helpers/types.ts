import Vector2D from "./Vector2D"

export type EntityInfo = {
    position: Point,
    vel: Vector2D,
    accel: Vector2D,
    type: string,
    id: string,
    growthRate: number,
    maxVel: number,
    size?: {width:number, height:number}
}

export type EntityOptions={
    position?: Point,
    points?: number[][],
    id?: string,
    vel?: Vector2D,
    accel?: Vector2D,
    maxVel?: number,
    growthRate?: number,
    size?: {width:number, height:number}
}

export type Point = {
    x: number,
    y: number
}

export type Vector = {
    a: Point,
    b: Point
}

export type WorldOptions = {
    updateRate?: number,
    shouldHandleCollisions?: boolean,
    drawEntities?: boolean
}