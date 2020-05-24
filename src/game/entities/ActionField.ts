import Entity from "./Entity";
import RectangleEntity from "./RectangleEntity";


export default class ActionField extends RectangleEntity{
    constructor(size:{width: number, height: number}, private owner: Entity ){
        super(owner.world, {x: owner.x, y:owner.y}, size);
    }

    public beforeUpdate(){
        this.x = this.owner.x;
        this.y = this.owner.y;      
    }

    public handleCollisionWith(entity: Entity){}
}