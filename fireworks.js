var fireworks = [];
var gravity;


function setup (){
	createCanvas(400, 400);
	gravity = createVector(0, 0.2);
	stroke(255);
	strokeWeight(4);
}

function draw(){
	background(51);

	if(random(1) < 0.1){
		fireworks.push(new Firework());
	}

	for(var i = 0; i < fireworks.length; i++){
		
			fireworks[i].show();	
			fireworks[i].update();

	}
}

function Particle(x, y){
	this.pos = createVector(x, y);
	this.vel = createVector(0, random(-10, -7.5));
	this.acc = createVector(0, 0);
	this.color1 = random(0, 255); 
	this.color2 = random(0, 255);
	this.color3 = random(0, 255);

	this.applyForce = function(force){
		this.acc.add(force);
	}

	this.update = function(){
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);



	}

	this.show = function(){
		stroke(this.color1, this.color2, this.color3, 100);
		point(this.pos.x, this.pos.y);
		stroke(255);
	}
}

function Firework(){
	this.firework = new Particle(random(width), height);
	this.exploded = false;
	this.particles = [];

	this.update = function(){
		if(!this.exploded){
			this.firework.applyForce(gravity);
			this.firework.update();

			if(this.firework.vel.y >= 0){
				this.exploded = true;
				this.explode();
			}
		}
		if(this.exploded){
			for(var i = 0; i < this.particles.length; i++){
				this.particles[i].applyForce(gravity);
				this.particles[i].update();
			}	
		}
	}

	this.show = function(){
		if(!this.exploded){
			this.firework.show();
		}

		if(this.exploded){
			for(var i = 0; i < this.particles.length; i++){
				this.particles[i].show();

			}
		}
	}

	this.explode = function(){

		for(var i = 0; i < 50; i++){
			var p = new Particle(this.firework.pos.x, this.firework.pos.y);
			this.particles.push(p);
		}
		for(var i = 0 ; i < 50; i++){
			var n = random(-5, 5);
			var m = random(-20, 30);
			gravity.y = 0.5;
			this.particles[i].pos = createVector(random(this.firework.pos.x, this.firework.pos.x + n), random(this.firework.pos.y, this.firework.pos.y + m));
		}

	}
}