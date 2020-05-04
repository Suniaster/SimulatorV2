import P5World from "./P5World";

export type Point = {x:number, y:number}

export type P5EntityInfo = {
    x: number,
    y: number,
    type: string,
    size: {width:number, heigth:number},
    id: string,
    vel: Point,
    accel: Point
}

export default class P5Entity{
    constructor(private info:P5EntityInfo, private world:P5World){
        this.update(this.info)
    }

    update(entityInfo: P5EntityInfo){
        this.info = entityInfo
    }

    draw(){
        this.move();

        let p = this.world.p
        p.push()
        p.fill(255,0,0)

        p.ellipse( 
            this.info.x,
            this.info.y,
            this.info.size.width,
            this.info.size.heigth
        )
        p.pop()
    }


    private move(){
        this.updateVel();
        let dt = this.world.p5Controller.dt
        let dt_2 = dt*dt

        this.info.x += this.info.vel.x*dt + (this.info.accel.x*dt_2*0.5)
        this.info.y += this.info.vel.y*dt + (this.info.accel.y*dt_2*0.5)
    }

    private updateVel(){
        let dt = this.world.p5Controller.dt

        this.info.vel.x += dt*this.info.accel.x
        this.info.vel.y += dt*this.info.accel.y
    }
}