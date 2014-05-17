var resume = (function() {
	if(!canvasSupport) {
		document.location.href = "Unsupported.html";
		return;
	}
	
///////////////////////////////////////////////////////////////////////////////
//
// Variable declearations
//
///////////////////////////////////////////////////////////////////////////////

	// Canvas
	var theCanvas;
	var context;
	var backCanvas;
	var backContext;

	// Environmental variables
	var env;
	var screenWidth;
	var screenHeight;

	// Image resources
	var imgAvatarP = new Image();
	var imgAvatarN = new Image();
	var imgBrickP = new Image();
	var imgBrickN = new Image();
	var imgLogo = new Image();
	var imgInstruct = new Image();
	var imgMountPL = new Image();
	var imgMountPS = new Image();
	var imgMountNL = new Image();
	var imgMountNS = new Image();
	var imgFlagP = new Image();
	var imgFlagN = new Image();

///////////////////////////////////////////////////////////////////////////////
//
// Main state machine
//
///////////////////////////////////////////////////////////////////////////////

	// State enumeration
	var mainStates = {
		unknown		: -1,
		initial		: 0, 
		loading		: 1,
		reset		: 2,
		game		: 3
	};
	var state = mainStates.initial;

	function timerTick() {
		switch(state) {
		case mainStates.initial:
			init();
			break;
		case mainStates.loading:
			drawload();
			break;
		case mainStates.reset:
			gameLogic.reset();
			state = mainStates.game;
			break;
		case mainStates.game:
			gameLogic.draw();
			flip();
			break;
		}
	}

///////////////////////////////////////////////////////////////////////////////
//
// Event functions
//
///////////////////////////////////////////////////////////////////////////////

	function eventKeyUp(e) {
		if(e.keyCode == 37 || e.keyCode == 39) {
			e.preventDefault();
		}
		gameLogic.eventKeyUp(e);
	}

	function eventKeyDown(e) {
		if(e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 38) {
			e.preventDefault();
		}
		gameLogic.eventKeyDown(e);
	}

	function resizeCanvas() {
		screenWidth = window.innerWidth;
		screenHeight = window.innerHeight;
		theCanvas.width = screenWidth;
		theCanvas.height = screenHeight;
		backCanvas.width = screenWidth;
		backCanvas.height = screenHeight;

		if(state == mainStates.game) {
			gameLogic.resize(screenWidth, screenHeight);
		}
	}

///////////////////////////////////////////////////////////////////////////////
//
// Initialization & loader functions
//
///////////////////////////////////////////////////////////////////////////////

	// Loader counters
	var itemsToLoad = 12;
	var loadCount = 0;

	function init() {
		// Setup image loader events
		imgAvatarP.src = "image/AvatarP.png";
		imgAvatarP.onload = eventItemLoaded;
		imgAvatarN.src = "image/AvatarN.png";
		imgAvatarN.onload = eventItemLoaded;
		imgBrickP.src = "image/BrickP.png";
		imgBrickP.onload = eventItemLoaded;
		imgBrickN.src = "image/BrickN.png";
		imgBrickN.onload = eventItemLoaded;
		imgLogo.src = "image/HTML5_Logo.png";
		imgLogo.onload = eventItemLoaded;
		imgInstruct.src = "image/Instructions.png";
		imgInstruct.onload = eventItemLoaded;
		imgMountPL.src = "image/MountPL.png";
		imgMountPL.onload = eventItemLoaded;
		imgMountPS.src = "image/MountPS.png";
		imgMountPS.onload = eventItemLoaded;
		imgMountNL.src = "image/MountNL.png";
		imgMountNL.onload = eventItemLoaded;
		imgMountNS.src = "image/MountNS.png";
		imgMountNS.onload = eventItemLoaded;
		imgFlagP.src = "image/FlagP.png";
		imgFlagP.onload = eventItemLoaded;
		imgFlagN.src = "image/FlagN.png";
		imgFlagN.onload = eventItemLoaded;

		// Setup canvas
		theCanvas = document.getElementById("canvas");
		context = theCanvas.getContext("2d");
		backCanvas  = document.createElement("canvas");
		backContext = backCanvas.getContext("2d");
		resizeCanvas();

		// Setup events
		document.addEventListener("keyup", eventKeyUp, true);
		document.addEventListener("keydown", eventKeyDown, true);
		window.addEventListener('resize', resizeCanvas, false);
		
		// Prepare global variables
		env = {
			mainStates : mainStates,
			screenWidth : screenWidth,
			screenHeight : screenHeight
		};

		// Switch to next state
		state = mainStates.loading;
	}

	function drawload() {
		// Caculate loader
		var percentage = Math.round(loadCount / itemsToLoad * 100);

		// Clear Background
		context.fillStyle = "#FFFFFF";
		context.fillRect(0, 0, screenWidth, screenHeight);

		// Print percentage
		context.textBaseline = "bottom";	
		context.fillStyle = "#000000";
		context.font = "14px monospace";
		context.textAlign = "center";
		context.fillText(percentage + "%", screenWidth / 2, screenHeight / 2);
	}

	function eventItemLoaded(e) {
		loadCount++;
		if(loadCount == itemsToLoad) {
			gameLogic.init(env, {
				avatarP : imgAvatarP,
				avatarN : imgAvatarN,
				brickP : imgBrickP,
				brickN : imgBrickN,
				logo : imgLogo,
				ins : imgInstruct,
				mountPL : imgMountPL,
				mountPS : imgMountPS,
				mountNL : imgMountNL,
				mountNS : imgMountNS,
				flagP : imgFlagP,
				flagN : imgFlagN
			}, backContext);
			state = mainStates.reset;
		}
	}

///////////////////////////////////////////////////////////////////////////////
//
// General utilities
//
///////////////////////////////////////////////////////////////////////////////

	function flip() {
		context.drawImage(backCanvas, 0, 0);
	}

///////////////////////////////////////////////////////////////////////////////
//
// Public Access
//
///////////////////////////////////////////////////////////////////////////////

	function startMessageLoop() {
		var FPS = 30;
		var intervalTime = 1000 / FPS;
		setInterval(timerTick, intervalTime);
	}

	return {
		startMessageLoop : startMessageLoop
	};
})();

function canvasSupport() {
	return !!document.createElement('testcanvas').getContext;
}

function eventWindowLoaded() {
	resume.startMessageLoop();
}
window.addEventListener('load', eventWindowLoaded, false);

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
		screenX = -2300;
		avatarPx = 2710;
		avatarPy = 0;
		avatarNx = 2710;
		avatarNy = 0;
		speedPy = 0;
		speedNy = 0;

		keyLeft = false;
		keyRight = false;
		keyUp = false;
		chasing = 0;

		level.updateTextBlocks(screenX, avatarPx, avatarNx);
		$(".timeEvent").show();
		$("#switch").show();
		$("#contact").show();
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
	var stageWidth = 11000;

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
		if(avatarPx > stageWidth-100) {
			if(avatarPx == right) {
				avatarPx = 2400;
				screenX = (env.screenWidth-400)-avatarPx;
				if(Math.abs(dist) < env.screenWidth-400) {
					avatarNx = avatarPx + dist;
				} else {
					avatarNx = avatarPx - env.screenWidth;
				}
			} else {
				avatarPx = 2400;
			}
		}
		if(avatarNx > stageWidth-100) {
			if(avatarNx == right) {
				avatarNx = 2400;
				screenX = (env.screenWidth-400)-avatarNx;
				if(Math.abs(dist) < env.screenWidth-400) {
					avatarPx = avatarNx - dist;
				} else {
					avatarPx = avatarNx - env.screenWidth;
				}
			} else {
				avatarNx = 2400;
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
		} else if(chasing == 2 && right+screenX > env.screenWidth-400) {
			target = (env.screenWidth-400) - right;
			amount = vector(screenX, target);
			if((-1)*amount > chaseSpeed) {
				amount = (-1)*chaseSpeed;
			}
			screenX += amount;
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

var level = (function() {
	// Environmental variables
	var backContext;
	var img;
	var env;

	function init(_env, _img, _backContext) {
		env = _env;
		img = _img;
		backContext = _backContext;
	}

///////////////////////////////////////////////////////////////////////////////
//
// Text block subroutines
//
///////////////////////////////////////////////////////////////////////////////

	// Text block parameters (#id, position-x, expanded)
	var textBlocksP = [
		["#switch", 2833, false],
		["#contact", 3200, false],
		["#work0", 3900, false],
		["#work1", 5330, false],
		["#school0", 7100, false],
		["#school1", 7600, false]
	];
	var textBlocksN = [
		["#game0", 3480, false],
		["#game1", 4000, false],
		["#game2", 4830, false],
		["#game3", 5330, false],
		["#game4", 5840, false],
		["#game5", 6900, false],
		["#game6", 7480, false]
	];

	function updateTextBlocks(screenX, px, nx) {
		// Positive text blocks
		for(var i = 0; i < textBlocksP.length; i++) {
			$(textBlocksP[i][0]).css("marginLeft", (textBlocksP[i][1] + screenX) + "px");

			if(textBlocksP[i][1]-50 < px && px <= textBlocksP[i][1]+500) {
				if(!textBlocksP[i][2]) {
					$(textBlocksP[i][0]).find(".description").slideToggle();
					textBlocksP[i][2] = true;
				}
			} else {
				if(textBlocksP[i][2]) {
					$(textBlocksP[i][0]).find(".description").slideToggle();
					textBlocksP[i][2] = false;
				}
			}
		}

		// Negative text blocks
		for(var i = 0; i < textBlocksN.length; i++) {
			$(textBlocksN[i][0]).css("marginLeft", (textBlocksN[i][1] + screenX) + "px");

			if(textBlocksN[i][1]-50 < nx && nx <= textBlocksN[i][1]+500) {
				if(!textBlocksN[i][2]) {
					$(textBlocksN[i][0]).removeClass("restrict");
					$(textBlocksN[i][0]).find(".description").slideToggle();
					textBlocksN[i][2] = true;
				}
			} else {
				if(textBlocksN[i][2]) {
					$(textBlocksN[i][0]).addClass("restrict");
					$(textBlocksN[i][0]).find(".description").slideToggle();
					textBlocksN[i][2] = false;
				}
			}
		}
	}

///////////////////////////////////////////////////////////////////////////////
//
// Background object subroutines
//
///////////////////////////////////////////////////////////////////////////////

	// Background object parameters (image#ID position-x, position-y, width, height)
	var bgObjects = [
		["mountPL", -160, 1024, 1024, 1024],
		["mountNL", -160, 0, 1024, 1024],
		["mountPS", -60, 256, 256, 256],
		["mountNS", -60, 0, 256, 256],
		["flagP", 940, 420, 70, 400],
		["flagN", 940, -20, 70, 400],
		["logo", 2800, -80, 256, 297],
		["ins", 2810, 380, 320, 320],
		["mountPL", 3100, 1024, 1024, 1024],
		["mountNL", 3100, 0, 1024, 1024],
		["mountPS", 3030, 256, 256, 256],
		["mountNS", 3030, 0, 256, 256],
		["mountPL", 4600, 1024, 1024, 1024],
		["mountNL", 4600, 0, 1024, 1024],
		["mountPL", 4900, 1024, 1024, 1024],
		["mountNL", 4900, 0, 1024, 1024],
		["mountPS", 4800, 256, 256, 256],
		["mountNS", 4800, 0, 256, 256],
		["mountPS", 5790, 256, 256, 256],
		["mountNS", 5790, 0, 256, 256],
		["mountPS", 6850, 256, 256, 256],
		["mountNS", 6850, 0, 256, 256],
		["mountPS", 7350, 256, 256, 256],
		["mountNS", 7350, 0, 256, 256],
		["mountPL", 7500, 1024, 1024, 1024],
		["mountNL", 7500, 0, 1024, 1024],
		["mountPL", 8300, 1024, 1024, 1024],
		["mountNL", 8300, 0, 1024, 1024],
		["mountPS", 8200, 256, 256, 256],
		["mountNS", 8200, 0, 256, 256],
		["mountPS", 8400, 256, 256, 256],
		["mountNS", 8400, 0, 256, 256],
		["flagP", 9400, 420, 70, 400],
		["flagN", 9400, -20, 70, 400]
	];

	function getImageById(_id) {
		switch(_id) {
		case "logo":
			return img.logo;
		case "ins":
			return img.ins;
		case "mountPL":
			return img.mountPL;
		case "mountPS":
			return img.mountPS;
		case "mountNL":
			return img.mountNL;
		case "mountNS":
			return img.mountNS;
		case "flagP":
			return img.flagP;
		case "flagN":
			return img.flagN;
		}

		return 0;
	}

	function updateBgObjects(screenX) {
		var img;
		for(var i = 0; i < bgObjects.length; i++) {
			img = getImageById(bgObjects[i][0]);
			backContext.drawImage(img, 0, 0, img.width, img.height, bgObjects[i][1] + screenX, env.screenHeight/2 - bgObjects[i][2], bgObjects[i][3], bgObjects[i][4]);
		}
	}

	function resize(_width, _height) {
		env.screenWidth = _width;
		env.screenHeight = _height;
	}

///////////////////////////////////////////////////////////////////////////////
//
// Foreground object subroutines
//
///////////////////////////////////////////////////////////////////////////////

	// Foreground object parameters (isPositive, visible, x, y, width, height)
	var bricks = [
		// Positive bricks
		[true, false, -500, 0, 12000, 100],			// floor
		[true, true, 320, 400, 80, 400],			// repeated level 4
		[true, true, 100, 350, 80, 100],
		[true, true, 950, 70, 50, 70],
		[true, true, 3200, 100, 420, 100],			// level 1
		[true, true, 3530, 200, 90, 100],
		[true, true, 4500, 130, 50, 130],			// level 2
		[true, true, 4730, 130, 50, 130],
		[true, true, 6000, 130, 840, 30],			// level 3
		[true, true, 6350, 100, 130, 100],
		[true, true, 6350, 230, 230, 30],
		[true, true, 6350, 1230, 30, 1000],
		[true, true, 6680, 330, 30, 200],
		[true, true, 6480, 360, 230, 30],
		[true, true, 6710, 200, 130, 70],
		[true, true, 7850, 100, 80, 100],			// level 4
		[true, true, 8090, 250, 80, 100],
		[true, true, 8340, 300, 80, 100],
		[true, true, 8560, 350, 80, 100],
		[true, true, 8780, 400, 80, 400],
		[true, true, 9410, 70, 50, 70],

		// Negative bricks
		[false, false, -500, 100, 12000, 100],		// floor
		[false, true, 320, 0, 80, 400],				// repeated level 4
		[false, true, 100, -250, 80, 100],
		[false, true, 950, 0, 50, 70],
		[false, true, 3280, 0, 80, 110],			// level 1
		[false, true, 4550, -70, 192, 30],			// level 2
		[false, true, 4678, -100, 64, 1024],
		[false, true, 6350, 0, 100, 100],			// level 3
		[false, true, 6450, -210, 260, 30],
		[false, true, 6450, 0, 30, 210],
		[false, true, 6590, -75, 250, 30],
		[false, true, 6810, -105, 30, 1000],
		[false, true, 7950, 0, 80, 100],			// level 4
		[false, true, 8150, -150, 80, 100],
		[false, true, 8340, -200, 80, 100],
		[false, true, 8560, -250, 80, 100],
		[false, true, 8780, 0, 80, 400],
		[false, true, 9410, 0, 50, 70]
	];

	// Detect collidings
	// dir: 0 == left,  1 == top,  2 == right,  3 == bottom
	function collideTest(x0, y0, isPositive, dir, step) {
		var i;
		switch(dir) {
		case 0:
			for(i = 0; i < bricks.length; i++) {
				if(isPositive == bricks[i][0]) {
					if(collideBrick(x0-step, y0, bricks[i][2], bricks[i][3], bricks[i][4], bricks[i][5])) {
						return (x0-32) - (bricks[i][2]+bricks[i][4]);
					}
				}
			}
			break;
		case 1:
			for(i = 0; i < bricks.length; i++) {
				if(isPositive == bricks[i][0]) {
					if(collideBrick(x0, y0+step, bricks[i][2], bricks[i][3], bricks[i][4], bricks[i][5])) {
						return (bricks[i][3]-bricks[i][5]) - (y0+64);
					}
				}
			}
			break;
		case 2:
			for(i = 0; i < bricks.length; i++) {
				if(isPositive == bricks[i][0]) {
					if(collideBrick(x0+step, y0, bricks[i][2], bricks[i][3], bricks[i][4], bricks[i][5])) {
						return bricks[i][2] - (x0+32);
					}
				}
			}
			break;
		case 3:
			for(i = 0; i < bricks.length; i++) {
				if(isPositive == bricks[i][0]) {
					if(collideBrick(x0, y0-step, bricks[i][2], bricks[i][3], bricks[i][4], bricks[i][5])) {
						return y0 - bricks[i][3];
					}
				}
			}
			break;
		}

		return step;
	}

	function collideBrick(x0, y0, x, y, w, h) {
		if(x0-32 < x+w && x0+32 > x && y0 < y && y0+64 > y-h) {
			return true;
		} else {
			return false;
		}		
	}

	function drawBricks(screenX) {
		var i;
		for(i = 0; i < bricks.length; i++) {
			if(bricks[i][0]) {
				if(bricks[i][1]) {
					backContext.drawImage(img.brickP, 0, 0, 8, 8, bricks[i][2] + screenX, env.screenHeight/2 - bricks[i][3], bricks[i][4], bricks[i][5]);
				}
			} else {
				if(bricks[i][1]) {
					backContext.drawImage(img.brickN, 0, 0, 8, 8, bricks[i][2] + screenX, env.screenHeight/2 - bricks[i][3], bricks[i][4], bricks[i][5]);
				}
			}
		}
	}

	return {
		init : init,
		resize : resize,

		updateTextBlocks : updateTextBlocks,
		updateBgObjects : updateBgObjects,

		collideTest : collideTest,
		drawBricks : drawBricks
	};
})();

