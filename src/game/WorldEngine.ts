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

    constructor(worldOptions:WorldOptions = {
        updateRate: 15,
        shouldHandleCollisions: true
    }){
        this.entities = new EntityManager(this);
        
        this.time = 0;
        this.events = new EventEmitter();

        // Options
        this.updateRate = worldOptions.updateRate;
        this.shouldHandleCollisions = worldOptions.shouldHandleCollisions
    }

    public setup(){}

    public start(){
        this.timeControl = setInterval(this.passTime, 1000/this.updateRate)
    }

    public stop(){
        clearInterval(this.timeControl)
    }
    
    public reset(){
        this.entities.reset();
    }


    private passTime = () => {
        this.beforeTimePasses();
        this.entities.updateAllEntities();
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

    protected beforeTimePasses(){}
    protected afterTimePasses(){}
}   