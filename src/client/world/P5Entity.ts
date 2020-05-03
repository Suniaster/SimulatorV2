import P5World from "./P5World";
type Point = {x:number, y:number}

export default class P5Entity{
    constructor(private position:Point, private size:Point, private type:string, private world:P5World){

    }

    updatePos(newPosition:Point){
        this.position = newPosition
    }

    draw(){
        this.world.p.image(
            this.world.p5Controller.imageController.getImage('boss'),
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        )
    }

}