import Entity from "./Entity";
import World from "../WorldEngine";
import RectangleEntity from "./RectangleEntity";
import { RectangleEntityOptions } from "../helpers/types";

export default class Blob extends RectangleEntity {
  static minSize = 25;
  constructor(world: World, entityOptions: RectangleEntityOptions) {
    entityOptions.width = 100;
    entityOptions.height = 100;
    super(world, entityOptions);

    this.changeGrowthRate(0.95, false);
    this.maxVel = 100;
  }

  protected afterTimeStep() {
    if (this.width < Blob.minSize) {
      this.destroy();
    }
  }

  public handleCollisionWith(entity: Entity) {
    if (entity.type === "Glob") {
      entity.destroy();
      this.changeSize({
        width: this.width + 15,
        height: this.height + 15,
      });
    }

    if(entity.type === "Blob") {
      let blob = entity as Blob
      if(this.width > blob.width){
        this.changeSize({
          width: this.width + blob.width - 10,
          height: this.height + blob.height - 10,
        });
        blob.destroy();
      }
      else{
        blob.changeSize({
          width: this.width + blob.width - 10,
          height:  this.height + blob.height - 10,
        });
        this.destroy();
      }
    }
    return;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "#ab1311";
    ctx.fillStyle = "#ffdb12";
    ctx.beginPath();
    super.draw(ctx);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
  }

  moveInDirection(direction: { x: -1 | 0 | 1; y: -1 | 0 | 1 }) {
    this.changeVel({
      x: this.maxVel * direction.x,
      y: this.maxVel * direction.y,
    });
  }
}
