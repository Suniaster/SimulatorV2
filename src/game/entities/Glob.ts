import Entity from "./Entity";
import World from "../WorldEngine";
import { Point } from "../helpers/types";

export default class Glob extends Entity {

    constructor(world: World, position:Point){
        super(world, position, {width: 25, height:25})
    }

    public handleCollisionWith(entity:Entity){}
}