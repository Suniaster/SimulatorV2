import Entity from "./Entity";
import World from "../WorldEngine";
import { Point, EntityOptions } from "../helpers/types";
import RectangleEntity from "./RectangleEntity";
import Vector2D from "../helpers/Vector2D";

export default class Glob extends RectangleEntity {
  constructor(world: World, entityOptions: EntityOptions) {
    entityOptions.width = 25;
    entityOptions.height = 25;
    super(world, entityOptions);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "#FF0000";
    ctx.beginPath();
    super.draw(ctx);
    ctx.stroke();
  }

  public handleCollisionWith(entity: Entity) {}
}
