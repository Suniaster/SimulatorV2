import  { Polygon } from 'detect-collisions'
import { EntityInfo } from '../helpers/types';
import Vector2D from '../helpers/Vector2D';
import World from '../WorldEngine';

export type Point = {
    x: number,
    y: number
}

export type Vector = {
    a: Point,
    b: Point
}


export default abstract class Entity extends Polygon{
    private vel: Vector2D;
    private accel: Vector2D;
    private growthRate: number;
    protected maxVel: number;
    public readonly type: string;    
    private originalSize: {width:number, height:number};

    constructor(public world:World, position: Point, protected size?: {width:number, height:number}, public readonly id = Entity.makeid(6)){
        super(
            position.x, 
            position.y,
            [
            [-size.width/2, -size.height/2],
            [ size.width/2, -size.height/2],
            [ size.width/2,  size.height/2],
            [-size.width/2,  size.height/2]
            ]
        )
        this.vel = new Vector2D(0,0);
        this.maxVel = 300;
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
            growthRate: this.growthRate,
            maxVel: this.maxVel
        }
    }

    /**
     *  return a boolean indicating if entity has moved
     */
    public update(): boolean{
        this.beforeUpdate();
        this.updateVel();

        let dt = 1/this.world.fps
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

    public changeVel(newVel: Point){
        this.vel.x = newVel.x
        this.vel.y = newVel.y
        this.emitSelfUpdate();
    }

    public changeSize(newSize: {width:number, height:number}){
        let new_scale_x = newSize.width/this.originalSize.width;
        let new_scale_y = newSize.height/this.originalSize.height;

        this.scale_x = new_scale_x;
        this.scale_y = new_scale_y;

        this.size = newSize;
        this.emitSelfUpdate();
    }

    public changeGrowthRate(newGrowthRate:number, emitEvent=true){
        this.growthRate = newGrowthRate
        if(emitEvent)
            this.emitSelfUpdate();
    }

    public getAlive(){
        this.defaultGetAlive();
    }

    public kill(){
        this.defaultKill();
    }
    
    public getPos(){
        return new Vector2D(this.x, this.y)
    }
    protected scaleSize({scale_x=1, scale_y=1}){
        this.scale_x *= scale_x
        this.scale_y *= scale_y

        this.size.width *= scale_x
        this.size.height *= scale_y
    }

    public emitSelfUpdate(){
        this.world.events.emit("updateObjects", [this.getInfo()])
    }

    private updateVel(){
        let dt = 1/ this.world.fps
        if(this.accel.x !== 0 || this.accel.y !== 0 ){
            this.vel.x += this.accel.x * dt
            this.vel.y += this.accel.y * dt
            // this.vel.limit(this.maxVel);
        }
    }

    protected defaultGetAlive(){
        let entered = this.world.entities.register(this);
        if(entered){
            this.world.entities.collisionSystem.insert(this)
        }
    }

    protected defaultKill(){
        let removed = this.world
            .entities
            .remove(this) 
        if(removed){
            // removes from collision system
            this.remove() 
        }
    }

}