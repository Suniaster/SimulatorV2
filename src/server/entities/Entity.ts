import  { Polygon } from 'detect-collisions'
import EntityManager from '../world/EntityManager';
import config from '../config.json';
import { EntityInfo } from '../../shared/types';

export type Point = {
    x: number,
    y: number
}

export type Vector = {
    a: Point,
    b: Point
}


export default abstract class Entity extends Polygon{
    protected vel: Point;
    protected accel: Point;
    protected movementCallbacks:{
        beforeMove:()=>void, 
        afterMove:()=>void,
        beforeExectute:()=>void,
        afterExecute:()=>void
    }
    public readonly type: string;
    
    /**
     * ### Movement
     * 
     * @field movementCallbacks.beforeMove its called only when object moves
     * @field movementCallbacks.afterMove  its called after object moves
     * @field movementCallbacks.beforeExectute its called always before function starts
     * @field movementCallbacks.afterExecute  its called always right before function returns
     * 
     * Order of execution:
     * 
     * beforeExecute -> beforeMove -> position changes -> afterMove -> afterExecute
     */
    constructor(position: Point, public size?: {width:number, height:number}, points?:number[][], public readonly id = Entity.makeid(6)){
        super(position.x, position.y, points)
        this.vel = {
            x: 0,
            y: 0
        }
        this.accel = {
            x: 0,
            y: 0
        }
        this.movementCallbacks = {
            beforeMove: ()=>{}, 
            afterMove: ()=>{},
            beforeExectute: ()=>{},
            afterExecute: ()=>{}
        }
    }

    static makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    public abstract collidesWith(entity: Entity, manager: EntityManager);

    public getInfo(): EntityInfo{
        return {
            x: this.x,
            y: this.y,
            vel: this.vel,
            accel: this.accel,
            type: this.type,
            size: this.size,
            id: this.id
        }
    }

    /**
     *  return a boolean indicating if entity has moved
     */
    public move(): boolean{
        this.movementCallbacks.beforeExectute();
        this.updateVel();

        let dt = 1/config.server.fps
        let dt_2 = (dt*dt)
        if(this.vel.x !== 0 || this.vel.y !== 0){
            this.movementCallbacks.beforeMove();
            this.x += (this.vel.x * dt) + (dt_2*this.accel.x * 0.5)
            this.y += (this.vel.y * dt)+ (dt_2*this.accel.y * 0.5) 
            this.movementCallbacks.afterMove();
            this.movementCallbacks.afterExecute();
            return true;
        }
        else{
            this.movementCallbacks.afterExecute();
            return false;
        }        
    }

    public moveByOffSet(offSet:Point){
        this.x += offSet.x;
        this.y += offSet.y;
    }

    public setVel(newVel:Point){
        this.vel = newVel;
    }

    public setVelByOffSet(offset:Point){
        this.vel.x += offset.x;
        this.vel.y += offset.y;
    }

    private updateVel(){
        let dt = 1/ config.server.fps
        this.vel.x += this.accel.x * dt
        this.vel.y += this.accel.y * dt
    }

    
}