import Entity from "../entities/Entity";
import { Collisions } from "detect-collisions";
import { EntityInfo } from "../../shared/types";
import World from "./World";


export default class EntityManager{
    private entites: {[id: string]: Entity}
    public collisionSystem: Collisions
    public count: number
    public maxEntities;
    constructor(public world : World){
        this.entites = {}
        this.count = 0;
        this.maxEntities = 100;
        this.collisionSystem = new Collisions();
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
    public updateAllEntities():EntityInfo[]{
        return Object.values(this.entites).reduce((acc, entity)=>{
            if(entity.update()){
                acc.push(entity.getInfo());
            }
            return acc;
        }, [])
    }

    public performCollisions(){
        this.collisionSystem.update();
        Object.keys(this.entites).forEach( key =>{
            let entity = this.entites[key]
            if(!entity) return;

            let potential = entity.potentials() as Entity[]
            for(let anotherEntity of potential){
                
                if(entity.collides(anotherEntity)){
                    entity.handleCollisionWith(anotherEntity)
                }

            }
        })
    }

    /*** pseudo public ***/

    /**
     * 
     *  This function does not insert enitity on collision system
     *  entity.getAlive() should be used instead
     */
    public register(newEntity: Entity):Entity{
        let id = newEntity.id

        if(this.count >= this.maxEntities){
            console.log("Max entity count")
            return undefined
        }

        if(!this.entites[id]){
            this.entites[id] = newEntity
            if(this.entites[id].emitWorldEvents)
                this.world.emitEvent("objectCreated", newEntity.getInfo())
            this.count++;
            return newEntity
        }
        else {
            console.log("Negated entity criation with duplicated id")
            return undefined;
        }
    }

    /**
     * 
     *  This function does remove enitity on collision system
     *  entity.kill() should be used instead
     */
    public remove(entity:Entity):Entity{
        let id = entity.id
        let removed = this.entites[id]
        if(removed){
            this.count--;
            delete this.entites[id]
            if(this.entites[id].emitWorldEvents)
                this.world.emitEvent("objectDestroyed", id)
        }
        return removed
    }

}