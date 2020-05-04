import EntityManager from "./EntityManager";
import Blob from "../entities/Blob";
import config from '../config.json'
import Glob from "../entities/Glob";


export default class World{
    public entities: EntityManager
    private timeControl: NodeJS.Timeout

    constructor(private io: SocketIO.Server){
    }

    public setup(){
        this.entities = new EntityManager(this);
        this.entities.register(new Glob(this, {x: 600, y:600}))
    }

    public start(){
        this.timeControl = setInterval( ()=>this.passTime(), 1000/config.server.fps)
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
        let blob = new Blob(this, {x: 100, y:100}, {width: 100, height:100}, id)
        return this.entities.register(blob);
    }

    private passTime(){
        this.entities.moveAllEntities();
        this.entities.performCollisions();
    }
}   