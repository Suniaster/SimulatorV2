import P5EntitiesManager from "./P5EntitiesManager";
import P5Controller from "../P5Controller";
import p5 from "p5";
import P5Entity from "./P5Entity";


export default class P5World{
    public entities:P5EntitiesManager; 
    public p:p5
    public referenceEnitityId: string;

    constructor(public p5Controller: P5Controller){
        this.p = this.p5Controller.p
        this.entities = new P5EntitiesManager(this);
    }

    getTranslation(){
        let ent = this.entities.get(this.referenceEnitityId)
        if(ent){
            return {
                x: -ent.info.x -(ent.info.size.width/2) + (this.p.width/2),
                y: -ent.info.y -(ent.info.size.height/2) + this.p.height/2
            }
        }
        return {
            x: 0,
            y: 0
        }
    }

    getScale():number{
        let ent = this.entities.get(this.referenceEnitityId)
        if(ent){ 
            return 100/ent.info.size.width
        }
        return 1;
    }
}