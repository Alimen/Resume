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
		screenX = 0;
		avatarPx = 410;
		avatarPy = 0;
		avatarNx = 410;
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
		avatarPx = (avatarPx+10000) % 10000;
		avatarNx = (avatarNx+10000) % 10000;

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
		// chasing == 1, go left.
		// chasing == 2, go right.
		var target, amount;
		if(chasing == 1) {
			if(avatarPx < avatarNx) {
				target = avatarPx;
			} else {
				target = avatarNx;
			}
			if(target+screenX < 400) {
				amount = 400-(target+screenX);
				if(amount > chaseSpeed) {
					amount = chaseSpeed;
				}
				screenX += amount;
			}
		} else if(chasing == 2) {
			if(avatarPx > avatarNx) {
				target = avatarPx;
			} else {
				target = avatarNx;
			}
			if(target+screenX > env.screenWidth-400) {
				amount = (target+screenX)-(env.screenWidth-400);
				if(amount > chaseSpeed) {
					amount = chaseSpeed;
				}
				screenX -= amount;
			}
		}
		//screenX = (screenX-10000) % 10000;
		//console.log(screenX);
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
