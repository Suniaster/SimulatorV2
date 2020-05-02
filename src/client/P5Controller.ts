import p5 from 'p5'
import ImageController from './utils/ImageController'
import InputHandler from './utils/InputHandler';

export default class P5Controller{
  sketch(p: p5){ 
    // Helpers
    let imageController = new ImageController(p);
    let inputController = new InputHandler(p, imageController)

    // P5 Functions
    p.preload = () => {
      imageController.registerImage('boss', 'boss_2.png')
    }
  
    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight)
    }
  
    p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
  
    p.draw = () => {
      p.background(255);
      inputController.boss.draw()
      // p.image(imageController.getImage('1'), p.mouseX, p.mouseY)
    }

    p.keyPressed = () =>{
      inputController.handle(p.key)
    }
  }

  init(){
    new p5(this.sketch)
  }
}