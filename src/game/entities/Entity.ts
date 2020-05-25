import  { Polygon } from 'detect-collisions'
import { EntityInfo, EntityOptions } from '../helpers/types';
import Vector2D from '../helpers/Vector2D';
import World from '../WorldEngine';
import { v4 as uuidv4 } from 'uuid';

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
    protected points: number[][];
    public readonly id:string;

    constructor(
        public world:World,
        entityOptions: EntityOptions = {}
    ){
        super(
            entityOptions.position.x, 
            entityOptions.position.y,
            entityOptions.points
        )
        
        let defaultOptions: EntityOptions = {
            position: {x: 0,y: 0},
            points: [[0,0]],
            id: uuidv4(),
            vel: new Vector2D(0,0),
            accel: new Vector2D(0,0),
            growthRate: 1, 
            maxVel: 300
        }

        let opt = Object.assign(defaultOptions, entityOptions)
        //
        this.points = opt.points
        this.id     = opt.id
        this.vel    = opt.vel
        this.maxVel = opt.maxVel;
        this.accel  = opt.accel;
        this.type   = this.constructor.name;
        this.growthRate = opt.growthRate;
    }
    
    public abstract handleCollisionWith(entity: Entity);
    protected beforeMove(){}
    protected afterMove(){}
    protected beforeUpdate(){}
    protected afterUpdate(){};
    
    public getInfo(): EntityInfo{
        return {
            position:{
                x: this.x,
                y: this.y,
            },
            vel: this.vel,
            accel: this.accel,
            type: this.type,
            id: this.id,
            growthRate: this.growthRate,
            maxVel: this.maxVel
        }
    }

    public updateByInfo(info:EntityInfo){
        this.x = info.position.x
        this.y = info.position.y

        this.vel = info.vel
        this.accel = info.accel
        this.growthRate = info.growthRate
        this.maxVel = info.maxVel
    }
    /**
     *  return a boolean indicating if entity has moved
     */
    public update(): boolean{
        this.beforeUpdate();
        this.updateVel();

        let dt = 1/this.world.updateRate
        let dt_2 = (dt*dt)

        if(this.growthRate !== 1){
            this.scale({scale_x: Math.pow(this.growthRate, dt), scale_y: Math.pow(this.growthRate, dt)})
        }

        if(this.vel.x !== 0 || this.vel.y !== 0){
            this.beforeMove();
            this.x += (this.vel.x * dt) + (dt_2*this.accel.x * 0.5)
            this.y += (this.vel.y * dt) + (dt_2*this.accel.y * 0.5) 
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

    public changeGrowthRate(newGrowthRate:number, emitEvent=true){
        this.growthRate = newGrowthRate
        if(emitEvent)
            this.emitSelfUpdate();
    }

    public create(){
        this.world.entities.register(this);
    }

    public destroy(){
        this.world
            .entities
            .remove(this) 
    }
    
    public getPosVector(){
        return new Vector2D(this.x, this.y)
    }

    protected scale({scale_x=1, scale_y=1}){
        this.scale_x *= scale_x
        this.scale_y *= scale_y

    }

    public emitSelfUpdate(){
        this.world.events.emit("updateObjects", [this.getInfo()])
    }

    private updateVel(){
        let dt = 1/ this.world.updateRate
        if(this.accel.x !== 0 || this.accel.y !== 0 ){
            this.vel.x += this.accel.x * dt
            this.vel.y += this.accel.y * dt
            // this.vel.limit(this.maxVel);
        }
    }

}