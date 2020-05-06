import Entity, { Point } from "./Entity";
import World from "../world/World";


export default class Blob extends Entity{
    static minSize = 25;
    constructor(world: World,position:Point, id?:string){
        super(world, position,  {
            width: 100,
            height: 100
        }, id)
        
        this.growthRate = 0.95;
        this.maxVel = 100;
    }

    protected afterUpdate(){
        if(this.size.width < Blob.minSize){
            this.kill();
        }
    }

    public handleCollisionWith(entity: Entity){
        if(entity.type === "Glob"){
            entity.kill();
            this.changeSizeU({
                width: this.size.width + 15,
                height: this.size.height + 15
            })
        }
        return;
    }

    moveInDirection(direction:{ x: -1 | 0 | 1, y: -1 | 0 | 1 }){
        this.changeVelU({
            x: this.maxVel*direction.x,
            y: this.maxVel*direction.y
        })
    }

}