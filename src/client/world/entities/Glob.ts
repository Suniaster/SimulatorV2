import P5Entity from "../P5Entity";
import { EntityInfo } from "../../../shared/types";
import P5World from "../P5World";




export default class P5Glob extends P5Entity{
    constructor(objectInfo:EntityInfo, world: P5World){
        super(
            objectInfo, 
            {
                color:{
                    r: Math.floor(Math.random()*255),
                    g: Math.floor(Math.random()*255),
                    b: Math.floor(Math.random()*255)
                }
            }, 
            world
        )
    }
}