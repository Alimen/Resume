var level = (function() {
	var textBlocks = [
		["#work0", 300],
		["#work1", 700],
		["#school0", 1200],
		["#school1", 1700],
		["#game0", 400],
		["#game1", 900],
		["#game2", 1400],
		["#game3", 1900],
		["#game4", 2400],
		["#game5", 2900],
		["#game6", 3400]
	];

	function updateTextBlocks(screenX) {
		for(var i = 0; i < textBlocks.length; i++) {
			$(textBlocks[i][0]).css("marginLeft", (textBlocks[i][1] + screenX) + "px");
		}
	}

	return {
		updateTextBlocks : updateTextBlocks
	};
})();
