import  { Polygon } from 'detect-collisions'
import EntityManager from '../world/EntityManager';
import config from '../config.json';
import { EntityInfo } from '../../shared/types';
import World from '../world/World';
import Vector2D from '../../shared/Vector2D';

export type Point = {
    x: number,
    y: number
}

export type Vector = {
    a: Point,
    b: Point
}


export default abstract class Entity extends Polygon{
    protected vel: Vector2D;
    protected accel: Vector2D;
    protected growthRate: number;
    public readonly type: string;    
    private originalSize: {width:number, height:number};

    constructor(protected world:World, position: Point, protected size?: {width:number, height:number}, public readonly id = Entity.makeid(6)){
        super(
            position.x, 
            position.y,
            [[0, 0],
            [size.width, 0],
            [size.width, size.height],
            [0, size.height]]
        )
        this.vel = new Vector2D(0,0);
        this.accel = new Vector2D(0,0);
        this.growthRate = 1;
        this.type = this.constructor.name;
        this.originalSize = this.size
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
    
    public abstract handleCollisionWith(entity: Entity);
    protected beforeMove(){}
    protected afterMove(){}
    protected beforeUpdate(){}
    protected afterUpdate(){}

    public getInfo(): EntityInfo{
        return {
            x: this.x,
            y: this.y,
            vel: this.vel,
            accel: this.accel,
            type: this.type,
            size: this.size,
            id: this.id,
            growthRate: this.growthRate
        }
    }

    /**
     *  return a boolean indicating if entity has moved
     */
    public update(): boolean{
        this.beforeUpdate();
        this.updateVel();

        let dt = 1/config.server.fps
        let dt_2 = (dt*dt)

        if(this.growthRate !== 1){
            this.scaleSize({scale_x: Math.pow(this.growthRate, dt), scale_y: Math.pow(this.growthRate, dt)})
        }

        if(this.vel.x !== 0 || this.vel.y !== 0){
            this.beforeMove();
            this.x += (this.vel.x * dt) + (dt_2*this.accel.x * 0.5)
            this.y += (this.vel.y * dt)+ (dt_2*this.accel.y * 0.5) 
            this.afterMove();
            this.afterUpdate();
            return true;
        }
        else{
            this.afterUpdate();
            return false;
        }        
    }

    public changeVelU(newVel: Point){
        this.vel.x = newVel.x
        this.vel.y = newVel.y
        this.updateSelfWorld();
    }

    public changeSizeU(newSize: {width:number, height:number}){
        let new_scale_x = newSize.width/this.originalSize.width;
        let new_scale_y = newSize.height/this.originalSize.height;

        this.scale_x = new_scale_x;
        this.scale_y = new_scale_y;

        this.size = newSize;
        this.updateSelfWorld();
    }

    public getAlive(){
        let entered = this.world.entities.register(this);
        if(entered){
            this.world.entities.collisionSystem.insert(this)
        }
    }

    public kill(){
        let removed = this.world
            .entities
            .remove(this) 
        if(removed){
            // removes from collision system
            this.remove() 
        }
    }
    
    protected scaleSize({scale_x=1, scale_y=1}){
        this.scale_x *= scale_x
        this.scale_y *= scale_y

        this.size.width *= scale_x
        this.size.height *= scale_y
    }

    public updateSelfWorld(){
        this.world.emitEvent("updateObjects", [this.getInfo()])
    }

    private updateVel(){
        let dt = 1/ config.server.fps
        this.vel.x += this.accel.x * dt
        this.vel.y += this.accel.y * dt
    }
}