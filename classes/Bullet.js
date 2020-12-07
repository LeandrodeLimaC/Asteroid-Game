import toRadians from '../utils.js'

export default class Bullet {

	constructor(ship, angle){
		this.collisionRadius = 3;
		this.visible= true;
		this.x = ship.noseX;
		this.y = ship.noseY;
		this.angle = angle;
		this.height = 4;
		this.width = 4;
		this.speed = 5;
		this.velX = 0;
		this.velY = 0;
    }
    
	update(){
		var radians = toRadians(this.angle);
		this.x -= Math.cos(radians) * this.speed;
		this.y -= Math.sin(radians) * this.speed;
    }
    
	draw(ctx){
		ctx.fillStyle = 'black';
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
}
