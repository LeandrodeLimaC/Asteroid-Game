let canvas;
let ctx;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
var stop = true;
var frameCount = 0;
var fpsInterval, startTime, now, then, elapsed;
const FPS = 60;

let ship;
let keys = [];
let bullets = [];
let asteroids = [];

let score = 0;
const MAX_LIVES = 3;
let lives = MAX_LIVES;

import Ship from "./classes/Ship.js";
import Asteroid from "./classes/Asteroid.js";

init();

window.addEventListener("resize", () => {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  restart();
});

function drawLifeShips() {
  if (lives <= 0) return;
  ctx.fillStyle = "black";

  let startX = canvasWidth - 50;
  let startY = 10;
  let points = [
    [9, 15],
    [-9, 15],
  ];

  for (let i = 0; i < lives; i++) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);

    points.forEach((point) => {
      ctx.lineTo(startX + point[0], startY + point[1]);
    });

    ctx.closePath();
    ctx.fill();
    startX -= 30;
  }
}

function init() {
  fpsInterval = 1000 / FPS;
  then = Date.now();
  startTime = then;
  console.log(startTime);

  canvas = document.getElementById("asteroids-game");
  ctx = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ship = new Ship(canvas);

  for (let i = 0; i < (canvasWidth + canvasHeight) / 200; i++) {
    asteroids.push(new Asteroid(canvas));
  }

  document.body.addEventListener("keydown", (e) => (keys[e.key] = true));
  document.body.addEventListener("keyup", (e) => {
    keys[e.key] = false;
    if (e.key == " " && lives > 0 && ship.collision)
      return ship.fire(bullets);
    if (e.key == "Enter" && lives <= 0) return restart();
  });

  render();
}

function restart() {
  ship = new Ship(canvas);
  keys = [];
  bullets = [];
  asteroids = [];
  for (let i = 0; i < (canvasWidth + canvasHeight) / 200; i++) {
    asteroids.push(new Asteroid(canvas));
  }
  score = 0;
  lives = MAX_LIVES;
}

function gameOver() {
  ship.visible = false;
  ship.collision = false;
  ctx.fillStyle = "black";
  ctx.font = "50px Arial";
  ctx.fillText("GAME OVER", canvasWidth / 2 - 150, canvasHeight / 2);
  ctx.font = "24px Arial";
  ctx.fillText(
    "Press ENTER to restart",
    canvasWidth / 2 - 122,
    canvasHeight / 2 + 36
  );
}

// function shipDestroy() {
//   ship.x = canvasWidth / 2;
//   ship.y = canvasHeight / 2;
//   ship.velX = 0;
//   ship.velY = 0;
//   lives -= 1;

// }


function drawHUD(){
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "black";
    ctx.font = "21px Arial";
    ctx.fillText("Score: " + score.toString(), 20, 35);

}

function render() {
  if (stop) requestAnimationFrame(render);
  
  

  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    drawHUD();
    drawLifeShips();

    if (lives <= 0) gameOver();

    if (asteroids.length !== 0) {
      asteroids.forEach((asteroid, index_asteroid) => {
        asteroid.update();
        asteroid.draw(ctx);

        if (bullets.length !== 0) {
          bullets.forEach((bullet, index) => {
            const dist = Math.hypot(
              bullet.x - asteroid.x,
              bullet.y - asteroid.y
            );

            if (dist - asteroid.collisionRadius - bullet.collisionRadius < 1) {
              if (asteroid.level == 1) {
                for (let i = 0; i < 2; i++) {
                  asteroids.push(
                    new Asteroid(
                      canvas,
                      asteroid.x - 5,
                      asteroid.y - 5,
                      25,
                      2,
                      22
                    )
                  );
                }
              } else if (asteroid.level == 2) {
                for (let i = 0; i < 2; i++) {
                  asteroids.push(
                    new Asteroid(
                      canvas,
                      asteroid.x - 5,
                      asteroid.y - 5,
                      15,
                      3,
                      22
                    )
                  );
                }
              }

              asteroids.splice(index_asteroid, 1);
              bullets.splice(index, 1);
              score += 20;
            }
          });
        }

        if (!ship.collision) return;

        const dist = Math.hypot(ship.x - asteroid.x, ship.y - asteroid.y);

        if (dist == 0 || dist - asteroid.collisionRadius - 11 < 1) {
		  ship.destroy(lives)
		
		  lives -= 1;
        }
      });
    }

    bullets.forEach((bullet, index) => {
      bullet.update();
      bullet.draw(ctx);
      if (
        bullet.x + bullet.width < 0 ||
        bullet.x + bullet.width > canvasWidth ||
        bullet.y + bullet.width < 0 ||
        bullet.y + bullet.width > canvasHeight
      ) {
        setTimeout(() => {
          bullets.splice(index, 1);
        }, 0);
      }
    });

    if (ship.visible) {	
		ship.update(keys)
		ship.draw(ctx)
    }

    var sinceStart = now - startTime;
    var currentFps =
      Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
    console.log(currentFps);
  }
}
