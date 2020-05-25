import EntityManager from "./EntityManager";
import { EventEmitter } from "events";
import {WorldOptions} from './helpers/types'

export default class World{
    public entities: EntityManager
    private timeControl: NodeJS.Timeout
    static size = {width: 1200, height: 800}
    public time:number;
    public events: EventEmitter;

    // Options
    public updateRate: number;
    public shouldHandleCollisions: boolean;
    public drawEntities: boolean

    constructor(worldOptions:WorldOptions = {
        updateRate: 15,
        shouldHandleCollisions: true,
        drawEntities: false
    }){
        this.entities = new EntityManager(this);
        
        this.time = 0;
        this.events = new EventEmitter();

        // Options
        this.updateRate = worldOptions.updateRate;
        this.shouldHandleCollisions = worldOptions.shouldHandleCollisions;
        this.drawEntities = worldOptions.drawEntities
    }

    public setup(){}

    public start(){
        this.timeControl = setInterval(this.timeStep, 1000/this.updateRate)
    }

    public stop(){
        clearInterval(this.timeControl)
    }
    
    public reset(){
        this.entities.reset();
    }

    private timeStep = () => {
        this.events.emit("preTimeStep")
        this.entities.updateAllEntities();
        this.entities.performCollisions();
        this.time++;
        this.events.emit("posTimeStep")
    }

    static generateRandomCoord(){
        return {
            x: Math.floor(Math.random()*World.size.width),
            y: Math.floor(Math.random()*World.size.height)
        }
    }

}   