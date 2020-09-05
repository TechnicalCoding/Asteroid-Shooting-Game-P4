var ship;
var bullets = [];
var sound;
var asteroids = [];
var gamestate = "starting";
var bg, bg2;
var score = 0;
var mission = "Not on mission";
var random1;
var health = 200;
function preload() {
  bg = loadImage("Bg.png");
  bg2 = loadImage("Bg2.png");
}
function setup() 
{
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  sound = loadSound('gun-gunshot-02.mp3');
  for(var i = 0; i < 8; i++)
  {
    asteroids.push(new Asteroid());
  }
}

function draw() 
{
  if(gamestate === "starting")
  {
    background(bg);
    if(keyCode === 13)
    {
      gamestate = "playing";
    }
  }
  if(gamestate === "playing")
  {
  background(0);
  fill(255, 255, 255);
  rect(10,10,270,120);
  textSize(20);
  fill(0,0,0);
  text("Score:- "+score, 20,30);
  textSize(20);
  fill(0,0,0);
  text("Mission:- "+mission, 20,90);
  textSize(20);
  fill(0,0,0);
  text("Health:- "+health,20,60);
  if(random1 === 0)
  {
    mission = "Mission Completed";
  }
  if(health === 0)
  {
    gamestate = "end";
  }
  for(var i = 0; i < asteroids.length; i++)
  {
    if(ship.hits(asteroids[i]))
    {
      health -= 1;
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }
  for(var i = bullets.length - 1; i >= 0;i--)
  {
    bullets[i].render();
    bullets[i].update();
    if(bullets[i].offscreen())
    {
      bullets.splice(i,1);
    }
    else
    {
      for(var j = asteroids.length-1; j>= 0; j--)
      {
        if(bullets[i].hits(asteroids[j]))
        {
          score = score+1;
          random1 = random1-1;
          if(asteroids[j].r > 10)
          {
            var newAsteroids = asteroids[j].displaced();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          bullets.splice(i, 1);
          break;
        }
      }
    }
  }
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  }
  if(gamestate === "end")
  {
    background(bg2);
    if(keyCode === 82)
    {
      gamestate = "playing";
      health = 200;
      score = 0;
      mission = "Not on mission";
    }
  }
}
function keyReleased() 
{
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() 
{
  if(keyCode === 32)
  {
    bullets.push(new Bullet(ship.pos,ship.heading));
    sound.play();
  }
  if (keyCode == RIGHT_ARROW) 
  {
    ship.setRotation(0.1);
  } 
  else if (keyCode == LEFT_ARROW) 
  {
    ship.setRotation(-0.1);
  } 
  else if (keyCode == UP_ARROW) 
  {
    ship.boosting(true);
  }
  else if(keyCode === 77)
  {
    random1 = Math.round(random(1,3));
    mission = "Destroy "+random1+" asteroids";
  }
}
