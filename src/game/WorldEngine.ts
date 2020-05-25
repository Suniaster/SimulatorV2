import EntityManager from "./EntityManager";
import { EventEmitter } from "events";
import {WorldConfig} from './helpers/types'

export default class World{
    public entities: EntityManager
    private timeControl: NodeJS.Timeout
    static size = {width: 1200, height: 800}
    public time:number;
    private fixedDt:number
    public events: EventEmitter;

    // Options
    public config: WorldConfig;

    constructor(worldOptions:WorldConfig = {}){
        let defaultOption: WorldConfig = {
            updateRate: 15,
            shouldHandleCollisions: true,
            drawWorld: false,
            dom:{
                canvasId: "worldCanvas",
                canvasCtx: null,
                canvas: null
            }
        }
        this.config = Object.assign(defaultOption, worldOptions)
        this.entities = new EntityManager(this);
        
        this.time = 0;
        this.fixedDt = 1/this.config.updateRate;
        this.events = new EventEmitter();

        // Options
        if(this.config.drawWorld){
            this.config
                .dom
                .canvas = document.getElementById(this.config.dom.canvasId) as HTMLCanvasElement
            if(!this.config.dom.canvasCtx)
                this.config.dom.canvasCtx = this.config.dom.canvas.getContext("2d")
        }
    }

    public setup(){}

    public stop(){
        clearInterval(this.timeControl)
    }
    
    public reset(){
        this.entities.reset();
    }

    public draw(){
        let ctx = this.config.dom.canvasCtx;
        let canvas = this.config.dom.canvas
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.entities.collisionSystem.draw(ctx)
    }

    public timeStep(){
        this.events.emit("preTimeStep")
        this.entities.updateAllEntities(this.fixedDt);
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