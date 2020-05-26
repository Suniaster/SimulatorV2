import ClientEngine from "../../client/ClientEngine";
import Keyboard from "../../client/Keyboard";

export default class AgarioClient extends ClientEngine {
  playerDir: {
    x: number, y: number
  }

  start() {
    super.start();
    this.playerDir = {x:0,y:0}
    let keyboard = new Keyboard(this);
    keyboard.keyup = (key) =>{
      this.addDir(key);
    }

    keyboard.keydown = (key) =>{
      this.removeDir(key)
    }

  }

  removeDir(key:string){
    if     (key === 'w') this.playerDir.y = 0;
    else if(key === 'a') this.playerDir.x = 0;
    else if(key === 's') this.playerDir.y = 0;
    else if(key === 'd') this.playerDir.x = 0;
    else return;

    this.socket.emit("player/changeDir", this.playerDir)
  }

  addDir(key:string){
    if     (key === 'w') this.playerDir.y =-1;
    else if(key === 'a') this.playerDir.x =-1;
    else if(key === 's') this.playerDir.y = 1;
    else if(key === 'd') this.playerDir.x = 1;
    else return;

    this.socket.emit("player/changeDir", this.playerDir)
  }
}
