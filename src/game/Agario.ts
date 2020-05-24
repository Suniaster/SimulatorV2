import World from "./WorldEngine";
import Blob from "./entities/Blob";
import Glob from "./entities/Glob";

export default class Agario extends World{

    public setup(){
        for(let i=0;i<50;i+=1){
            let pos = World.generateRandomCoord()
            new Glob(this, {x: pos.x, y: pos.y}).getAlive()
        }
    }

    public createBlob(id?:string){
        let spawnPoint = World.generateRandomCoord()
        let blob = new Blob(this, {x: spawnPoint.x, y:spawnPoint.y}, id)
        blob.getAlive()
        return blob;
    }

    protected beforeTimePasses(){
        if(this.time % 20 === 0){
            let pos = World.generateRandomCoord()
            new Glob(this, {x: pos.x, y: pos.y}).getAlive()
        }
    }

}