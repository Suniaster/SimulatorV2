import P5EntitiesManager from "./P5EntitiesManager";
import P5Controller from "../P5Controller";
import p5 from "p5";


export default class P5World{
    public entities:P5EntitiesManager; 
    public p:p5
    constructor(public p5Controller: P5Controller){
        this.p = this.p5Controller.p
        this.entities = new P5EntitiesManager(this)
    }
}