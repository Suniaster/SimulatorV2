import EntityManager from "./EntityManager";
import { EventEmitter } from "events";
import {WorldOptions, WorldDomConfig} from './helpers/types'

export default class World{
    public entities: EntityManager
    private timeControl: NodeJS.Timeout
    static size = {width: 1200, height: 800}
    public time:number;
    public events: EventEmitter;

    // Options
    public updateRate: number;
    public shouldHandleCollisions: boolean;
    public drawWorld: boolean
    public dom: WorldDomConfig;

    constructor(worldOptions:WorldOptions = {}){
        let defaultOption: WorldOptions = {
            updateRate: 15,
            shouldHandleCollisions: true,
            drawWorld: false,
            dom:{
                canvasId: "worldCanvas",
                canvasCtx: null,
                canvas: null
            }
        }
        worldOptions = Object.assign(defaultOption, worldOptions)
        this.entities = new EntityManager(this);
        
        this.time = 0;
        this.events = new EventEmitter();

        // Options
        this.updateRate = worldOptions.updateRate;
        this.shouldHandleCollisions = worldOptions.shouldHandleCollisions;
        this.drawWorld = worldOptions.drawWorld;
        this.dom = defaultOption.dom
        if(this.drawWorld){
            this.dom.canvas = document.getElementById(this.dom.canvasId) as HTMLCanvasElement
            if(!this.dom.canvasCtx)
                this.dom.canvasCtx = this.dom.canvas.getContext("2d")
        }
    }

    public setup(){}

    public start(){
        this.timeControl = setInterval(this.timeStep.bind(this), 1000/this.updateRate)
    }

    public stop(){
        clearInterval(this.timeControl)
    }
    
    public reset(){
        this.entities.reset();
    }

    private timeStep(){
        this.events.emit("preTimeStep")
        this.entities.updateAllEntities();
        this.entities.performCollisions();
        this.time++;
        if(this.drawWorld){
            let ctx  = this.dom.canvasCtx;
            let canvas = this.dom.canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.entities.collisionSystem.draw(ctx)
        }
        this.events.emit("posTimeStep")
    }

    static generateRandomCoord(){
        return {
            x: Math.floor(Math.random()*World.size.width),
            y: Math.floor(Math.random()*World.size.height)
        }
    }

}   