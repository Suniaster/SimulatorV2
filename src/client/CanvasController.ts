// !!!!!!!!!!!!!!!!!!! Not being used !!!!!!!!!!!!!!!!!!!!!!!!!!!!

export default class CanvasController {
    canvas:HTMLCanvasElement
    ctx:CanvasRenderingContext2D ;
    
    dimensions: {
        width: number, 
        height: number
    }

    constructor(){
        // Get the canvas graphics context
        this.canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        
        // set default dimensions
        this.dimensions = {
            width:  window.innerWidth,
            height:  window.innerHeight
        }
        this.setDimensions(this.dimensions)


        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(800, 800);
        this.ctx.stroke(); 
    }


    setDimensions(arg:{ width?:number, height?:number }){
        if(arg.width)
            this.canvas.width = arg.width
        if(arg.height)
            this.canvas.height = arg.height
        return this
    }

}