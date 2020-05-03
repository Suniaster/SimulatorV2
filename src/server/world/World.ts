import EntityManager from "./EntityManager";



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

    private passTime(){
        this.entities.moveAllEntities();
        this.entities.performCollisions();
    }
}   