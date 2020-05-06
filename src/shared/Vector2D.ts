

export default class Vector2D{
    constructor(public x, public y){}

    static add(v1: Vector2D, v2: Vector2D){
        return new Vector2D(v1.x+v2.x, v1.y+v2.y)
    }

    static sub(v1: Vector2D, v2: Vector2D){
        return new Vector2D(v1.x-v2.x, v1.y-v2.y)
    }

    static random(mag = 1){
        let newVector = new Vector2D(mag, 0);
        newVector.rotate(Math.random()*Math.PI*2)
        return newVector;
    }

    static mult(vector: Vector2D, scalar){
        let newVector = new Vector2D(vector.x, vector.y);
        return newVector.mult(scalar);
    }

    public add(vector: Vector2D){
        this.x += vector.x;
        this.y += vector.y;        
        return this
    }

    public sub(vector: Vector2D){
        this.x -= vector.x;
        this.y -= vector.y;        
        return this
    }

    public mag(){
        return Math.sqrt(
            (this.x*this.x) + (this.y*this.y)
        )
    }

    public mult(scalar:number){
        this.setMag(this.mag()*scalar);
        return this;
    }

    public setMag(mag:number){
        let angle = this.heading();

        this.x = Math.cos(angle) * mag;
        this.y = Math.sin(angle) * mag;
        return this;
    }

    public heading(){
        let hip = this.mag()
        if(hip === 0 )return 0
        return Math.acos(
            this.x/hip
        )
    }

    public dist(vector: Vector2D){
        return Math.sqrt(
            ((vector.x - this.x)*(vector.x - this.x)) + ((vector.y - this.y)*(vector.y - this.y)) 
        )
    }

    public limit(max:number){
        if( this.mag() > max ){
            this.setMag(max);
        }
        return this;
    }

    public rotate(angle:number){
        if(angle === 0) return;
        let newAngle = (angle + this.heading()) % (2*Math.PI)
        let mag = this.mag();

        this.x = Math.cos(newAngle) * mag;
        this.y = Math.sin(newAngle) * mag; 
        return this;
    }

}