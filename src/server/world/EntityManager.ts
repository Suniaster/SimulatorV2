import Entity from "../entities/Entity";
import { Collisions } from "detect-collisions";
import { EntityInfo } from "../../shared/types";
import World from "./World";


export default class EntityManager{
    private entites: {[id: string]: Entity}
    private collisionSystem: Collisions

    constructor(public world : World){
        this.entites = {}
        this.collisionSystem = new Collisions();
    }

    /********** *********/
    public register(newEntity: Entity):Entity{
        let id = newEntity.id
        this.entites[id] = newEntity
        this.collisionSystem.insert(this.entites[id])
        this.world.emitEvent("objectCreated", newEntity.getInfo())
        return newEntity
    }

    public remove(id:string):Entity{
        let removed = this.entites[id]
        this.collisionSystem.remove(this.entites[id])
        delete this.entites[id]
        this.world.emitEvent("objectDestroyed", id)
        return removed
    }

    public reset(){
        this.entites = {}
        this.collisionSystem = new Collisions();
    }

    /********** Getters *********/
    public getEntity(id:string):Entity{
        return this.entites[id]
    }

    public getEntitiesInfo():EntityInfo[]{
        return Object.values(this.entites).reduce((acc, entity)=>{
            acc.push(entity.getInfo())
            return acc
        }, []);
    }

    public getAllEntities():Entity[]{
        return Object.values(this.entites)
    }

    public getEntitiesByType(type:string):Entity[]{
        return Object.values(this.entites).filter(e => e.type === type)
    }

    /********** World Helper *********/
    /**
     * Move entities and return list of moved entities
     */
    public moveAllEntities():EntityInfo[]{
        return Object.values(this.entites).reduce((acc, entity)=>{
            if(entity.move()){
                acc.push(entity.getInfo());
            }
            return acc;
        }, [])
    }

    public performCollisions(){
        this.collisionSystem.update();
        Object.values(this.entites).forEach( entity =>{
            let potential = entity.potentials() as Entity[]
            for(let anotherEntity of potential){
                
                if(entity.collides(anotherEntity)){
                    entity.handleCollisionWith(anotherEntity)
                }

            }
        })
    }
}