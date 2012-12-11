//the loading screen that will display while our assets load
Crafty.scene("loading", function () {
	//load takes an array of assets and a callback when complete
	Crafty.load(["game/img/sprite.png"], function () {			
		Crafty.scene("main"); //when everything is loaded, run the main scene
	});

	//black background with some loading text
	Crafty.background("#020");
	/*Crafty.e("2D, DOM, SpriteText")
		.attr({x: 150, y: 120, w: 32 * 7, h: 32, z: 10})
		.registerFont("SyntaxError", 32, "game/fonts/OSDM_Fnt32x32_SyntaxTerror.png")
		.text("Loading");*/
	Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
			.text("Loading")
			.css({ "text-align": "center" });		
});