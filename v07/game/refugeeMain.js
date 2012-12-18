var WIDTH = 600;
var HEIGHT = 480;
var MAPWIDTH = 25;
var MAPHEIGHT = 20;
var TILESIZE = 48;
var PLAYERDIRECTION = "down";
var PLAYER;

window.onload = (function() {

	var smallSprite = "game/img/sprite6_16.png";
	var smallSpriteSize = 16;
	var middleSprite = "game/img/sprite6_32.png";
	var middleSpriteSize = 32;
	var bigSprite = "game/img/sprite6_48.png";
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
			stoneVein: [3,4],
			ironVein: [4,4],
			woodenLog: [0, 5],
			woodenStick : [1, 5],
			acorn : [2, 5],
			blossom : [3, 5],
			leaf : [4, 5],
			apple : [5, 5],
			stoneBoulder: [6,5],
			woodShop: [0, 6],
			craftTable: [1, 6],
			stoneTable: [2, 6],
			swoosh: [0, 7],
			staff: [0, 8],
			plank: [1, 8],
			stoneBlock: [2, 8],
			woodenSword: [0, 9],
			woodenAxe: [1, 9],
			woodenPick: [2, 9],
			stoneSword: [3, 9],
			stoneAxe: [4,9],
			stonePick: [5,9],
			fists: [6,9],
			wisdomBook: [0, 10],
			oldGuy: [1,10]
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
			SstoneVein: [3,4],
			SironVein: [4,4],
			SwoodenLog: [0, 5],
			SwoodenStick : [1, 5],
			Sacorn : [2, 5],
			Sblossom : [3, 5],
			Sleaf : [4, 5],
			Sapple : [5, 5],
			SstoneBoulder: [6,5],
			SwoodShop: [0, 6],
			ScraftTable: [1, 6],
			SstoneTable: [2, 6],
			Sswoosh: [0, 7],
			Sstaff: [0, 8],
			Splank: [1, 8],
			SstoneBlock: [2, 8],
			SwoodenSword: [0, 9],
			SwoodenAxe: [1, 9],
			SwoodenPick: [2, 9],
			SstoneSword: [3, 9],
			SstoneAxe: [4,9],
			SstonePick: [5,9],
			Sfists: [6,9],
			SwisdomBook: [0, 10],
			SoldGuy: [1,10]
		});
		
	Crafty.sprite(middleSpriteSize, middleSprite, {
			Mgrass1: [0, 0],
			Mgrass2: [1, 0],
			Mgrass3: [2, 0],
			Mgrass4: [3, 0],
			Mflower: [0, 1],
			Mbush1: [0, 2],
			Mbush2: [1, 2],
			Mplayer: [0, 3],
			Mtree1 : [0, 4],
			Mtree2 : [1, 4],
			MappleTree : [2, 4],
			MstoneVein: [3,4],
			MironVein: [4,4],
			MwoodenLog: [0, 5],
			MwoodenStick : [1, 5],
			Macorn : [2, 5],
			Mblossom : [3, 5],
			Mleaf : [4, 5],
			Mapple : [5, 5],
			MstoneBoulder: [6,5],
			MwoodShop: [0, 6],
			McraftTable: [1, 6],
			MstoneTable: [2, 6],
			Mswoosh: [0, 7],
			Mstaff: [0, 8],
			Mplank: [1, 8],
			MstoneBlock: [2, 8],
			MwoodenSword: [0, 9],
			MwoodenAxe: [1, 9],
			MwoodenPick: [2, 9],
			MstoneSword: [3, 9],
			MstoneAxe: [4,9],
			MstonePick: [5,9],
			Mfists: [6,9],
			MwisdomBook: [0, 10],
			MoldGuy: [1,10]
		});
		
	Crafty.load([bigSprite, smallSprite, middleSprite], function () {
		//automatically play the start scene
		addSound("hit");
		addSound("craft");
		addSound("forest");
		addSound("forest2");
		addSound("wind");
		addSound("wind2");
		addSound("yipe");
		
		Crafty.scene("firstLoad");
	});
});

function addSound(name) {
	Crafty.audio.add(name, [
			"game/sounds/" +name + ".mp3",
			"game/sounds/" +name + ".ogg",
			"game/sounds/" +name + ".wav"
			]);
};