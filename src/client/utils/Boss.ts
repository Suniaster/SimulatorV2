import p5 from "p5";
import ImageController from "./ImageController";

export default class Boss{
    pos:any

    constructor(private p:p5, private imageController:ImageController){
        this.pos = {
            x: 0,
            y: 0
        }
    }

    move(){
        this.pos.y += 20
    }

    draw(){
        this.p.image(this.imageController.getImage('boss'), this.pos.x, this.pos.y)
    }

}