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
		}
		if(e.keyCode == 39) {
			keyRight = 1;
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

	function push() {
		const moveSpeed = 10;

		if(keyLeft == 1) {
			if(avatarPx >= 400) {
				avatarPx -= moveSpeed;
				avatarNx -= moveSpeed;
			} else {
				screenX += moveSpeed;
			}
		}
		if(keyRight == 1) {
			if(avatarPx < env.screenWidth-400) {
				avatarPx += moveSpeed;
				avatarNx += moveSpeed;
			} else {
				screenX -= moveSpeed;
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

		// Draw avators
		backContext.drawImage(img.avatarP, avatarPx-32, env.screenHeight/2 + avatarPy - 64);
		backContext.drawImage(img.avatarN, avatarNx-32, env.screenHeight/2 - avatarNy);
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
