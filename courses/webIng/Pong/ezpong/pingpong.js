/**
 * @author Lisha
 * And J-P! :D
 */
// TODO
// Ball image shows beyond paddles, it's ugly. It should never be displayed
// beyond if it bounces.
// Add goals.
var dirx = 1;
var diry = 1;
var spdx = 10;
var spdy = setRand();
var imgLeftInt;
var imgTopInt;
var imgHeight;
var imgWidth;
var winWidth;
var winHeight;
var theBall;
// -------
/*
var leftGoalTop;
var leftGoalBottom;
var rightGoalTop;
var rightGoalBottom;
var rightGoalE = document.createElement("div");
rightGoalE.setAttribute("style","position:absolute;top:200px;left:780px;width:6px;height:100px;background-color:red;");
document.getElementById("court").appendChild(rightGoalE);
*/
// -------

var rightgoal;
var rightGoalTop;
var rightGoalBottom;
var leftgoal;
var leftGoalTop;
var leftGoalBottom; 

// timer control var
var t=0;
// paddle location vars
var rInt, lInt;

function startGame() {
 
 if(t==0){
 t = setInterval('animBall()', 80);
 }
}

function animBall() {
 theBall = document.images['ball1']; 
 rightgoal = document.getElementById("rightgoal");
 rightGoalTop = parseInt(rightgoal.style.top);
 rightGoalBottom = rightGoalTop + parseInt(rightgoal.style.height);
 leftgoal = document.getElementById("leftgoal");
 leftGoalTop = parseInt(leftgoal.style.top);
 leftGoalBottom = leftGoalTop + parseInt(leftgoal.style.height);

 imgLeftInt = parseInt(theBall.style.left);
 imgTopInt = parseInt(theBall.style.top);
 imgHeight =  parseInt(theBall.height);
 imgWidth =  parseInt(theBall.width);
 winWidth = 735;
 winHeight = 390;

 PadlLoc();
 padRight=parseInt(rpadl.style.left);
 padLeft=parseInt(lpadl.style.left)+parseInt(lpadl.style.width);

/*	New logic needed.
 *	1. check if ball is beyond paddles x-cords, if so,
 *		check if ball is inside paddle y-cords, if so,
 *		change dir and speed up. Break this.
 *	2. check if ball is beyond wall, if so,
 *		check if ball is inside nets y-cords, if so,
 *		score. Break this.
 *
 *	Stuff needed:
 *	ball.left, ball.right, ball.top, ball.bottom,
 *	rightPad.side, rightPad.top, rightPad.bottom,
 *	leftPad.side, leftPad.top, leftPad.bottom,
 *	court.left, court.right, court.top, court.bottom,
 *	goal.top, goal.bottom,
 *	
 *	
 */

if ((imgLeftInt+imgWidth)>= padRight){ // just the x-cord
   	rBottom = rInt+parseInt(rpadl.style.height);
 	rTop = rInt-imgHeight;
     	if ((imgTopInt < rBottom ) && (imgTopInt > rTop)){ // if ball hits pad...
 		rPadlHit();
	}  
} else if ((imgLeftInt)<= padLeft){
 lPadlHit();
 }
 
 if(dirx == 1){                               // if I should go right...
 goRight();
 } else {                                     // otherwise, I'd better go left!
 goLeft();
 }

 if(diry == 1) {                             // if I should go down...
 goDown();
 } else {                                    // otherwise, I'll go up!
 goUp();
    }

}

// Change dir if the ball is whithin the paddles y-coordinates.
// Here we can implement ball position-correction, so we don't get faulty scores.
// We know the ball should not be beyond the right/left paddle.
function rPadlHit(){
    dirx=0;
    theBall.style.left = padRight-imgWidth + "px";
    increaseSpeed();
}
function lPadlHit(){
    lBottom = lInt+parseInt(lpadl.style.height);
    lTop = lInt-imgHeight;
    if ((imgTopInt < lBottom ) && (imgTopInt > lTop)){ // if ball hits pad...
        dirx=1;
	theBall.style.left = padLeft + "px";
	increaseSpeed();
    }
}
// --------------------------------------------------------
function increaseSpeed() {
	spdx += Math.floor(Math.random()*8-2);
}
// --------------------------------------------------------
function PadlLoc() {
    rpadl = document.getElementById('rightpaddle');
    rInt = parseInt(rpadl.style.top);
    lpadl = document.getElementById('leftpaddle');
    lInt = parseInt(lpadl.style.top);
    return rpadl,rInt, lpadl, lInt;
}

// Scoring control.
// TODO CHECK!
function goRight() {
	
     if (imgLeftInt >  (winWidth-(imgWidth))){
     	if (imgTopInt < rightGoalBottom && (imgTopInt+imgHeight) > rightGoalTop) {
    		score('left');
	} else {
		goLeft();
	}
     } else {
     	theBall.style.left = imgLeftInt+spdx +"px";
     }
}
function goLeft() {
     if (imgLeftInt <  10){
     	if (imgTopInt < leftGoalBottom && (imgTopInt+imgHeight) > leftGoalTop) {
    		score('right');
	} else {
		goRight();
	}
     } else {
     	theBall.style.left = (imgLeftInt-spdx) +"px";
     }
}

function goDown() {
    theBall.style.top = imgTopInt+spdy+"px";
    if (imgTopInt >  (winHeight-(imgHeight+spdy))){
        diry = 0;
        spdy= setRand();
    }
}

function goUp() {
    theBall.style.top = (imgTopInt-spdy) +"px";
    if (imgTopInt < 5){
        diry = 1;
        spdy= setRand();
    }
}

function setRand() {
        randnum= Math.floor(Math.random()*6)+2;
        return randnum;
}

function rPadMove(dir) {
    if(dir==1 && rInt>5){
           rpadl.style.top = (rInt-12)+"px";       
    } else if (dir==0 && rInt < 320){
         rpadl.style.top = (rInt+12)+"px";
    }
}

 function lPadMove(dir) {
    if(dir==1 && lInt > 5){
        lpadl.style.top = (lInt-12)+"px";
    } else if(dir==0 && lInt < 320){
        lpadl.style.top = (lInt+12)+"px";
    }
 }

// variables to determine what a key press means
/*
var rup = '9';  // right paddle up
var rdn = '0';  // right paddle down
var lup = '1';  // left paddle up
var ldn = '2';  // left paddle down
function CaptureKey(e) {
   if (e.keyCode) {
        keycode=e.keyCode;
   }
     else {
         keycode=e.which;   
     }
   move=String.fromCharCode(keycode);
  
      if (move == "s") {
          startGame();       
      }
      if (move == rup) {
        rPadMove(1);
     }
      if (move == rdn) {
        rPadMove(0);
     }
      if (move == lup) {
          lPadMove(1);
     }
      if (move == ldn) {
        lPadMove(0);
     }
}
*/
//----------------------------------------------------
function CaptureKey(e) {
	if (e.keyCode) {
		keycode = e.keyCode;
	} else {
		keycode = e.which;
	}
	switch (String.fromCharCode(keycode)) {
	case 's':
		startGame();
		break;
	case '9':
		rPadMove(1);
		break;
	case '0':
		rPadMove(0);
		break;
	case '1':
		lPadMove(1);
		break;
	case '2':
		lPadMove(0);
		break;
	case '5':
		increaseSize();
		break;
	case '6':
		decreaseSize();
		break;
	}
}

function increaseSize() {
	rpadl.style.height = parseInt(rpadl.style.height) + 10 + "px";	
	lpadl.style.height = parseInt(lpadl.style.height) + 10 + "px";	
}
function decreaseSize() {
	rpadl.style.height = parseInt(rpadl.style.height) - 10 + "px";	
	lpadl.style.height = parseInt(lpadl.style.height) - 10 + "px";	
}
//----------------------------------------------------

function score(side) {
	clearInterval(t);
    msgBox = document.getElementById('messageBox');
    msgBox.style.visibility = "visible";

    scorePop = "<p>Point for the "+side+" side!<br /> ";
    scorePop += "To serve the ball again, press \"s\" after closing this pop-up.</p>";
    scorePop += "<a href=\"javascript:return false\" onClick=\prepNewGame('"+side+"');return false;\">X Close</a>";
     
     msgBox.innerHTML = scorePop;


}

function prepNewGame(side){
	t=0;
    msgBox.style.visibility='hidden';
    theBall.style.top = "10px";
    spdx = 10;
    rpadl.style.height = "70px";
    lpadl.style.height = "70px";
    rpadl.style.top = "5px";
    lpadl.style.top = "5px";

    if(side == "left"){
    	theBall.style.left = "25px";
    } else {
    	theBall.style.left = (winWidth-40) + "px";
    }
}
