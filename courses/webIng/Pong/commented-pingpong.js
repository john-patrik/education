/**
 * @author Lisha
 */
/** @comments J-P
 */

// ECMAScript calculates x and y coordinates as if origo (0) was at the upper
// left corner of the document.

var dirx = 1;
// diry sets the vertical direction of the ball.
var diry = 1;
// spdx and spdy are speed variables controlling how fast the ball
// will travel horizontally and vertically respectively.
var spdx = 10;
var spdy = setRand();

var imgLeftInt;
var imgTopInt;
var imgHeight;
var imgWidth;
var winWidth;
var winHeight;
var theBall;

// timer control var
var t=0;
// paddle location vars
var rInt, lInt;

function startGame() {
// setInterval calls and loops animBall() every 80 millisecs.
// if t != 0, it means that theres an ongoing game, so a new
// game will not be started.
 if(t==0){
 t = setInterval('animBall()', 80);
 }
}

// If this function gets called every 80 milliseconds, why does it
// include so many initiations which only should exist once?
function animBall() {
 theBall = document.images['ball1']; 
 // find out the size of the ball.
 imgLeftInt = parseInt(theBall.style.left);
 imgTopInt = parseInt(theBall.style.top);
 imgHeight =  parseInt(theBall.height);
 imgWidth =  parseInt(theBall.width);
 // This variable sets the x coordinate the left edge of the ball must have for
 // the left player to win, that is, imgLeft > winWidth.
 // The right player wins if the left edge of the ball is lower than 10, 
 // that is, imgLeftInt < 10.
 // So in essence, the left edge of the ball image, imgLeftInt, is between 10
 // and winWidth, else the game stops and some player scores.
 // But the million dollar question is why these variables are set every
 // time animBall is called.
 winWidth = 735;
 // This variable should really be called courtHeight or something similar,
 // since it has nothing to do with winning or scoring.
 winHeight = 390;

 // Initiate the paddles.
 PadlLoc();
 // Initiate and determine the innermost edges of the paddles,
 // that is, the horizontal coordinates that the ball will bounce
 // against.
 padRight=parseInt(rpadl.style.left);
 padLeft=parseInt(lpadl.style.left)+parseInt(lpadl.style.width);
 // If the right edge of the ball (imgLeftInt+imgWidth) is touching
 // the right paddle, call the rPadlHit function.
 if ((imgLeftInt+imgWidth)== padRight){
 rPadlHit();
 // Or if the left edge of the ball touches the left paddle,
 // call the lPadlHit function.
 } else     if ((imgLeftInt)== padLeft){
 lPadlHit();
 }
 // Then determine which way the ball should go and call the
 // appropriate functions.
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
// These functions gets called whenever the ball hits a paddle.
// The ball has hit the right paddle.
function rPadlHit(){
	// rInt is the y coordinate for the top edge of the right
	// paddle.
	// rBottom is set to the y coordinate for the bottom edge
	// of the right paddle.
     rBottom = rInt+parseInt(rpadl.style.height);
	// rTop is set to the y coordinate for the top edge of the
	// right paddle minus the ball height.
	// imgHeight represents the height of the ball image.
	// rTop is calculated weirdly because we do not have the
	// vertical coordinate for the balls lower edge.
     rTop = rInt-imgHeight;
     	// If the top of the ball is less than (over) the lower edge
	// of the right paddle. AND
	// IF the top of the ball (plus its height so that we get
	// the bottom) is more than (below) the top edge of the 
	// right paddle.
     if ((imgTopInt < rBottom ) && (imgTopInt > rTop)){
     	// Set the direction of the ball to left.
    dirx=0;
     }   
}
// The ball has hit the left paddle.
// Same explanation as the function above, just switch the logic.
function lPadlHit(){
    lBottom = lInt+parseInt(lpadl.style.height);
    lTop = lInt-imgHeight;
    if ((imgTopInt < lBottom ) && (imgTopInt > lTop)){
        dirx=1;
    }
}
// This function initiates and returns the html elements
// representing the right and left paddles, as well as int variables
// representing their respective y coordinates as seen from the top.
function PadlLoc() {
    rpadl = document.getElementById('rightpaddle');
    rInt = parseInt(rpadl.style.top);
    lpadl = document.getElementById('leftpaddle');
    lInt = parseInt(lpadl.style.top);
    return rpadl,rInt, lpadl, lInt;
}
// These two functions controls the horizontal movement of the ball, as well as
// determines if someone has scored or not, and if so, which player.
// The movement speed is controlled by the variable spdx, and is fixed.
// If someone scored the function calls another function called score.
function goRight() {
     theBall.style.left = imgLeftInt+spdx +"px";
     if (imgLeftInt >  (winWidth-(imgWidth))){
    score('left');
     }
}
function goLeft() {
     theBall.style.left = (imgLeftInt-spdx) +"px";
     if (imgLeftInt <  10){
    score('right');
     }
}
// These two functions controls the vertical movement of the ball.
// The movement speed is controlled by the spdy variable, which is 
// randomized between 2 and 7 as per the setRand function.
function goDown() {
    theBall.style.top = imgTopInt+spdy+"px";
    // If the bottom of the ball (imgTopInt+imgHeight) is going to go (+spdy) 
    // beyond the bottom of the court (winHeight) by the next call to goDown, 
    // change the vertical direction 
    // of the ball movement and set a new random speed.
    if (imgTopInt >  (winHeight-(imgHeight+spdy))){
        diry = 0;
        spdy= setRand();
    }
}

function goUp() {
    theBall.style.top = (imgTopInt-spdy) +"px";
    // If the top of the ball is too near the top of the court (5)
    // change the vertical direction of the ball movement and 
    // set a new random speed.
    if (imgTopInt < 5){
        diry = 1;
        spdy= setRand();
    }
}
// Return a random number in the interval 2 to 7.
function setRand() {
        randnum= Math.floor(Math.random()*6)+2;
        return randnum;
}
// These two functions controls the right and left paddle movements.
function rPadMove(dir) {
	// If the direction to move is up and if it is possible to move
	// up without going beyond the court boundaries.
    if(dir==1 && rInt>5){
    	// Move the right paddle up 12 pixels.
           rpadl.style.top = (rInt-12)+"px";
	// Or if the direction to move is down and if it is possible
	// to do so without going beyond the court boundaries.
    } else if (dir==0 && rInt < 320){
    	// Move the left paddle down 12 pixels.
         rpadl.style.top = (rInt+12)+"px";
    }
}
	// Precisely the same logic as the above function, just reverse
	// the variables and directions.
 function lPadMove(dir) {
    if(dir==1 && lInt > 5){
        lpadl.style.top = (lInt-12)+"px";
    } else if(dir==0 && lInt < 320){
        lpadl.style.top = (lInt+12)+"px";
    }
 }

// variables to determine what a key press means
var rup = '9';  // right paddle up
var rdn = '0';  // right paddle down
var lup = '1';  // left paddle up
var ldn = '2';  // left paddle down
function CaptureKey(e) {
	// We want to get the keycode for the pressed key which
	// triggered the event.
	// The following if block achieves this, and is necessary
	// to make it function in all major browsers.
	// Some browsers uses e.keyCode, and others uses e.which,
	// to get the correct keycode.
   if (e.keyCode) {
        keycode=e.keyCode;
   }
     else {
         keycode=e.which;   
     }
	// This following line obviously converts the keycode to 
	// a string object.
   move=String.fromCharCode(keycode);
  
  	// The rest of the function interprets the commands given and
	// executes the correct function.
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
// This function determines what should be done if anyone scores.
function score(side) {
// Stop the timer, that is, stop the ball from animating.
	clearInterval(t);
	// Again, why does msgBox get initiated every time someone
	// scores?
    msgBox = document.getElementById('messageBox');
    	// Show the score box.
    msgBox.style.visibility = "visible";

    scorePop = "<p>Point for the "+side+" side!<br /> ";
    scorePop += "To serve the ball again, press \"s\" after closing this pop-up.</p>";
    scorePop += "<a href=\"javascript:return false\" onClick=\prepNewGame('"+side+"');return false;\">X Close</a>";
     
     msgBox.innerHTML = scorePop;
}

function prepNewGame(side){
// Reset the timer ID variable (t).
// Reset all values.
	t=0;
    msgBox.style.visibility='hidden';
    theBall.style.top = "10px";
// determine which side serves and set the correct positions for the
// ball and the paddles.
    if(side == "left"){
    theBall.style.left = "25px";
    rpadl.style.top = "5px";
    lpadl.style.top = "5px";
    } else {
    theBall.style.left = (winWidth-40) + "px";
    rpadl.style.top = "5px";
    lpadl.style.top = "5px";
    }
   
}