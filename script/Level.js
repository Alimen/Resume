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
		["#work0", 2800, false],
		["#work1", 4230, false],
		["#school0", 6000, false],
		["#school1", 6500, false]
	];
	var textBlocksN = [
		["#game0", 2380, false],
		["#game1", 2900, false],
		["#game2", 3730, false],
		["#game3", 4230, false],
		["#game4", 4740, false],
		["#game5", 5800, false],
		["#game6", 6380, false]
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
		["logo", 1700, -80, 256, 297],
		["ins", 1700, 377, 256, 297],
		["mountPL", 2000, 1024, 1024, 1024],
		["mountNL", 2000, 0, 1024, 1024],
		["mountPS", 1930, 256, 256, 256],
		["mountNS", 1930, 0, 256, 256],
		["mountPL", 3500, 1024, 1024, 1024],
		["mountNL", 3500, 0, 1024, 1024],
		["mountPL", 3800, 1024, 1024, 1024],
		["mountNL", 3800, 0, 1024, 1024],
		["mountPS", 3700, 256, 256, 256],
		["mountNS", 3700, 0, 256, 256],
		["mountPS", 4690, 256, 256, 256],
		["mountNS", 4690, 0, 256, 256],
		["mountPS", 5650, 256, 256, 256],
		["mountNS", 5650, 0, 256, 256],
		["mountPS", 6150, 256, 256, 256],
		["mountNS", 6150, 0, 256, 256],
		["mountPL", 6300, 1024, 1024, 1024],
		["mountNL", 6300, 0, 1024, 1024],
		["mountPL", 7200, 1024, 1024, 1024],
		["mountNL", 7200, 0, 1024, 1024],
		["mountPS", 7000, 256, 256, 256],
		["mountNS", 7000, 0, 256, 256],
		["mountPS", 7200, 256, 256, 256],
		["mountNS", 7200, 0, 256, 256],
		["flagP", 8300, 420, 70, 400],
		["flagN", 8300, -20, 70, 400]
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
		[true, false, -500, 0, 11000, 100],			// floor
		[true, true, 2100, 100, 420, 100],
		[true, true, 2430, 200, 90, 100],
		[true, true, 3400, 130, 50, 130],
		[true, true, 3630, 130, 50, 130],
		[true, true, 4900, 130, 840, 30],
		[true, true, 5250, 100, 130, 100],
		[true, true, 5250, 230, 230, 30],
		[true, true, 5250, 1230, 30, 1000],
		[true, true, 5580, 330, 30, 200],
		[true, true, 5380, 360, 230, 30],
		[true, true, 5610, 200, 130, 70],
		[true, true, 6750, 100, 80, 100],
		[true, true, 6990, 250, 80, 100],
		[true, true, 7240, 300, 80, 100],
		[true, true, 7460, 350, 80, 100],
		[true, true, 7680, 400, 80, 400],
		[true, true, 8310, 70, 50, 70],

		// Negative bricks
		[false, false, -500, 100, 11000, 100],		// floor
		[false, true, 2180, 0, 80, 110],
		[false, true, 3450, -70, 192, 30],
		[false, true, 3578, -100, 64, 1024],
		[false, true, 5250, 0, 100, 100],
		[false, true, 5350, -210, 260, 30],
		[false, true, 5350, 0, 30, 210],
		[false, true, 5490, -75, 250, 30],
		[false, true, 5710, -105, 30, 1000],
		[false, true, 6850, 0, 80, 100],
		[false, true, 7050, -150, 80, 100],
		[false, true, 7240, -200, 80, 100],
		[false, true, 7460, -250, 80, 100],
		[false, true, 7680, 0, 80, 400],
		[false, true, 8310, 0, 50, 70]
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
