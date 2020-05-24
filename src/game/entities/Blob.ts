import Entity, { Point } from "./Entity";
import World from "../WorldEngine";
import RectangleEntity from "./RectangleEntity";

export default class Blob extends RectangleEntity{
    static minSize = 25;
    constructor(world: World,position:Point, id?:string){
        super(world, position,  {
            width: 100,
            height: 100
        }, id)
        
        this.changeGrowthRate(0.95, false);
        this.maxVel = 100;
    }

    protected afterUpdate(){
        if(this.size.width < Blob.minSize){
            this.destroy();
        }
    }

    public handleCollisionWith(entity: Entity){
        if(entity.type === "Glob"){
            entity.destroy();
            this.changeSize({
                width: this.size.width + 15,
                height: this.size.height + 15
            })
        }
        return;
    }

    moveInDirection(direction:{ x: -1 | 0 | 1, y: -1 | 0 | 1 }){
        this.changeVel({
            x: this.maxVel*direction.x,
            y: this.maxVel*direction.y
        })
    }

}