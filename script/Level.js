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
