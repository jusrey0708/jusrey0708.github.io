//does f i times.
times = function (i, f) {
	if (i === 0) return;
	f(); times (i-1, f)
	}

var XDIM = 32;
var YDIM = 16;

//Initializes with XDIM x YDIM blank grid


Game = function() {
    var that = Object.create(Game.prototype);
    
    that.score = 0;
    that.health = 10;

    var cl = [];
    cl.push(XDIM/2);
    cl.push(YDIM/2);

    that.curLocation = cl


    var rows = []
	 times(XDIM, function() {
  		var col = [];
  		rows.push(col);
  		times(YDIM, function() {
    		col.push(0);
  		})
	})

  rows[XDIM/2][YDIM/2] = 2; 

	that.model = rows;

  that.message = "Weclome to the game.";
  
 

    return that;
}

//colors 0 = dead, 1 = monster, 2 = player, 3 = fire, 4 = cheat



Game.prototype = {

    killCell : function(x,y) { 
    	this.model[x][y] = 0;
      },

    burnCell : function(x,y) { 
      oldtype = this.model[x][y];
      this.model[x][y] = 3;
      if (oldtype === 1){
        this.message = "You Froosh'd and/or Dooj'd the enemy monster. Plus 1 point."
        this.changeScore(1);
      } else if (oldtype === 4){
        this.message = "Oh no, you Froosh'd and/or Dooj'd a The Cheat. Minus 15 points";
        this.changeScore(-15);
      } else if (oldtype === 3){
        this.message = "Fighting fire with fire, eh? No point, so no points.";
      } else if (oldtype === 2){
        alert("You've lit yourself on fire somehow. GAME OVER, I guess?");
        location.reload();
      } else if (oldtype === 100){
        alert("You found the secret SECRET COLLECT easter egg! Now, it's a secret SECRET COLLECT omelette. Nice going, brain for brains.");
      } 




      },

    placeMonster : function(x,y) { 
      this.model[x][y] = 1;
      },

    placeCheat : function(x,y) {
      this.model[x][y] = 4;
    },

    placeSECRET(x,y){
      this.model[x][y] = 100;
    },

    changeScore : function(amt){
      this.score = this.score + amt;
      if (this.score >= 99999999999999999){
        alert("FLAGRANT SYSTEM ERROR \n \n ...I guess that means you win?");
      }
      if (this.score <= -999999999999999){
        alert("FLAGRANT SYSTEM ERROR \n \n ...I guess that means you lose?");
      }  

      if (this.score === 423827){
        alert("WAAGH! That is not a small number! That is a BIG number!");
      } 
    },

    injure : function(amt){
      this.health = this.health - amt;
      if (this.health <= 0){
        alert("You died. GAME OVER");
        location.reload();
      }
    },
    
    resetZero : function() {
    	this.model = Game().model;
      this.curLocation = Game().curLocation;
      this.score = Game().score;
      },

    moveUp : function(){

      var curX = this.curLocation[0];
      var curY = this.curLocation[1];
      var newY = (curY+YDIM -1)%YDIM;
      var oldtype = this.model[curX][newY];
      if (oldtype === 1){
        this.message ="Ran into a monster. -1 HP.";
        this.injure(1);
      } else if (oldtype === 4){
        this.message ="You kick The Cheat. Plus 10 points.";
        this.changeScore(10);
      }else if (oldtype === 3){
        this.message ="Put out fire with your face. Minus 3 health.";
        this.injure(3);
      }else if (oldtype === 2){
        this.message ="Somehow stepped on owndangself. Plus 1,000,000,000 points! (but -1 health)";
        this.changeScore(1000000);
        this.injure(1);
      }else if (oldtype === 100){
        alert("Found the secret SECRET COLLECT easter egg!") 

      }


      this.model[curX][curY] = 0;
      this.curLocation[1] = newY;
      this.model[curX][newY] = 2;
    },

    moveDown : function(){
      var curX = this.curLocation[0];
      var curY = this.curLocation[1];
      var newY = (curY+YDIM +1)%YDIM;
      var oldtype = this.model[curX][newY];
      if (oldtype === 1){
        this.message ="Ran into a monster. -1 HP.";
        this.injure(1);
      } else if (oldtype === 4){
        this.message ="You kick The Cheat. Plus 10 points.";
        this.changeScore(10);
      }else if (oldtype === 3){
        this.message ="Put out fire with your face. Minus 3 health.";
        this.injure(3);
      }else if (oldtype === 2){
        this.message ="Somehow stepped on owndangself. Plus 1,000,000,000 points! (but -1 health)";
        this.changeScore(1000000);
        this.health =  this.health -1;
      }else if (oldtype === 100){
        alert("Found the secret SECRET COLLECT easter egg!") 

      }


      this.model[curX][curY] = 0 ;
      this.curLocation[1] = newY;
      this.model[curX][newY] = 2;
    },

    moveLeft : function(){
      var curX = this.curLocation[0];
      var curY = this.curLocation[1];
      var newX = (curX+XDIM -1)%XDIM;
      var oldtype = this.model[newX][curY];
      if (oldtype === 1){
        this.message ="Ran into a monster. -1 HP.";
        this.injure(1);
      } else if (oldtype === 4){
        this.message ="You kick The Cheat. Plus 10 points.";
        this.changeScore(10);
      }else if (oldtype === 3){
        this.message ="Put out fire with your face. Minus 3 health.";
        this.injure(3);
      }else if (oldtype === 2){
        this.message ="Somehow stepped on owndangself. Plus 1,000,000,000 points! (but -1 health)";
        this.changeScore(1000000);
        this.injure(1);
      }else if (oldtype === 100){
        alert("Found the secret SECRET COLLECT easter egg! Find 12 and something good might happen.") 

      }


      this.model[curX][curY] = 0 ;
      this.curLocation[0] = newX;
      this.model[newX][curY] = 2;
    },

    moveRight : function(){
      var curX = this.curLocation[0];
      var curY = this.curLocation[1];
      var newX = (curX+XDIM +1)%XDIM;
      var oldtype = this.model[newX][curY];
      if (oldtype === 1){
        this.message ="Ran into a monster. -1 HP.";
        this.injure(1);
      } else if (oldtype === 4){
        this.message ="You kick The Cheat. Plus 10 points.";
        this.changeScore(10);
      }else if (oldtype === 3){
        this.message ="Put out fire with your face. Minus 3 health.";
        this.injure(3);
      }else if (oldtype === 2){
        this.message ="Somehow stepped on owndangself. Plus 1,000,000,000 points! (but -1 health)";
        this.changeScore(1000000);
        this.injure(1);
      }else if (oldtype === 100){
        alert("Found the secret SECRET COLLECT easter egg!") 

      }


      this.model[curX][curY] = 0 ;
      this.curLocation[0] = newX;
      this.model[newX][curY] = 2;
    },
    




}