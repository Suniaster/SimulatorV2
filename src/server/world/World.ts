import EntityManager from "./EntityManager";
import Blob from "../entities/Blob";



export default class World{
    public entities: EntityManager
    private timeControl: NodeJS.Timeout

    constructor(){
    }

    public setup(){
        this.entities = new EntityManager();

        /** Testing **/
        let blob = new Blob({x: 100, y:100}, {width: 50, height:50}, 'blob')
        this.entities.register(blob);
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

    private passTime(){
        this.entities.moveAllEntities();
        this.entities.performCollisions();
    }
}   