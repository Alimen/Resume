var gameLogic = (function() {
	// Environmental variables
	var backContext;
	var img;
	var env;

	// Game variables
	var avatarPx, avatarPy;
	var avatarNx, avatarNy;
	var speedPy, speedNy;
	var screenX;

	// Key maps
	var keyLeft, keyRight, keyUp;
	var chasing;

///////////////////////////////////////////////////////////////////////////////
//
// Initialization
//
///////////////////////////////////////////////////////////////////////////////

	function init(_env, _img, _backContext) {
		env = _env;
		img = _img;
		backContext = _backContext;

		level.init(_env, _img, _backContext);
	}

	function reset() {
		screenX = -1200;
		avatarPx = 1610;
		avatarPy = 0;
		avatarNx = 1610;
		avatarNy = 0;
		speedPy = 0;
		speedNy = 0;

		keyLeft = false;
		keyRight = false;
		keyUp = false;
		chasing = 0;

		level.updateTextBlocks(screenX, avatarPx, avatarNx);
		$(".timeEvent").show();
	}

///////////////////////////////////////////////////////////////////////////////
//
// Event functions
//
///////////////////////////////////////////////////////////////////////////////

	function eventKeyUp(e) {
		if(e.keyCode == 37) {
			keyLeft = false;
		}
		if(e.keyCode == 39) {
			keyRight = false;
		}
		if(e.keyCode == 38) {
			keyUp = false;
		}
	}

	function eventKeyDown(e) {
		if(e.keyCode == 37) {
			keyLeft = true;
			chasing = 1;
		}
		if(e.keyCode == 39) {
			keyRight = true;
			chasing = 2;
		}
		if(e.keyCode == 38 && keyUp == false) {
			var res;
			res = level.collideTest(avatarPx, avatarPy, true, 3, moveSpeed);
			if(res < moveSpeed) {
				speedPy = 50;
			}
			res = level.collideTest(avatarNx, avatarNy, false, 1, moveSpeed);
			if(res < moveSpeed) {
				speedNy = -50;
			}
			keyUp = true;
		}
	}

	function resize(_width, _height) {
		env.screenWidth = _width;
		env.screenHeight = _height;
		level.resize(_width, _height);
	}

///////////////////////////////////////////////////////////////////////////////
//
// Push & draw
//
///////////////////////////////////////////////////////////////////////////////

	// Object speed constants
	var moveSpeed = 12;
	var chaseSpeed = 50;
	var gP = -5;
	var gN = 5;
	var stageWidth = 10000;

	function push() {
		var res;

		// Handle left / right movements
		if(keyLeft) {
			res = level.collideTest(avatarPx, avatarPy, true, 0, moveSpeed);
			if(res > 0) {
				avatarPx -= res;
			}
			res = level.collideTest(avatarNx, avatarNy-64, false, 0, moveSpeed);
			if(res > 0) {
				avatarNx -= res;
			}
		}
		if(keyRight) {
			res = level.collideTest(avatarPx, avatarPy, true, 2, moveSpeed);
			if(res > 0) {
				avatarPx += res;
			}
			res = level.collideTest(avatarNx, avatarNy-64, false, 2, moveSpeed);
			if(res > 0) {
				avatarNx += res;
			}
		}

		// Teleporting
		var left, right;
		var dist = vector(avatarPx, avatarNx);
		if(dist < 0) {
			left = avatarNx;
			right = avatarPx;
		} else {
			left = avatarPx;
			right = avatarNx;
		}
		if(avatarPx < 400) {
			if(left == avatarPx) {
				screenX = 400 - (stageWidth - (env.screenWidth-400));
				avatarPx = stageWidth - (env.screenWidth-400);
				if(Math.abs(dist) < env.screenWidth) {
					avatarNx = avatarPx + dist;
				}
			} else {
				avatarPx = stageWidth - (env.screenWidth-400);
			}
		}
		if(avatarNx < 400) {
			if(left == avatarNx) {
				screenX = 400 - (stageWidth - (env.screenWidth-400));
				avatarNx = stageWidth - (env.screenWidth-400);
				if(Math.abs(dist) < env.screenWidth) {
					avatarPx = avatarNx - dist;
				}
			} else {
				avatarNx = stageWidth - (env.screenWidth-400);
			}
		}
		if(avatarPx > stageWidth-400) {
			if(right == avatarPx) {
				screenX = 0;
				avatarPx = env.screenWidth-400;
				if(Math.abs(dist) < env.screenWidth) {
					avatarNx = avatarPx + dist;
				}
			} else {
				avatarPx = env.screenWidth-400;
			}
		}
		if(avatarNx > stageWidth-400) {
			if(right == avatarNx) {
				screenX = 0;
				avatarNx = env.screenWidth-400;
				if(Math.abs(dist) < env.screenWidth) {
					avatarPx = avatarNx - dist;
				}
			} else {
				avatarNx = env.screenWidth-400;
			}
		}

		// Handle gravity
		speedPy += gP;
		if(speedPy > 0) {
			res = level.collideTest(avatarPx, avatarPy, true, 1, speedPy);
			if(res > 0) {
				avatarPy += res;
			}
			if(res < speedPy) {
				speedPy = 0;
			}
		} else if(speedPy < 0) {
			res = level.collideTest(avatarPx, avatarPy, true, 3, (-1)*speedPy);
			if(res > 0) {
				avatarPy -= res;
			}
			if(res < (-1)*speedPy) {
				speedPy = 0;
			}
		}
		speedNy += gN;
		if(speedNy < 0) {
			res = level.collideTest(avatarNx, avatarNy-64, false, 3, (-1)*speedNy);
			if(res > 0) {
				avatarNy -= res;
			}
			if(res < (-1)*speedNy) {
				speedNy = 0
			}
		} else if(speedNy > 0) {
			res = level.collideTest(avatarNx, avatarNy-64, false, 1, speedNy);
			if(res > 0) {
				avatarNy += res;
			}
			if(res < speedNy) {
				speedNy = 0;
			}
		}

		// Handle screenX movements
		dist = vector(avatarPx, avatarNx);
		if(dist < 0) {
			left = avatarNx;
			right = avatarPx;
		} else {
			left = avatarPx;
			right = avatarNx;
		}

		var target, amount;
		if(chasing == 1 && left+screenX < 400) {
			target = 400 - left;
			amount = vector(screenX, target);
			if(amount > chaseSpeed) {
				amount = chaseSpeed;
			}
			screenX += amount;
			screenX = (screenX-stageWidth) % stageWidth;
		} else if(chasing == 2 && right+screenX > env.screenWidth-400) {
			target = (env.screenWidth-400) - right;
			amount = vector(screenX, target);
			if((-1)*amount > chaseSpeed) {
				amount = (-1)*chaseSpeed;
			}
			screenX += amount;
			screenX = (screenX-stageWidth) % stageWidth;
		}
	}

	function vector(a, b) {
		if(Math.abs(b-a) < stageWidth/2) {
			return (b-a);
		} else {
			if(a > b) {
				return (b-a+stageWidth);
			} else {
				return (b-a-stageWidth);
			}
		}
	}

	function draw() {
		push();
		level.updateTextBlocks(screenX, avatarPx, avatarNx);

		// Clear Background
		backContext.fillStyle = "#FFFFFF";
		backContext.fillRect(0, 0, env.screenWidth, env.screenHeight);

		// Draw horizon
		backContext.drawImage(img.brickP, 0, 0, 8, 8, 0, env.screenHeight/2, env.screenWidth, env.screenHeight/2);

		// Draw background objects
		level.updateBgObjects(screenX);

		// Draw foreground objects (bricks)
		level.drawBricks(screenX);

		// Draw avators
		backContext.drawImage(img.avatarP, avatarPx-32+screenX, env.screenHeight/2 - avatarPy - 64);
		backContext.drawImage(img.avatarN, avatarNx-32+screenX, env.screenHeight/2 - avatarNy);
	}

///////////////////////////////////////////////////////////////////////////////
//
// Setup public access
//
///////////////////////////////////////////////////////////////////////////////

	return {
		init : init,
		reset : reset,
		draw : draw,

		eventKeyUp : eventKeyUp,
		eventKeyDown : eventKeyDown,
		resize : resize
	};
})();
