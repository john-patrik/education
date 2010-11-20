/*
 * Author: mindbug.
 */

/*
 * Problem: The ball sometimes does not "get hit" by a paddle, especially 
 * if the paddle moves.
 * This might have something do to with the paddles movement; it moves
 * x pixels, whereas the ball moves 1. It also might have something to do
 * with the width of different elements, so that the logic is correct,
 * but not the visual representation.
 *
 * Note about functions,
 *   function blah() {}
 * gets translated to
 *   var blah = function () {};
 * by the compiler at runtime. This program uses only the latter
 * for consistency.
 */

/* 
 * TODO 
 * Don't call this.getDom() so much!
 */
var ball = {
	/* 
	 * The direction is the opposite of what it should be, logically,
	 * because the ball starts in contact with the pad,
	 * so the first move it does is to change dir to the right.
	 */
	direction: -1,
	ydirection: 1,
	getDom: function () {
		return document.getElementById("ball1");
	},
	getWidth: function () {
		return parseInt(this.getDom().width);
	},
	getHeight: function () {
		return parseInt(this.getDom().height);
	},
	changeXDir: function () {
		this.direction = this.direction * -1;
	},
	going: function (dir) {
		switch (dir) {
		case 'left':
			if (this.direction < 0) {
				return true;
			} else {
				return false;
			}
		break;
		case 'right':
			if (this.direction >= 0) {
				return true;
			} else {
				return false;
			}
		break;
		case 'up':
			if (this.ydirection < 0) {
				return true;
			} else {
				return false;
			}
		break;
		case 'down':
			if (this.ydirection >= 0) {
				return true;
			} else {
				return false;
			}
		break;
		}
	},
	changeYDir: function () {
		this.ydirection = this.ydirection * -1;
	},
	prepServe: function (side) {
		this.getDom().style.top = "10px";
		this.ydirection = 1;
		switch (side) {
		case 'left':
			this.getDom().style.left = "25px";
			this.direction = -1;
		break;
		case 'right':
			this.getDom().style.left = 725 - this.getWidth() + "px";
			this.direction = 1;
		break;
		}
	},
	move: function () {
		this.getDom().style.left = this.edge('left') +
			this.direction + 'px';	
		this.getDom().style.top = this.edge('top') + 
			this.ydirection + 'px';	
	},
	edge: function (dir) {
		switch (dir) {
		case 'left':
			return parseInt(this.getDom().style.left);
		break;
		case 'right':
			return this.edge('left') + this.getWidth();
		break;
		case 'top':
			return parseInt(this.getDom().style.top);
		break;
		case 'bottom':
			return this.edge('top') + this.getHeight();
		break;
		}
	}
};

var court = {
	edge: function (dir) {
		switch (dir) {
		case 'left':
			return 0;
		break;
		case 'right':
			return 750;
		break;
		case 'top':
			return 0;
		break;
		case 'bottom':
			return 400;
		break;
		}
	}
};

/*
 * Constructor example, without the use of the 'new' operator.
 * Uses object literal: {}.
 */
var makePad = function (html_id) {
	return {
	getDom: function () {
		return document.getElementById(html_id);
	},
	getWidth: function () {
		return parseInt(this.getDom().style.width);
	},
	getHeight: function () {
		return parseInt(this.getDom().style.height);
	},
	getLeft: function () {
		return parseInt(this.getDom().style.left);
	},
	getRight: function () {
		return this.getLeft() + this.getWidth();
	},
	getTop: function () {
		return parseInt(this.getDom().style.top);
	},
	increaseSize: function () {
		this.getDom().style.height = this.getHeight() + 10 + "px";
	},
	decreaseSize: function () {
		this.getDom().style.height = this.getHeight() - 10 + "px";
	},
	getBottom: function () {
		return this.getTop() + this.getHeight();
	},
	prepServe: function (side) {
		this.getDom().style.top = "4px";
		this.getDom().style.height = "70px";
		switch (side) {
		case 'left':
			this.getDom().style.left = "15px";
		break;
		case 'right':
			this.getDom().style.left = "725px";
		break;
		}
	},
	move: function (dir) {
		switch (dir) {
		case 'left':
			this.getDom().style.left = this.getLeft() - 10 + 'px';
		break;
		case 'right':
			this.getDom().style.left = this.getLeft() + 10 + 'px';
		break;
		case 'up':
			this.getDom().style.top = this.getTop() - 10 + 'px';
		break;
		case 'down':
			this.getDom().style.top = this.getTop() + 10 + 'px';
		break;
		}
	},
	edge: function (dir) {
		switch (dir) {
		case 'left':
			return this.getLeft();
		break;
		case 'right':
			return this.getRight();
		break;
		case 'top':
			return this.getTop();
		break;
		case 'bottom':
			return this.getBottom();
		break;
		}
	}
	};
};

/*
 * Create two objects by using the constructor function above.
 */
var leftPad = makePad('leftpaddle');
var rightPad = makePad('rightpaddle');

/*
 * The following function is used to increase the speed of the
 * game. The amount of calls to setInterval should be severely limited
 * because they are very CPU-intensive.
 *
 * The speed is increased by doing more calls to setInterval, which
 * results in that moveBall() gets called with increased frequency.
 */
var intervals = [];
var increaseGameSpeed = function () {
	if (Math.floor(Math.random() * 5 + 1) == 1 && 
		intervals.length <= 3) {
		intervals.push(setInterval('moveBall()', 20));
	}
};

var startGame  = function () {
	if (intervals.length < 1) {
		intervals.push(setInterval('moveBall()', 10));
	}
};

/*
 * Controls the ball and the game. This logic could have been
 * included in the ball object, but it was a design decision to
 * keep the ball from knowing about its surroundings.
 */
var moveBall = function () {
	if (touchesNet('left')) {
		score('right');
	} else if (touchesNet('right')) {
		score('left');
	}

	if (touchesSide('left') && ball.going('left')) {
		ball.changeXDir();
	} else if (touchesSide('right') && ball.going('right')) {
		ball.changeXDir();
	}
	if (touchesSide('top') && ball.going('up')) {
		ball.changeYDir();
	} else if (touchesSide('bottom') && ball.going('down')) {
		ball.changeYDir();
	}
	ball.move();
};

/* 
 * Determine if some side of the ball touches anything. 
 * This function also increases the speed of the game when
 * the ball hits a pad, however this is not the ideal place to 
 * implement that functionality.
 */
var touchesSide = function (side) {
	switch (side) {
	case 'top':
		/* 
		 * If top side touches upper wall, 
		 * else if it touches left(right)Pads bottom side. 
		 */
		if (ball.edge('top') == court.edge('top')) {
			return true;
		} else if (ball.edge('top') == leftPad.edge('bottom') &&
			ball.edge('left') <= leftPad.edge('right') &&
			ball.edge('right') >= leftPad.edge('left')) {
			return true;
		} else if (ball.edge('top') == rightPad.edge('bottom') &&
			ball.edge('left') <= rightPad.edge('right') &&
			ball.edge('right') >= rightPad.edge('left')) {
			return true;
		} else {
			return false;
		}
	break;
	case 'bottom':
		/* 
		 * If bottom side touches bottom wall, 
		 * else if it touches left(right)Pads top side. 
		 */
		if (ball.edge('bottom') == court.edge('bottom')) {
			return true;
		} else if (ball.edge('bottom') == leftPad.edge('top') &&
			ball.edge('left') <= leftPad.edge('right') && 
			ball.edge('right') >= leftPad.edge('left')) {
			return true;
		} else if (ball.edge('bottom') == rightPad.edge('top') &&
			ball.edge('left') <= rightPad.edge('right') && 
			ball.edge('right') >= rightPad.edge('left')) {
			return true;
		} else {
			return false;
		}
	break;
	case 'left':
		/* 
		 * If left side of ball touches left wall, 
		 * else if left side of ball touches right side of any pad. 
		 */
		if (ball.edge('left') == court.edge('left')) {
			return true;
		} else if (ball.edge('left') == leftPad.edge('right') &&
			ball.edge('top') <= leftPad.edge('bottom') &&
			ball.edge('bottom') >= leftPad.edge('top')) {
			/* Increase the speed. Ideally this should not
			 * be called here, but instead in the moveBall()
			 * function.
			 */
			increaseGameSpeed();
			return true;
		} else if (ball.edge('left') == rightPad.edge('right') &&
			ball.edge('top') <= rightPad.edge('bottom') &&
			ball.edge('bottom') >= rightPad.edge('top')) {
			return true;
		} else {
			return false;
		}
	break;
	case 'right':
		/*
	 	 * If right side of the ball touches the right wall, 
	 	 * else if the right side of the ball touches the left 
		 * side of any pad. 
		 */
		if (ball.edge('right') == court.edge('right')) {
			return true;
		} else if (ball.edge('right') == leftPad.edge('left') &&
			ball.edge('top') <= leftPad.edge('bottom') &&
			ball.edge('top') >= leftPad.edge('top')) {
			return true;
		} else if (ball.edge('right') == rightPad.edge('left') &&
			ball.edge('top') <= rightPad.edge('bottom') &&
			ball.edge('top') >= rightPad.edge('top')) {
			/* Increase the speed. Ideally this should not
			 * be called here, but instead in the moveBall()
			 * function.
			 */
			increaseGameSpeed();
			return true;
		} else {
			return false;
		}
	break;
	}
};

/*
 * Objects could have been made to represent the goals, but instead
 * the static numbers were used, as per the Pong.html file.
 */
var touchesNet = function (side) {
	if (ball.edge(side) == court.edge(side) &&
		ball.edge('top') <= 250 &&
		ball.edge('bottom') >= 150) {
		return true;
	} else {
		return false;
	}
};

var captureKey = function (e) {
	var keycode;
	/*
	 * This is a cross-browser hack.
	 */
	if (e.keyCode) { 
		keycode = e.keyCode;
	} else {
		keycode = e.which;
	}
	switch (String.fromCharCode(keycode)) {
		case 'w':
			leftPad.move('up');
		break;
		case 's':
			leftPad.move('down');
		break;
		case 'a':
			leftPad.move('left');
		break;
		case 'd':
			leftPad.move('right');
		break;
		case 'i':
			rightPad.move('up');
		break;
		case 'k':
			rightPad.move('down');
		break;
		case 'j':
			rightPad.move('left');
		break;
		case 'l':
			rightPad.move('right');
		break;
		case '5':
			leftPad.decreaseSize();
			rightPad.decreaseSize();
		break;
		case '6':
			leftPad.increaseSize();
			rightPad.increaseSize();
		break;
	}
};

var scorePop;
var score = function (side) {
	/*
	 * Clear the intervals which calls moveBall()
	 * and remove them from the array.
	 */
	while (intervals.length > 0) {
		clearInterval(intervals.pop());
	}
	msgBox = document.getElementById('messageBox');
	msgBox.style.visibility = "visible";
	scorePop = "<p>Point for the "+side+" side!<br /> ";
    	scorePop += "To serve the ball again, press the button " + 
		"after closing this pop-up.</p>";
    	scorePop += "<a href=\"javascript:return false\" onClick=\"prepServe('" + 
		side + "');return false;\">X Close</a>";
     	msgBox.innerHTML = scorePop;
};

var prepServe = function (side) {
    	msgBox.style.visibility='hidden';
	ball.prepServe(side);
	/* 
	 * TODO 
	 * Fix these, they have stupid names.
	 */
	leftPad.prepServe('left');
	rightPad.prepServe('right');
};

