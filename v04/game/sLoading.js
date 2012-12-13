//the loading screen that will display while our assets load
Crafty.scene("loading", function () {
	//load takes an array of assets and a callback when complete
	Crafty.load(["game/img/sprite.png"], function () {			
		Crafty.scene("main"); //when everything is loaded, run the main scene
	});

	//black background with some loading text
	Crafty.background("#000");
		
	Crafty.e("2D, DOM, SpriteText")
		.attr({x: 88, y: 100, w: 32 * 7, h: 32, z: 20})
		.registerFont("SyntaxError", 32, "game/fonts/OSDM_Fnt32x32_SyntaxTerror-Copy2.png")
		.align("center")
		.text("Loading");
		
	var tips = new Array();
	tips[0] = "Tip: Attack trees to get wooden logs";
	tips[1] = "Tip: If something blocks your way destroy it!";
	tips[2] = "\"Beware of the invisible cows!\"";
	tips[3] = "\"It's not a bug, it's a feature!\""
	
	var rand = Crafty.math.randomInt(0, (tips.length - 1));
	
	Crafty.e("2D, DOM, Text")
		.attr({x: 0, y: 150, w: WIDTH})
		.css({  "font": "12pt Times New Roman", 
				"color": "#FFF",
				"text-align": "center",
				"font-style": "italic",
				"text-weigth":"bold"})			
		.text(tips[rand]);
});