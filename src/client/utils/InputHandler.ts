import p5 from "p5";
import ImageController from "./ImageController";
import Boss from "./Boss";

export default class InputHandler{
    public boss: Boss
    constructor(private p:p5, private imageController=new ImageController(p)){
        this.boss = new Boss(p, imageController)
    }

    handle(key){
        this.boss.move()
    }

}