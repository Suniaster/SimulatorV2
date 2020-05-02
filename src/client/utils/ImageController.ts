import p5 from "p5";

export default class ImageController{
    images: {[id:string]: p5.Image}

    constructor(private p:p5){
        this.images = {}
    }

    getImage(id) {
        return this.images[id];
    }

    registerImage(id, image_name) {
        this.images[id] = this.p.loadImage('static/images/' + image_name);
        return this.images[id];
    }

    unregisterImage(id) {
        delete this.images[id];
    }

}