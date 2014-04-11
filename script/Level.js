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
		["#work0", 1600, false],
		["#work1", 3030, false],
		["#school0", 4800, false],
		["#school1", 5300, false]
	];
	var textBlocksN = [
		["#game0", 1180, false],
		["#game1", 1700, false],
		["#game2", 2530, false],
		["#game3", 3030, false],
		["#game4", 3540, false],
		["#game5", 4600, false],
		["#game6", 5180, false]
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
		["logo", 500, -80, 256, 297],
		["ins", 500, 377, 256, 297],
		["mountPL", 800, 1024, 1024, 1024],
		["mountNL", 800, 0, 1024, 1024],
		["mountPS", 730, 256, 256, 256],
		["mountNS", 730, 0, 256, 256],
		["mountPL", 2300, 1024, 1024, 1024],
		["mountNL", 2300, 0, 1024, 1024],
		["mountPL", 2600, 1024, 1024, 1024],
		["mountNL", 2600, 0, 1024, 1024],
		["mountPS", 2500, 256, 256, 256],
		["mountNS", 2500, 0, 256, 256],
		["mountPS", 3490, 256, 256, 256],
		["mountNS", 3490, 0, 256, 256],
		["mountPS", 4450, 256, 256, 256],
		["mountNS", 4450, 0, 256, 256],
		["mountPS", 4950, 256, 256, 256],
		["mountNS", 4950, 0, 256, 256],
		["mountPL", 5100, 1024, 1024, 1024],
		["mountNL", 5100, 0, 1024, 1024],
		["mountPS", 5800, 256, 256, 256],
		["mountNS", 5800, 0, 256, 256],
		["mountPS", 6000, 256, 256, 256],
		["mountNS", 6000, 0, 256, 256],
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

	// Foreground object parameters (isPositive, visible, x, y, width, height)
	var bricks = [
		// Positive bricks
		//[true, true, -512, 1024, 512, 1024],	// left bound
		[true, false, -500, 0, 11000, 100],			// floor
		[true, true, 900, 100, 420, 100],
		[true, true, 1230, 200, 90, 100],
		[true, true, 2200, 130, 50, 130],
		[true, true, 2430, 130, 50, 130],
		[true, true, 3700, 130, 840, 30],
		[true, true, 4050, 100, 130, 100],
		[true, true, 4050, 230, 230, 30],
		[true, true, 4050, 1230, 30, 1000],
		[true, true, 4380, 330, 30, 200],
		[true, true, 4180, 360, 230, 30],
		[true, true, 4410, 200, 130, 70],
		[true, true, 5550, 100, 80, 100],
		[true, true, 5790, 250, 80, 100],
		[true, true, 6040, 300, 80, 100],
		[true, true, 6260, 350, 80, 100],
		[true, true, 6480, 400, 80, 100],

		// Negative bricks
		//[false, true, -512, 0, 512, 1024],		// left bound
		[false, false, -500, 100, 11000, 100],		// floor
		[false, true, 980, 0, 80, 110],
		[false, true, 2250, -70, 192, 30],
		[false, true, 2378, -100, 64, 1024],
		[false, true, 4050, 0, 100, 100],
		[false, true, 4150, -210, 260, 30],
		[false, true, 4150, 0, 30, 210],
		[false, true, 4290, -75, 250, 30],
		[false, true, 4510, -105, 30, 1000],
		[false, true, 5650, 0, 80, 100],
		[false, true, 5850, -150, 80, 100],
		[false, true, 6040, -200, 80, 100],
		[false, true, 6260, -250, 80, 100],
		[false, true, 6480, -300, 80, 100]
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
