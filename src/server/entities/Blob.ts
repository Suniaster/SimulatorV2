import Entity, { Point } from "./Entity";
import EntityManager from "../world/EntityManager";




export default class Blob extends Entity{

    constructor(position:Point, size:{width:number, height:number}, id?:string){
        super(
            position, 
            size, 
            [[position.x            , position.y],
            [position.x + size.width, position.y],
            [position.x + size.width, position.y + size.height],
            [position.x             , position.y + size.height]
            ],
            id
        )
    }

    public collidesWith(entity: Entity, manager: EntityManager){
        return;
    }

}