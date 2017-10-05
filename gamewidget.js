var gamemodel = Game();
var scale = 25;


//draws the model onto a canvas
function drawGrid() {

var can = document.getElementById("Grid");
var canM = can.getContext("2d");
canM.clearRect(0,0,scale*XDIM,scale*YDIM);
//console.log(lifemodel.model[0][0]);
for (var i=0; i < XDIM; i++){
	for (var j=0; j < YDIM; j++){
		if (gamemodel.model[i][j] === 1){
			canM.fillStyle = "#0000FF";
			canM.fillRect(scale*i,scale*j, scale, scale);
		}
		if (gamemodel.model[i][j] === 2){
			canM.fillStyle = "#00BEEF";
			canM.fillRect(scale*i,scale*j, scale/2 -3, scale);
			canM.fillRect(scale*i + (scale/2) +3, scale*j, scale/2 -3, scale);
			canM.fillStyle = "#000000"
			canM.fillRect(scale*i,scale*j, scale/2 -3, scale/3)
			canM.fillRect(scale*i + (scale/2) +3, scale*j, scale/2 -3, scale/3);

		}
		if (gamemodel.model[i][j] === 3){
			canM.fillStyle = "#FF4500";
			canM.fillRect(scale*i,scale*j, scale, scale);
		}

		if (gamemodel.model[i][j] === 4){
			canM.fillStyle = "#FFFF00";
			canM.fillRect(scale*i,scale*j, scale, scale);
		}

		if (gamemodel.model[i][j] === 100){
			canM.fillStyle = "#FF0000";
			canM.fillRect(scale*i,scale*j, scale, scale);
		}

	}
}

var scorecan = document.getElementById("score");
var scorectx = scorecan.getContext("2d");
scorectx.fillStyle = "#FFFFFF";
scorectx.fillRect(0,0,800,40);
scorectx.fillStyle = "#000000"
scorectx.font = "20px Arial";
scorectx.fillText("Score: " + gamemodel.score,10,20);
scorectx.fillText("Health: " + gamemodel.health, 700,20);

var scorecan = document.getElementById("message");
var scorectx = scorecan.getContext("2d");
scorectx.fillStyle = "#FFFFFF";
scorectx.fillRect(0,0,800,40);
scorectx.fillStyle = "#000000"
scorectx.font = "20px Arial";
scorectx.fillText(gamemodel.message,10,20);


}

drawGrid();



// newGame
function newgame() {
	gamemodel.resetZero();
	drawGrid();
}

// help
function about() {
	alert("A crappy fangame made by /u/Aureo_Speedwagon aka @carpforbrains. October 4, 2017. \n Updated Oct 5, 2017. Current Version 1.1.")
}


// up
function up() {
	gamemodel.moveUp();
	drawGrid();
	if (Math.random() > .90){
		addthing();
	}

}

// down
function down() {
	gamemodel.moveDown();
	drawGrid();
	if (Math.random() > .90){
		addthing();
	}
}

// left
function left() {
	gamemodel.moveLeft();
	drawGrid();
	if (Math.random() > .90){
		addthing();
	}
}

// right
function right() {
	gamemodel.moveRight();
	drawGrid();
	if (Math.random() > .90){
		addthing();
	}
}


// dooj
function dooj() {

	var curLoc = gamemodel.curLocation;
	var curx = curLoc[0];
	var cury = curLoc[1];

	var burncells = [];

	gamemodel.burnCell(curx, cury + 1)
	gamemodel.burnCell(curx, cury + 2)
	gamemodel.burnCell(curx, cury + 3)
	gamemodel.burnCell(curx+1, cury + 2)
	gamemodel.burnCell(curx-1, cury + 2)
	gamemodel.burnCell(curx+1, cury + 3)
	gamemodel.burnCell(curx-1, cury + 3)

	gamemodel.burnCell(curx, cury - 1)
	gamemodel.burnCell(curx, cury - 2)
	gamemodel.burnCell(curx, cury - 3)
	gamemodel.burnCell(curx+1, cury - 2)
	gamemodel.burnCell(curx-1, cury - 2)
	gamemodel.burnCell(curx+1, cury - 3)
	gamemodel.burnCell(curx-1, cury - 3)

	drawGrid();

	setTimeout(function(){

	gamemodel.killCell(curx, cury + 1)
	gamemodel.killCell(curx, cury + 2)
	gamemodel.killCell(curx, cury + 3)
	gamemodel.killCell(curx+1, cury + 2)
	gamemodel.killCell(curx-1, cury + 2)
	gamemodel.killCell(curx+1, cury + 3)
	gamemodel.killCell(curx-1, cury + 3)

	gamemodel.killCell(curx, cury - 1)
	gamemodel.killCell(curx, cury - 2)
	gamemodel.killCell(curx, cury - 3)
	gamemodel.killCell(curx+1, cury - 2)
	gamemodel.killCell(curx-1, cury - 2)
	gamemodel.killCell(curx+1, cury - 3)
	gamemodel.killCell(curx-1, cury - 3)

	drawGrid();
	if (Math.random() > .90){
		addthing();
	}


	}, 100);

}

// froosh
function froosh() {

	var curLoc = gamemodel.curLocation;
	var curx = curLoc[0];
	var cury = curLoc[1];

	var burncells = [];

	gamemodel.burnCell(curx+1, cury)
	gamemodel.burnCell(curx+2, cury)
	gamemodel.burnCell(curx+3, cury)
	gamemodel.burnCell(curx+2, cury + 1)
	gamemodel.burnCell(curx+2, cury - 1)
	gamemodel.burnCell(curx+3, cury + 1)
	gamemodel.burnCell(curx+3, cury - 1)

	gamemodel.burnCell(curx-1, cury)
	gamemodel.burnCell(curx-2, cury)
	gamemodel.burnCell(curx-3, cury)
	gamemodel.burnCell(curx-2, cury + 1)
	gamemodel.burnCell(curx-2, cury - 1)
	gamemodel.burnCell(curx-3, cury + 1)
	gamemodel.burnCell(curx-3, cury - 1)

	drawGrid();

	setTimeout(function(){

	gamemodel.killCell(curx+1, cury)
	gamemodel.killCell(curx+2, cury)
	gamemodel.killCell(curx+3, cury)
	gamemodel.killCell(curx+2, cury + 1)
	gamemodel.killCell(curx+2, cury - 1)
	gamemodel.killCell(curx+3, cury + 1)
	gamemodel.killCell(curx+3, cury - 1)

	gamemodel.killCell(curx-1, cury)
	gamemodel.killCell(curx-2, cury)
	gamemodel.killCell(curx-3, cury)
	gamemodel.killCell(curx-2, cury + 1)
	gamemodel.killCell(curx-2, cury - 1)
	gamemodel.killCell(curx-3, cury + 1)
	gamemodel.killCell(curx-3, cury - 1)

	drawGrid();
	if (Math.random() > .90){
		addthing();
	}


	}, 100);

}


function addthing(){
	var randx = Math.floor(Math.random()*XDIM);
	var randy = Math.floor(Math.random()*YDIM);
	var monvalue = Math.random();


	if (monvalue < .2){
		gamemodel.placeCheat(randx, randy);

	}else if(monvalue >.999){
		gamemodel.placeSECRET(randx,randy);
	}else{
		gamemodel.placeMonster(randx, randy);
	}



	drawGrid();




}


keydown = function(e){
 if(e.keyCode==37){
   document.getElementById("left").click()
}else if(e.keyCode==38){
   document.getElementById("up").click()
}else if(e.keyCode==39){
   document.getElementById("right").click()
}else if(e.keyCode==40){
   document.getElementById("down").click()
}else if(e.keyCode==68){
   document.getElementById("dooj").click()
}else if(e.keyCode==70){
   document.getElementById("froosh").click()
}else if(e.keyCode==82){
   document.getElementById("newgame").click()
}}
document.onkeydown = keydown
