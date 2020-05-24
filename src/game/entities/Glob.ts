import Entity from "./Entity";
import World from "../WorldEngine";
import { Point } from "../helpers/types";
import RectangleEntity from "./RectangleEntity";

export default class Glob extends RectangleEntity {

    constructor(world: World, position:Point){
        super(world, position, {width: 25, height:25})
    }

    public handleCollisionWith(entity:Entity){}
}