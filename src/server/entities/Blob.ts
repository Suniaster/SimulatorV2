import Entity, { Point } from "./Entity";
import EntityManager from "../world/EntityManager";




export default class Blob extends Entity{
    type = "Blob";

    constructor(position:Point, size:{width:number, height:number}, id?:string){
        super(position, size, id)

        this.movementCallbacks.afterMove = () =>{
            this.scaleSize({scale_x:0.99, scale_y:0.99})
        }
    }

    public handleCollisionWith(entity: Entity, manager: EntityManager){
        return;
    }

}