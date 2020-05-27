import Entity from "./entities/Entity";
import { Collisions } from "detect-collisions";
import { EntityOptions } from "./helpers/types";
import World from "./WorldEngine";

export default class EntityManager {
  private entites: { [id: string]: Entity };
  public collisionSystem: Collisions;
  public count: number;
  public maxEntities;
  constructor(public world: World) {
    this.entites = {};
    this.count = 0;
    this.maxEntities = 500;
    this.collisionSystem = new Collisions();
  }

  public reset() {
    this.count = 0;
    this.entites = {};
    this.collisionSystem = new Collisions();
  }

  /********** Getters *********/
  public getEntity(id: string): Entity {
    return this.entites[id];
  }

  public getEntitiesInfo(): EntityOptions[] {
    return Object.values(this.entites).reduce((acc, entity) => {
      acc.push(entity.getInfo());
      return acc;
    }, []);
  }

  public getAllEntities(): Entity[] {
    return Object.values(this.entites);
  }

  public getEntitiesByType(type: string): Entity[] {
    return Object.values(this.entites).filter((e) => e.type === type);
  }

  /********** World Helper *********/
  /**
     * Move entities and return list of moved entities
     */
  public updateAllEntities(dt: number): void {
    for (let id in this.entites) {
      let entity = this.entites[id];
      entity.timeStep(dt);
    }
  }

  public performCollisions() {
    if (this.world.config.handleCollisions) {
      this.collisionSystem.update();

      for (let id of Object.keys(this.entites)) {
        let entity = this.entites[id];
        if (!entity) continue;

        let potential = entity.potentials() as Entity[];
        for (let anotherEntity of potential) {
          if (entity.collides(anotherEntity)) {
            this.world.events.emit("entities/collision", entity, anotherEntity);
            entity.handleCollisionWith(anotherEntity);
          }
        }
      }
    }
  }

  public register(newEntity: Entity): Entity {
    let id = newEntity.id;

    if (this.count >= this.maxEntities) {
      console.log("Max entity count");
      return undefined;
    }

    if (!this.entites[id]) {
      this.entites[id] = newEntity;
      this.world.entities.collisionSystem.insert(this.entites[id]);
      this.world.events.emit("objectCreated", newEntity.getInfo());
      this.count++;
      return newEntity;
    } else {
      console.log("Negated entity criation with duplicated id");
      return undefined;
    }
  }

  public remove(entity: Entity): Entity {
    let id = entity.id;
    let removed = this.entites[id];
    if (removed) {
      this.count--;
      this.world.events.emit("objectDestroyed", id);
      this.entites[id].remove();
      delete this.entites[id];
    }
    return removed;
  }

  public async createWithInfo(info: EntityOptions) {
    let entityConstructor = (await import("./entities/" + info.type)).default;
    let options: EntityOptions = info;
    let ent = new entityConstructor(this.world, options) as Entity;
    ent.create();
  }

  public updateOrCreateWithInfo(info: EntityOptions) {
    if (!this.updateWithInfo(info)) {
      this.createWithInfo(info);
    }
  }

  public updateWithInfo(info: EntityOptions) {
    if (this.entites[info.id]) {
      let ent = this.entites[info.id];
      ent.updateByInfo(info);
      return true;
    } else {
      return false;
    }
  }
}
