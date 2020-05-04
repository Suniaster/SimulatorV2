import P5World from "./P5World";
import { EntityInfo } from "../../shared/types";

export default class P5Entity{
    constructor(private info:EntityInfo, private world:P5World){
        this.update(this.info)
    }

    update(entityInfo: EntityInfo){
        this.info = entityInfo
    }

    draw(){
        this.move();

        let p = this.world.p
        p.push()
        p.fill(255,0,0)

        p.rect( 
            this.info.x,
            this.info.y,
            this.info.size.width,
            this.info.size.height
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