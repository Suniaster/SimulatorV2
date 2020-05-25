import ClientEngine from "./ClientEngine";
import World from "../game/WorldEngine";
import Glob from "../game/entities/Glob";

export default class AgarioClient extends ClientEngine {
  setup() {
    for (let i = 0; i < 5; i += 1) {
      let pos = World.generateRandomCoord();
      let g = new Glob(this.world, { position: { x: pos.x, y: pos.y } });
      g.changeVel({ x: 10, y: 10 });
      g.create();
    }
  }
}
