var resume = (function() {
	if(!canvasSupport) {
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

///////////////////////////////////////////////////////////////////////////////
//
// Main state machine
//
///////////////////////////////////////////////////////////////////////////////

	// State enumeration
	const mainStates = {
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
	var itemsToLoad = 10;
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
				mountNS : imgMountNS
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
		const FPS = 30;
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

