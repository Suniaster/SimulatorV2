import P5Entity from "./P5Entity";
import P5World from "./P5World";
import { EntityInfo } from "../../shared/types";
import P5Blob from "./entities/Blob";

export default class P5EntitiesManager{
    storage: {[id: string]: P5Entity}

    constructor(public world: P5World){
        this.storage = {}
    }

    public register(objectInfo: EntityInfo){
        switch(objectInfo.type){
            case "Blob":
                this.storage[objectInfo.id] = new P5Blob(
                    objectInfo,
                    this.world
                )
            break;
            default:
                this.storage[objectInfo.id] = new P5Blob(
                    objectInfo,
                    this.world
                )
            break;
        }
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

    public get(id){
        return this.storage[id]
    }

    public drawAll(){
        Object.values(this.storage).forEach( entity => {
            entity.draw();
        })
    }
}