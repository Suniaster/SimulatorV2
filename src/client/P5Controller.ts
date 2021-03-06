import p5 from 'p5'
import ImageController from './utils/ImageController'
import InputHandler from './utils/InputHandler';
import P5World from './world/P5World';

export default class P5Controller{
  world: P5World;
  p: p5;
  imageController: ImageController;
  dt: number;

  constructor(private inputHandler: InputHandler){this.dt=1/60}

  sketch = (p: p5) => { 
    // Helpers
    p.disableFriendlyErrors = true
    this.imageController = new ImageController(p);
    this.p = p
    this.world = new P5World(this)

    // P5 Functions
    p.preload = () => {
      this.imageController.registerImage('boss', 'boss_2.png')
    }
  
    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight)
    }
  
    p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
  
    p.draw = () => {
      p.background(255);

      let fps = p.frameRate();
      p.fill(255);
      p.stroke(0);
      p.text("FPS: " + fps.toFixed(2), 10, p.height - 10);
      if(fps!==0) this.dt = 1/fps

      this.world.entities.drawAll();
    }

    p.keyPressed = () =>{
      this.inputHandler.handle('keydown', p.key)
    }

    p.keyReleased = () =>{
      this.inputHandler.handle('keyup', p.key)
    }
  }

  init(){
    new p5(this.sketch)
    return this
  }
}