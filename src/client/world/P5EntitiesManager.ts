import P5Entity from "./P5Entity";
import P5World from "./P5World";
import { EntityInfo } from "../../shared/types";

export default class P5EntitiesManager{
    storage: {[id: string]: P5Entity}

    constructor(public world: P5World){
        this.storage = {}
    }

    public register(objectInfo: EntityInfo){
        this.storage[objectInfo.id] = new P5Entity(
            objectInfo,
            this.world
        )
    }

    public updateOrCreateEntity(objectInfo: EntityInfo){
        if(this.storage[objectInfo.id]){
            this.storage[objectInfo.id].update(objectInfo)
        }
        else{
            this.register(objectInfo)
        }
    }

    public delete(id){
        delete this.storage[id]
    }

    public drawAll(){
        Object.values(this.storage).forEach( entity => {
            entity.draw();
        })
    }
}