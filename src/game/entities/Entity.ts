import { Polygon } from "detect-collisions";
import { EntityOptions } from "../helpers/types";
import Vector2D from "../helpers/Vector2D";
import World from "../WorldEngine";
import { v4 as uuidv4 } from "uuid";

export type Point = {
  x: number;
  y: number;
};

export type Vector = {
  a: Point;
  b: Point;
};

export default abstract class Entity extends Polygon {
  private vel: Vector2D;
  private accel: Vector2D;
  private growthRate: number;
  protected maxVel: number;
  public readonly type: string;
  protected points: number[][];
  public readonly id: string;

  constructor(
    public world: World,
    entityOptions: EntityOptions = {},
  ) {
    super(
      entityOptions.x,
      entityOptions.y,
      entityOptions.points,
    );

    let defaultOptions: EntityOptions = {
      x: 0,
      y: 0,
      points: [[0, 0]],
      id: uuidv4(),
      vel: new Vector2D(0, 0),
      accel: new Vector2D(0, 0),
      growthRate: 1,
      maxVel: 300,
    };

    let opt = Object.assign(defaultOptions, entityOptions);
    this.updateByInfo(opt);
    this.type = this.constructor.name;
  }

  public abstract handleCollisionWith(entity: Entity);
  protected beforeMove() {}
  protected afterMove() {}
  protected beforeTimeStep() {}
  protected afterTimeStep() {}

  public getInfo(): EntityOptions {
    return {
      x: this.x,
      y: this.y,
      vel: this.vel,
      accel: this.accel,
      type: this.type,
      id: this.id,
      growthRate: this.growthRate,
      maxVel: this.maxVel,
      scale_x: this.scale_x,
      scale_y: this.scale_y,
    };
  }

  public updateByInfo(info: EntityOptions) {
    for (let key in info) {
      this[key] = info[key];
    }
  }
  /**
     *  return a boolean indicating if entity has moved
     */
  public timeStep(dt: number): boolean {
    this.beforeTimeStep();

    this.vel.x += this.accel.x * dt;
    this.vel.y += this.accel.y * dt;

    if (this.growthRate !== 1) {
      this.scale(
        {
          scale_x: Math.pow(this.growthRate, dt),
          scale_y: Math.pow(this.growthRate, dt),
        },
      );
    }

    if (this.vel.x !== 0 || this.vel.y !== 0) {
      this.beforeMove();
      this.x += (this.vel.x * dt);
      this.y += (this.vel.y * dt);
      this.afterMove();
      this.afterTimeStep();
      return true;
    } else {
      this.afterTimeStep();
      return false;
    }
  }

  public setAccel(newAccel:Point, emitEvent = true){
    this.accel.x = newAccel.x;
    this.accel.y = newAccel.y;

    if(emitEvent)
      this.emitSelfUpdate({ accel: this.accel })
  }

  public changeVel(newVel: Point, emitEvent = true) {
    this.vel.x = newVel.x;
    this.vel.y = newVel.y;
    if(emitEvent)
      this.emitSelfUpdate({ vel: this.vel });
  }

  public getVel() {return this.vel}

  public changeGrowthRate(newGrowthRate: number, emitEvent = true) {
    this.growthRate = newGrowthRate;
    if (emitEvent) {
      this.emitSelfUpdate({ growthRate: this.growthRate });
    }
  }

  public create() {
    this.world.entities.register(this);
  }

  public destroy() {
    this.world
      .entities
      .remove(this);
  }

  public getPosVector() {
    return new Vector2D(this.x, this.y);
  }

  protected scale({ scale_x = 1, scale_y = 1 }) {
    this.scale_x *= scale_x;
    this.scale_y *= scale_y;
    this.emitSelfUpdate({ scale_x: this.scale_x, scale_y: this.scale_y });
  }

  public emitSelfUpdate(changes = this.getInfo()) {
    changes.id = this.id;
    this.world.events.emit("updateObjects", [changes]);
  }
}
