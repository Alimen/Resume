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
		["#work0", 1500, 0],
		["#work1", 2500, 0],
		["#school0", 3500, 0],
		["#school1", 4500, 0]
	];
	var textBlocksN = [
		["#game0", 1000, 0],
		["#game1", 1600, 0],
		["#game2", 2200, 0],
		["#game3", 2800, 0],
		["#game4", 3400, 0],
		["#game5", 4000, 0],
		["#game6", 4600, 0]
	];

	function updateTextBlocks(screenX, px, nx) {
		// Positive text blocks
		for(var i = 0; i < textBlocksP.length; i++) {
			$(textBlocksP[i][0]).css("marginLeft", (textBlocksP[i][1] + screenX) + "px");

			if(textBlocksP[i][1]-50 < px && px <= textBlocksP[i][1]+500) {
				if(textBlocksP[i][2] == 0) {
					$(textBlocksP[i][0]).find(".description").slideToggle();
					textBlocksP[i][2] = 1;
				}
			} else {
				if(textBlocksP[i][2] == 1) {
					$(textBlocksP[i][0]).find(".description").slideToggle();
					textBlocksP[i][2] = 0;
				}
			}
		}

		// Negative text blocks
		for(var i = 0; i < textBlocksN.length; i++) {
			$(textBlocksN[i][0]).css("marginLeft", (textBlocksN[i][1] + screenX) + "px");

			if(textBlocksN[i][1]-50 < nx && nx <= textBlocksN[i][1]+500) {
				if(textBlocksN[i][2] == 0) {
					$(textBlocksN[i][0]).removeClass("restrict");
					$(textBlocksN[i][0]).find(".description").slideToggle();
					textBlocksN[i][2] = 1;
				}
			} else {
				if(textBlocksN[i][2] == 1) {
					$(textBlocksN[i][0]).addClass("restrict");
					$(textBlocksN[i][0]).find(".description").slideToggle();
					textBlocksN[i][2] = 0;
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
		["logo", 500, -80, 256, 297],
		["ins", 500, 377, 256, 297],
		["mountPL", 800, 1024, 1024, 1024],
		["mountPS", 730, 256, 256, 256],
		["mountNL", 800, 0, 1024, 1024],
		["mountNS", 730, 0, 256, 256]
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

	// Foreground object parameters (visible, x, y, width, height)
	var brickP = [
		[true, -512, 1024, 512, 1024],
		[true, 900, 128, 32, 128]
	];
	var brickN = [
		[true, -512, 0, 512, 1024],
		[true, 950, 0, 32, 128]
	];

	// Detect collidings
	// dir: 0 == left,  1 == top,  2 == right,  3 == bottom
	function collideTestP(px, py) {
		var x, y, w, h;
		for(var i = 0; i < brickP.length; i++) {
			x = brickP[i][1];
			y = brickP[i][2];
			w = brickP[i][3];
			h = brickP[i][4];

			if(px-32 <= x+w && px+32 >= x && py <= y && py+64 >= y-h) {
				return true;
			}
		}
		return false;
	}

	function collideTestN(nx, ny) {
		var x, y, w, h;
		for(var i = 0; i < brickN.length; i++) {
			x = brickN[i][1];
			y = brickN[i][2];
			w = brickN[i][3];
			h = brickN[i][4];

			if(nx-32 <= x+w && nx+32 >= x && (-1)*ny <= y && (-1)*(ny+64) >= y-h) {
				return true;
			}
		}
		return false;
	}

	function drawBricks(screenX) {
		var i;
		for(i = 0; i < brickP.length; i++) {
			if(brickP[i][0]) {
				backContext.drawImage(img.brickP, 0, 0, 8, 8, brickP[i][1] + screenX, env.screenHeight/2 - brickP[i][2], brickP[i][3], brickP[i][4]);
			}
		}
		for(i = 0; i < brickN.length; i++) {
			if(brickN[i][0]) {
				backContext.drawImage(img.brickN, 0, 0, 8, 8, brickN[i][1] + screenX, env.screenHeight/2 - brickN[i][2], brickN[i][3], brickN[i][4]);
			}
		}
	}

	return {
		init : init,
		resize : resize,

		updateTextBlocks : updateTextBlocks,
		updateBgObjects : updateBgObjects,

		collideTestP : collideTestP,
		collideTestN : collideTestN,
		drawBricks : drawBricks
	};
})();
