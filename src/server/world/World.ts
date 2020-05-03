import EntityManager from "./EntityManager";
import Blob from "../entities/Blob";



export default class World{
    public entities: EntityManager
    private timeControl: NodeJS.Timeout

    constructor(){
    }

    public setup(){
        this.entities = new EntityManager();
    }

    public start(){
        this.timeControl = setInterval( ()=>this.passTime(), 1000)
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
        this.entities.moveAllEntities();
        this.entities.performCollisions();
    }
}   