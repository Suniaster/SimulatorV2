import Entity from "./Entity";


export default class ActionField extends Entity{
    constructor(size:{width: number, height: number}, private owner: Entity ){
        super(owner.world, {x: owner.x, y:owner.y}, size);
        this.emitWorldEvents = false;
    }

    public beforeUpdate(){
        this.x = this.owner.x;
        this.y = this.owner.y;      
    }

    public handleCollisionWith(entity: Entity){}
}