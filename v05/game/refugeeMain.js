var WIDTH = 600;
var HEIGHT = 480;
var MAPWIDTH = 25;
var MAPHEIGHT = 20;
var TILESIZE = 48;
var PLAYERDIRECTION = "down";

window.onload = (function() {

	var smallSprite = "game/img/sprite4_16.png";
	var smallSpriteSize = 16;
	var bigSprite = "game/img/sprite4_48.png";
	var bigSpriteSize = 48;	

	// init crafty window
    Crafty.init(WIDTH, HEIGHT);
	
	Crafty.sprite(bigSpriteSize, bigSprite, {
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
			woodShop: [0, 6],
			swoosh: [0, 7]
		});	
	
	Crafty.sprite(smallSpriteSize, smallSprite, {
			Sgrass1: [0, 0],
			Sgrass2: [1, 0],
			Sgrass3: [2, 0],
			Sgrass4: [3, 0],
			Sflower: [0, 1],
			Sbush1: [0, 2],
			Sbush2: [1, 2],
			Splayer: [0, 3],
			Stree1 : [0, 4],
			Stree2 : [1, 4],
			SappleTree : [2, 4],
			SwoodenLog: [0, 5],
			SwoodenStick : [1, 5],
			Sacorn : [2, 5],
			Sblossom : [3, 5],
			Sleaf : [4, 5],
			Sapple : [5, 5],
			SwoodShop: [0, 6],
			Sswoosh: [0, 7]
		});
	Crafty.load([bigSprite, smallSprite], function () {
		//automatically play the start scene
		Crafty.scene("firstLoad");
	});	
});