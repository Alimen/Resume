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
		["#contact", 3300, false],
		["#jump", 3610, false],
		["#work0", 4300, false],
		["#work1", 5730, false],
		["#school0", 7500, false],
		["#school1", 8000, false]
	];
	var textBlocksN = [
		["#game0", 3880, false],
		["#game1", 4400, false],
		["#game2", 5230, false],
		["#game3", 5730, false],
		["#game4", 6240, false],
		["#game5", 7300, false],
		["#game6", 7880, false]
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
		["logo", 2980, -90, 256, 297],
		["ins", 2950, 360, 320, 320],
		["mountPL", 3500, 1024, 1024, 1024],
		["mountNL", 3500, 0, 1024, 1024],
		["mountPS", 3430, 256, 256, 256],
		["mountNS", 3430, 0, 256, 256],
		["mountPL", 5000, 1024, 1024, 1024],
		["mountNL", 5000, 0, 1024, 1024],
		["mountPL", 5300, 1024, 1024, 1024],
		["mountNL", 5300, 0, 1024, 1024],
		["mountPS", 5200, 256, 256, 256],
		["mountNS", 5200, 0, 256, 256],
		["mountPS", 6190, 256, 256, 256],
		["mountNS", 6190, 0, 256, 256],
		["mountPS", 7250, 256, 256, 256],
		["mountNS", 7250, 0, 256, 256],
		["mountPS", 7750, 256, 256, 256],
		["mountNS", 7750, 0, 256, 256],
		["mountPL", 7900, 1024, 1024, 1024],
		["mountNL", 7900, 0, 1024, 1024],
		["mountPL", 8700, 1024, 1024, 1024],
		["mountNL", 8700, 0, 1024, 1024],
		["mountPS", 8600, 256, 256, 256],
		["mountNS", 8600, 0, 256, 256],
		["mountPS", 8800, 256, 256, 256],
		["mountNS", 8800, 0, 256, 256],
		["flagP", 9800, 420, 70, 400],
		["flagN", 9800, -20, 70, 400]
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
		[true, true, 3600, 100, 420, 100],			// level 1
		[true, true, 3930, 200, 90, 100],
		[true, true, 4900, 130, 50, 130],			// level 2
		[true, true, 5130, 130, 50, 130],
		[true, true, 6400, 130, 840, 30],			// level 3
		[true, true, 6750, 100, 130, 100],
		[true, true, 6750, 230, 230, 30],
		[true, true, 6750, 1230, 30, 1000],
		[true, true, 7080, 330, 30, 200],
		[true, true, 6880, 360, 230, 30],
		[true, true, 7110, 200, 130, 70],
		[true, true, 8250, 100, 80, 100],			// level 4
		[true, true, 8490, 250, 80, 100],
		[true, true, 8740, 300, 80, 100],
		[true, true, 8960, 350, 80, 100],
		[true, true, 9180, 400, 80, 400],
		[true, true, 9810, 70, 50, 70],

		// Negative bricks
		[false, false, -500, 100, 12000, 100],		// floor
		[false, true, 320, 0, 80, 400],				// repeated level 4
		[false, true, 100, -250, 80, 100],
		[false, true, 950, 0, 50, 70],
		[false, true, 3680, 0, 80, 110],			// level 1
		[false, true, 4950, -70, 192, 30],			// level 2
		[false, true, 5078, -100, 64, 1024],
		[false, true, 6750, 0, 100, 100],			// level 3
		[false, true, 6850, -210, 260, 30],
		[false, true, 6850, 0, 30, 210],
		[false, true, 6990, -75, 250, 30],
		[false, true, 7210, -105, 30, 1000],
		[false, true, 8350, 0, 80, 100],			// level 4
		[false, true, 8550, -150, 80, 100],
		[false, true, 8740, -200, 80, 100],
		[false, true, 8960, -250, 80, 100],
		[false, true, 9180, 0, 80, 400],
		[false, true, 9810, 0, 50, 70]
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

