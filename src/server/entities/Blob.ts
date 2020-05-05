import Entity, { Point } from "./Entity";
import EntityManager from "../world/EntityManager";
import World from "../world/World";




export default class Blob extends Entity{
    static minSize = 25;
    static maxVel = 100;
    constructor(world: World,position:Point, size:{width:number, height:number}, id?:string){
        super(world, position, size, id)
        this.growthRate = 0.9;

        this.movementCallbacks.afterExecute = () =>{
            if(this.size.width < Blob.minSize){
                this.world.entities.remove(this.id)
            }
        }
    }

    public handleCollisionWith(entity: Entity){
        if(entity.type === "Glob"){
            this.world.entities.remove(entity.id);
            this.changeSizeU({
                width: this.size.width + Blob.minSize,
                height: this.size.height + Blob.minSize
            })
        }
        return;
    }

    moveInDirection(direction:{ x: -1 | 0 | 1, y: -1 | 0 | 1 }){
        this.changeVelU({
            x: Blob.maxVel*direction.x,
            y: Blob.maxVel*direction.y
        })
    }

}