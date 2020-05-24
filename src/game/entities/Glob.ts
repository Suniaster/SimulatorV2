import Entity from "./Entity";
import World from "../WorldEngine";
import { Point, EntityOptions } from "../helpers/types";
import RectangleEntity from "./RectangleEntity";

export default class Glob extends RectangleEntity {

    constructor(world: World, entityOptions: EntityOptions){
        entityOptions.size = {width: 25, height: 25}
        super(world, entityOptions)
    }

    public handleCollisionWith(entity:Entity){}
}