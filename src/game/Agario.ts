import World from "./WorldEngine";
import Blob from "./entities/Blob";
import Glob from "./entities/Glob";
import { WorldConfig } from "./helpers/types";

export default class Agario extends World {
  constructor(worldOptions?: WorldConfig) {
    super(worldOptions);
  }

  public createBlob(id?: string) {
    let spawnPoint = World.generateRandomCoord();
    let blob = new Blob(this, {
      position: {
        x: spawnPoint.x,
        y: spawnPoint.y,
      },
      id,
    });
    blob.create();
    return blob;
  }
}
