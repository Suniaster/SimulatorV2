import P5Entity from "../P5Entity";
import { EntityInfo } from "../../../shared/types";
import P5World from "../P5World";



export default class P5Blob extends P5Entity{
    constructor(objectInfo:EntityInfo, world: P5World){
        super(
            objectInfo, 
            {
                color:{
                    r: 255,
                    g: 0,
                    b: 0
                }
            }, 
            world
        )
    }
} 