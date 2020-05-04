import Entity from "./Entity";
import World from "../world/World";
import { Point } from "../../shared/types";

export default class Glob extends Entity {

    constructor(world: World, position:Point){
        super(world, position, {width: 25, height:25})
    }

    public handleCollisionWith(entity:Entity){}
}