import Entity from "./Entity";
import World from "../WorldEngine";
import { RectangleEntityOptions } from "../helpers/types";

export default abstract class RectangleEntity extends Entity {
  protected originalWidth: number;
  protected originalHeight: number;
  protected width: number;
  protected height: number;
  constructor(world: World, opt: RectangleEntityOptions) {
    opt.points = [
      [-opt.width / 2, -opt.height / 2],
      [opt.width / 2, -opt.height / 2],
      [opt.width / 2, opt.height / 2],
      [-opt.width / 2, opt.height / 2],
    ];
    super(world, opt);

    this.originalWidth = opt.width;
    this.originalHeight = opt.height;
  }

  public getInfo(): RectangleEntityOptions {
    let info = super.getInfo();
    return {
      ...info,
      width: this.width,
      height: this.height,
    };
  }

  public changeSize(newSize: { width: number; height: number }) {
    let new_scale_x = newSize.width / this.originalWidth;
    let new_scale_y = newSize.height / this.originalHeight;

    this.scale_x = new_scale_x;
    this.scale_y = new_scale_y;

    this.width = newSize.width;
    this.height = newSize.height;
    this.emitSelfUpdate({
      scale_x: this.scale_x,
      scale_y: this.scale_y,
      width: this.width,
      height: this.height,
    });
  }

  protected scale({ scale_x = 1, scale_y = 1 }) {
    this.scale_x *= scale_x;
    this.scale_y *= scale_y;

    this.width *= scale_x;
    this.height *= scale_y;
  }
}
