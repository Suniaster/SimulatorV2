
export type EntityInfo = {
    x: number,
    y: number,
    vel: Point,
    accel: Point,
    type: string,
    size: {width:number, height:number},
    id: string,
    growthRate: number,
    maxVel: number
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
    shouldHandleCollisions?: boolean
}