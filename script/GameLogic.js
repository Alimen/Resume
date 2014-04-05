var gameLogic = (function() {
	// Environmental variables
	var backContext;
	var img;
	var env;

	// Game variables
	var avatarPx, avatarPy;
	var avatarNx, avatarNy;
	var screenX;

	// Key maps
	var keyLeft;
	var keyRight;
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

		keyLeft = 0;
		keyRight = 0;
		chasing = 0;
	}

///////////////////////////////////////////////////////////////////////////////
//
// Event functions
//
///////////////////////////////////////////////////////////////////////////////

	function eventKeyUp(e) {
		if(e.keyCode == 37) {
			keyLeft = 0;
		}
		if(e.keyCode == 39) {
			keyRight = 0;
		}
	}

	function eventKeyDown(e) {
		if(e.keyCode == 37) {
			keyLeft = 1;
			chasing = 1;
		}
		if(e.keyCode == 39) {
			keyRight = 1;
			chasing = 2;
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

	// Object speed settings
	const moveSpeed = 7;
	const chaseSpeed = 20;

	function push() {
		if(keyLeft == 1) {
			if(!level.collideTestP(avatarPx-moveSpeed, avatarPy)) {
				avatarPx -= moveSpeed;
			}
			if(!level.collideTestN(avatarNx-moveSpeed, avatarNy)) {
				avatarNx -= moveSpeed;
			}
		}
		if(keyRight == 1) {
			if(!level.collideTestP(avatarPx+moveSpeed, avatarPy)) {
				avatarPx += moveSpeed;
			}
			if(!level.collideTestN(avatarNx+moveSpeed, avatarNy)) {
				avatarNx += moveSpeed;
			}
		}

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
		backContext.drawImage(img.avatarP, avatarPx-32+screenX, env.screenHeight/2 + avatarPy - 64);
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
