import World from "./WorldEngine";
import Blob from "./entities/Blob";
import Glob from "./entities/Glob";

export default class Agario extends World{


    public setup(){
        for(let i=0;i<50;i+=1){
            let pos = World.generateRandomCoord()
            new Glob(this, {position:{x: pos.x, y: pos.y}}).create()
        }

        this.events.on("preTimeStep", this.beforeTimePasses)
    }

    public createBlob(id?:string){
        let spawnPoint = World.generateRandomCoord()
        let blob = new Blob(this, {
            position:{   
                 x: spawnPoint.x, y:spawnPoint.y
            }, 
            id
        })
        blob.create()
        return blob;
    }

    protected beforeTimePasses(){
        if(this.time % 20 === 0){
            let pos = World.generateRandomCoord()
            new Glob(this, {position:{x: pos.x, y: pos.y}}).create()
        }
    }

}