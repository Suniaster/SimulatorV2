import p5 from 'p5'

export default class P5Controller{
    sketch(p: p5){ 
        p.preload = () => {
        }
      
        p.setup = function () {
          p.createCanvas(p.windowWidth, p.windowHeight)
        }
      
        p.windowResized = function() {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        }
      
        p.draw = function () {
          if (p.mouseIsPressed) {
            p.fill(0, 0, 0)
          } else {
            p.fill(255, 0, 0)
          }
          p.ellipse(p.mouseX, p.mouseY, 80, 80)
        }
    }

    init(){
        new p5(this.sketch)
    }
}