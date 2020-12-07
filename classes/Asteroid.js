export default class Asteroid {

	constructor(canvas, x, y, radius, level, collisionRadius){
		this.canvas = canvas;
		this.visible = true;
		this.radius = radius || 50;

		if(!x && !y){
			if(Math.random() < 0.5){
				this.x = Math.random() < 0.5 ? 0 - this.radius : canvas.width + this.radius
				this.y = Math.random() * canvas.height;
			} else {
				this.x = Math.random() * canvas.width;
				this.y = Math.random() < 0.5 ? 0 - this.radius : canvas.height + this.radius
			}
		} else{
			this.x = x;
			this.y = y;
		}
		
		this.speed = 3;
		this.angle = Math.floor(Math.random() * 359);
		this.strokeColor = 'black';
		this.collisionRadius = collisionRadius || 46;
		this.level = level || 1;
    }
    
	update(){
		var radians = this.angle / Math.PI * 180;
		// Aumentar a posição do X
		this.x += Math.cos(radians) * this.speed;
		this.y += Math.sin(radians) * this.speed;

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
    }
    
	draw(ctx){
		ctx.strokeStyle = this.strokeColor;
		ctx.beginPath();
		let vertAngle = ((Math.PI * 2) / 6);
		var radians = this.angle / Math.PI * 180

		for(let i = 0; i < 6; i++){
			ctx.lineTo(
				this.x - this.radius * Math.cos(vertAngle * i + radians), 
				this.y - this.radius * Math.sin(vertAngle * i + radians)
				
			)
		}
		ctx.closePath();
		ctx.stroke();
	}
}