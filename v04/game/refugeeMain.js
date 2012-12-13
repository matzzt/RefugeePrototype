var WIDTH = 400;
var HEIGHT = 320;
var MAPWIDTH = 50;
var MAPHEIGHT = 40;
var TILESIZE = 16;

window.onload = (function() {

	// init crafty window
    Crafty.init(WIDTH, HEIGHT);
	
	Crafty.sprite(TILESIZE, "game/img/sprite3.png", {
			grass1: [0, 0],
			grass2: [1, 0],
			grass3: [2, 0],
			grass4: [3, 0],
			flower: [0, 1],
			bush1: [0, 2],
			bush2: [1, 2],
			player: [0, 3],
			tree1 : [0, 4],
			tree2 : [1, 4],
			appleTree : [2, 4],
			woodenLog: [0, 5],
			woodenStick : [1, 5],
			acorn : [2, 5],
			blossom : [3, 5],
			leaf : [4, 5],
			apple : [5, 5],
			woodShop: [0, 6]
		});	
	
	//automatically play the start scene
	Crafty.scene("firstLoad");
});