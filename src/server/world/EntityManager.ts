import Entity from "../entities/Entity";
import { Collisions } from "detect-collisions";
import { EntityInfo } from "../../shared/types";
import World from "./World";


export default class EntityManager{
    private entites: {[id: string]: Entity}
    private collisionSystem: Collisions
    public count: number
    public maxEntities;
    constructor(public world : World){
        this.entites = {}
        this.count = 0;
        this.maxEntities = 100;
        this.collisionSystem = new Collisions();
    }

    /********** *********/
    public register(newEntity: Entity):Entity{
        let id = newEntity.id

        if(this.count >= this.maxEntities){
            console.log("Max entity count")
            return undefined
        }

        if(!this.entites[id]){
            this.entites[id] = newEntity
            let a = this.collisionSystem.insert(this.entites[id])
            this.world.emitEvent("objectCreated", newEntity.getInfo())
            this.count++;
            return newEntity
        }
        else {
            console.log("Negated entity criation with duplicated id")
            return undefined;
        }
    }

    public remove(id:string):Entity{
        let removed = this.entites[id]
        if(removed){
            this.collisionSystem.remove(this.entites[id])
            this.count--;
            delete this.entites[id]
            this.world.emitEvent("objectDestroyed", id)
        }
        return removed
    }

    public reset(){
        this.count = 0;
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