import Entity from "./Entity";
import RectangleEntity from "./RectangleEntity";

export default class ActionField extends RectangleEntity {
  constructor(opts, private owner: Entity) {
    super(owner.world, {
      x: owner.x,
      y: owner.y,
      ...opts,
    });
  }

  public beforeTimeStep() {
    this.x = this.owner.x;
    this.y = this.owner.y;
  }

  public handleCollisionWith(entity: Entity) {}
}
