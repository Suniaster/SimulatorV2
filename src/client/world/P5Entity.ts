import P5World from "./P5World";
import { EntityInfo } from "../../shared/types";

export type styleConfig = {
    color?: {
        r: number, g: number, b: number, alpha?:number
    },
    image?: {
        name: string
    }
}

export default abstract class P5Entity{
    private drawObject = () => {};
    constructor(private info:EntityInfo, protected style: styleConfig, private world:P5World){
        this.update(this.info)

        if(this.style.image){
            this.drawObject = this.drawnImage;
        }
        else{
            this.drawObject = this.drawnRect;
        }
    }

    public update(entityInfo: EntityInfo){
        this.info = entityInfo
    }

    public draw(){
        this.move();
        this.drawObject()
    }

    private drawnRect(){
        let p = this.world.p
        p.push()
        p.fill(
            this.style.color.r,
            this.style.color.g,
            this.style.color.b,
            this.style.color.alpha    
        )

        p.rect( 
            this.info.x,
            this.info.y,
            this.info.size.width,
            this.info.size.height
        )
        p.pop()
    }

    private drawnImage(){
        let image = this.world.p5Controller.imageController.getImage(this.style.image.name)
        this.world.p.image(
            image,
            this.info.x,
            this.info.y,
            this.info.size.width,
            this.info.size.height
        )
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