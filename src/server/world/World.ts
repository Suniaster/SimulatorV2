import EntityManager from "./EntityManager";
import Blob from "../entities/Blob";



export default class World{
    public entities: EntityManager
    private timeControl: NodeJS.Timeout

    constructor(private io: SocketIO.Server){
    }

    public setup(){
        this.entities = new EntityManager();
    }

    public start(){
        this.timeControl = setInterval( ()=>this.passTime(), 1000/30)
    }

    public stop(){
        clearInterval(this.timeControl)
    }
    
    public reset(){
        this.entities.reset();
    }

    public createBlob(id?:string){
        let blob = new Blob({x: 100, y:100}, {width: 50, height:50}, id)
        this.entities.register(blob);
    }

    private passTime(){
        let movedInfos = this.entities.moveAllEntities();
        this.entities.performCollisions();

        if(movedInfos.length > 0) this.io.emit('updateObjects', movedInfos);
    }
}   