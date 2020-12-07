import toRadians from '../utils.js';

import Bullet from "./Bullet.js";

export default class Ship {

	constructor(canvas){
		this.canvas = canvas;
		this.visible = true;
		this.collision = true;
		this.x = this.canvas.width / 2;
		this.y = this.canvas.height / 2;
		this.movingForward = false;
		this.speed = 0.1;
		this.velX = 0;
		this.velY = 0;
		this.rotateSpeed = 0.001;
		this.radius = 15;
		this.angle = 0;
		this.strokeColor = 'black';
		this.noseX = this.canvas.width / 2 + 15;
		this.noseY = this.canvas.height / 2;
	}

	rotate(dir){
		this.angle += this.rotateSpeed * dir;
    }
    	
	draw(ctx){
		ctx.strokeStyle = this.strokeColor;
		ctx.beginPath();

		let vertAngle = ((Math.PI * 2) / 3);

		let radians = toRadians(this.angle);

		this.noseX = this.x - this.radius * Math.cos(radians);
		this.noseY = this.y - this.radius * Math.sin(radians);
		
		for(let i = 0; i < 3; i++){
			ctx.lineTo(
				this.x - this.radius * Math.cos(vertAngle * i + radians), 
				this.y - this.radius * Math.sin(vertAngle * i + radians)
				
			)
		}
		ctx.closePath();
		ctx.stroke();
	}

	update(keys){
		let radians = this.angle / Math.PI * 180;
		if(this.movingForward){
			this.velX += Math.cos(radians) * this.speed;
			this.velY += Math.sin(radians) * this.speed
		}

		if(this.x <  -(this.radius / 3)){
			this.x = this.canvas.width;
		}

		if(this.x > this.canvas.width + this.radius / 2){
			this.x = +this.radius / 2;
		}

		if(this.y < -(this.radius / 3) ){
			this.y = this.canvas.height
		}

		if(this.y > this.canvas.height + this.radius / 2){
			this.y = this.radius / 2
		}
		this.velX *= 0.99;
		this.velY *= 0.99;

		this.x -= this.velX;
		this.y -= this.velY;

		
		this.movingForward = keys["w"];
		if (keys["d"]) this.rotate(1);
		if (keys["a"]) this.rotate(-1);
	}

	fire(bullets) {
		return bullets.push(new Bullet(this, this.angle))
	}
	
	invencible(){
		this.collision = false;

		let blink_interval = setInterval(
		  () => (this.strokeColor = this.strokeColor == "black" ? "white" : "black"),
		  250
		);
	  
		setTimeout(() => {
		  clearInterval(blink_interval);
		  this.collision = true;
		}, 5000);
	}

	destroy(lives){
		this.x = this.canvas.width / 2;
		this.y = this.canvas.height / 2;
		this.velX = 0;
		this.velY = 0;
		
		if (lives == 0) return;
		this.invencible();
		
	}
}
