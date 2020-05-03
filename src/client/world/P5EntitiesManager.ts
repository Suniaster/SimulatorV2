import P5Entity from "./P5Entity";
import P5World from "./P5World";

type Point = {x:number, y:number}

type EntityInfo = {
    x: number,
    y: number,
    type: string,
    size: {width:number, height:number},
    id: string
}

export default class P5EntitiesManager{
    storage: {[id: string]: P5Entity}

    constructor(public world: P5World){
        this.storage = {}
    }

    public register(objectInfo: EntityInfo){
        this.storage[objectInfo.id] = new P5Entity({
            x: objectInfo.x,
            y: objectInfo.y
        },
        {
            x: objectInfo.size.width,
            y: objectInfo.size.height
        },
            objectInfo.type,
            this.world
        )
    }

    public updateOrCreateEntity(objectInfo: EntityInfo){
        if(this.storage[objectInfo.id]){
            this.storage[objectInfo.id].updatePos({
                x: objectInfo.x, 
                y: objectInfo.y
            })
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