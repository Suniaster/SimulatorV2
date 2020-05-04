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
    public readonly type: string;

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
        this.updateVel();

        let dt = 1/config.server.fps
        let dt_2 = (dt*dt)
        if(this.vel.x !== 0 || this.vel.y !== 0){
            this.x += (this.vel.x * dt) + (dt_2*this.accel.x * 0.5)
            this.y += (this.vel.y * dt)+ (dt_2*this.accel.y * 0.5) 
            return true;
        }
        else{
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