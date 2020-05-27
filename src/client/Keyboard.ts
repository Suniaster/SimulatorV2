import ClientEngine from "./ClientEngine";

export default class Keyboard {
  protected data: any;
  constructor(private client: ClientEngine) {
    let canvas = this.client.world.config.dom.canvas;
    console.log("object");

    document.addEventListener("keydown", (ev) => {
      let key = ev.key;
      this.keyup(key);
    });

    document.addEventListener("keyup", (ev) => {
      this.keydown(ev.key);
    });
  }

  keyup(key: string) {}
  keydown(key: string) {}
}
