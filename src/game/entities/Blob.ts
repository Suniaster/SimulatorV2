import Entity, { Point } from "./Entity";
import World from "../WorldEngine";
import RectangleEntity from "./RectangleEntity";
import { EntityOptions } from "../helpers/types";

export default class Blob extends RectangleEntity {
  static minSize = 25;
  constructor(world: World, entityOptions: EntityOptions) {
    entityOptions.size = { width: 100, height: 100 };
    super(world, entityOptions);

    this.changeGrowthRate(0.95, false);
    this.maxVel = 100;
  }

  protected afterTimeStep() {
    if (this.size.width < Blob.minSize) {
      this.destroy();
    }
  }

  public handleCollisionWith(entity: Entity) {
    if (entity.type === "Glob") {
      entity.destroy();
      this.changeSize({
        width: this.size.width + 15,
        height: this.size.height + 15,
      });
    }
    return;
  }

  draw(ctx: CanvasRenderingContext2D){
    ctx.strokeStyle = '#ab1311';
    ctx.fillStyle = '#ffdb12'
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
