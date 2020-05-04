import Entity, { Point } from "./Entity";
import EntityManager from "../world/EntityManager";
import World from "../world/World";




export default class Blob extends Entity{
    type = "Blob";
    static minSize = 25;

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
        return;
    }

}