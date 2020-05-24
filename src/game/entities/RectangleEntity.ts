import Entity from "./Entity";
import World from "../WorldEngine";
import { Point, EntityOptions, EntityInfo } from "../helpers/types";



export default abstract class RectangleEntity extends Entity{

    private originalSize: {width:number, height:number};
    size:  {width:number, height:number}
    constructor(world: World, entityOptions: EntityOptions){
        let size = entityOptions.size
        entityOptions.points = [ 
            [-size.width/2, -size.height/2],
            [ size.width/2, -size.height/2],
            [ size.width/2,  size.height/2],
            [-size.width/2,  size.height/2]
        ]
        super(world, entityOptions)

        this.size = entityOptions.size
        this.originalSize = this.size
    }

    public getInfo(): EntityInfo{
        let info = super.getInfo()
        return {
            ...info,
            size: this.size
        }
    }

    public changeSize(newSize: {width:number, height:number}){
        let new_scale_x = newSize.width/this.originalSize.width;
        let new_scale_y = newSize.height/this.originalSize.height;

        this.scale_x = new_scale_x;
        this.scale_y = new_scale_y;

        this.size = newSize;
        this.emitSelfUpdate();
    }

    protected scale({scale_x=1, scale_y=1}){
        this.scale_x *= scale_x
        this.scale_y *= scale_y

        this.size.width *= scale_x
        this.size.height *= scale_y
    }

}