import EntityManager from "./EntityManager";
import Blob from "../entities/Blob";
import config from '../config.json'
import Glob from "../entities/Glob";


export default class World{
    public entities: EntityManager
    private timeControl: NodeJS.Timeout
    static size = {width: 1200, height: 800}
    public time;

    constructor(private io: SocketIO.Server){
        this.entities = new EntityManager(this);
        this.time = 0;
    }

    public setup(){
        for(let i=0;i<50;i+=1){
            let pos = World.generateRandomCoord()
            new Glob(this, {x: pos.x, y: pos.y}).getAlive()
        }
    }

    public start(){
        this.timeControl = setInterval(this.passTime, 1000/config.server.fps)
    }

    public stop(){
        clearInterval(this.timeControl)
    }
    
    public reset(){
        this.entities.reset();
    }

    public emitEvent(eventName:string, ...args){
        this.io.emit(eventName, ...args);
    }

    public createBlob(id?:string){
        let spawnPoint = World.generateRandomCoord()
        let blob = new Blob(this, {x: spawnPoint.x, y:spawnPoint.y}, id)
        blob.getAlive()
        return blob;
    }

    private passTime = () => {
        this.beforeTimePasses();
        this.entities.moveAllEntities();
        this.entities.performCollisions();
        this.time++;
        this.afterTimePasses();
    }

    static generateRandomCoord(){
        return {
            x: Math.floor(Math.random()*World.size.width),
            y: Math.floor(Math.random()*World.size.height)
        }
    }


    private beforeTimePasses(){
        if(this.time % 20 === 0){
            let pos = World.generateRandomCoord()
            new Glob(this, {x: pos.x, y: pos.y}).getAlive()
        }
    }

    private afterTimePasses(){

    }
}   