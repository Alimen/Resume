var level = (function() {
	var textBlocksP = [
		["#work0", 300, 0],
		["#work1", 800, 0],
		["#school0", 1300, 0],
		["#school1", 1800, 0]
	];
	var textBlocksN = [
		["#game0", 400, 0],
		["#game1", 1000, 0],
		["#game2", 1600, 0],
		["#game3", 2200, 0],
		["#game4", 2800, 0],
		["#game5", 3400, 0],
		["#game6", 4000, 0]
	];

	function updateTextBlocks(screenX, px, nx) {
		// Positive text blocks
		for(var i = 0; i < textBlocksP.length; i++) {
			$(textBlocksP[i][0]).css("marginLeft", (textBlocksP[i][1] + screenX) + "px");

			if(textBlocksP[i][1]-50+screenX < px && px <= textBlocksP[i][1]+500+screenX) {
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

			if(textBlocksN[i][1]-50+screenX < nx && nx <= textBlocksN[i][1]+500+screenX) {
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

	return {
		updateTextBlocks : updateTextBlocks
	};
})();
