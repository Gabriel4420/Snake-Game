let canvas = document.getElementById("snake");
/* Variavel de renderização do desenho do canvas */
let context = canvas.getContext("2d");

let box  = 32;

let snake = [];

let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

let direction = "right";

snake[0] = {
  x: 8 * box,
  y: 8 * box
}

function BG (){
  context.fillStyle = "lightgreen";
  context.fillRect(0,0, 16 * box, 16 * box);
}

function snakeObject() {
  for( i= 0; i< snake.length ; i++ ) {
    context.fillStyle = "green";
    
    context.fillRect(snake[i].x,snake[i].y, box, box);
  }
}

function drawFood(){
  context.fillStyle = "red"
  context.fillRect(food.x,food.y, box, box);
}

document.addEventListener('keydown', update);

function update(e) {
  if(e.keyCode == 37 && direction != "right") direction = "left";
  if(e.keyCode == 38 && direction != "down")direction = "up" ;
  if(e.keyCode == 39 && direction != "left")direction = "right" ;
  if(e.keyCode == 40 && direction != "up")direction = "down";      
}

function CustomAlert(){
  this.render = function(dialog){
      var winW = window.innerWidth;
      var winH = window.innerHeight;
      var dialogoverlay = document.getElementById('dialogoverlay');
      var dialogbox = document.getElementById('dialogbox');
      dialogoverlay.style.display = "block";
      dialogoverlay.style.height = winH+"px";
      dialogbox.style.left = (winW/2) - (550 * .5)+"px";
      dialogbox.style.top = "100px";
      dialogbox.style.display = "block";
      document.getElementById('dialogboxhead').innerHTML = "Fim de Jogo";
      document.getElementById('dialogboxbody').innerHTML = dialog;
      document.getElementById('dialogboxfoot').innerHTML = '<button class="btn-ok" onclick="Alert.ok()">X</button>';
  }
this.ok = function(){
  document.getElementById('dialogbox').style.display = "none";
  document.getElementById('dialogoverlay').style.display = "none";
  window.location.reload();
}
}
var Alert = new CustomAlert();



function initialGame(){
  
  if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
  if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;
  let count = 0 ;
  for(i = 1; i < snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
      clearInterval(game);
      if(posX == food.x || posy == food.y){
        count++;
      }
      Alert.render(`&#x1F622; você perdeu e fez ${count} pontos`);
    }
  }

  BG();
  snakeObject();
  drawFood();

  var posX = snake[0].x;
  var posy = snake[0].y;

  
    
  if( direction == "up")   posy -= box ;
  if( direction == "down") posy += box ;
  if( direction == "right")posX += box;
  if( direction == "left") posX -= box;
  
  if(posX != food.x || posy != food.y){
    snake.pop();
  } 
  else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
    
  }

  

  let newHead = {
    
    x: posX,
    y: posy
  }

  snake.unshift(newHead);

 

}

let game = setInterval(initialGame,100);
