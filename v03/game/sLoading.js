//the loading screen that will display while our assets load
Crafty.scene("loading", function () {
	var FONT = "SyntaxError";
	//load takes an array of assets and a callback when complete
	Crafty.load(["game/img/sprite.png", "game/fonts/OSDM_Fnt32x32_SyntaxTerror-Copy2.png"], function () {			
		Crafty.scene("main"); //when everything is loaded, run the main scene
	});

	//black background with some loading text
	Crafty.background("#020");
	Crafty.e("2D, DOM, Text").attr({ w: WIDTH, h: HEIGHT})
			.text("Loading")
			.css({	"font": "30pt Impact", 
					"color": "#FFF", 
					"weight": "bold", 
					"text-align": "center",
					"line-height": HEIGHT + "px"});	
});