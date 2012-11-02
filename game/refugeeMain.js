window.onload = (function() {
	var WIDTH = 800;
	var HEIGHT = 640;
    Crafty.init(WIDTH, HEIGHT);
	
	//turn the sprite map into usable components
	Crafty.sprite(16, "game/img/sprite.png", {
		grass1: [0, 0],
		grass2: [1, 0],
		grass3: [2, 0],
		grass4: [3, 0],
		flower: [0, 1],
		bush1: [0, 2],
		bush2: [1, 2],
		player: [0, 3],
		enemy: [0, 3]				
	});
			
	//the loading screen that will display while our assets load
	Crafty.scene("loading", function () {
		//load takes an array of assets and a callback when complete
		Crafty.load(["game/img/sprite.png"], function () {			
			Crafty.scene("main"); //when everything is loaded, run the main scene
		});

		//black background with some loading text
		Crafty.background("#000");
		Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
				.text("Loading")
				.css({ "text-align": "center" });		
	});
	
	function generateWorld() {
		//loop through all tiles
		for (var i = 0; i < 50; i++) {
			for (var j = 0; j < 40; j++) {

				//place grass on all tiles
				grassType = Crafty.math.randomInt(1, 4);
				Crafty.e("2D, DOM, grass" + grassType)
					.attr({ x: i * 16, y: j * 16, z:1 });
				
				//Place flowers
				var random = Crafty.math.randomInt(0, 100);
				if ( i > 2 || j > 2) {
					if (random <= 5) {
						var f = Crafty.e("2D, DOM, flower, SpriteAnimation, explodable")
								.attr({ x: i * 16, y: j * 16, z: 5 })
								.animate("wind", 0, 1, 3)
								.animate('wind', 80, -1)
								.bind('explode', function() {
									this.destroy();
								});
					} else if (random <= 40 && random > 5) {
						var b = Crafty.e("2D, DOM, solid, bush" + Crafty.math.randomInt(1, 2))
									.attr({x: i * 16, y: j * 16, z: 2000})
					}
				}
			}
		}
	};
	
	Crafty.c("LeftControls", {
		init: function() {
			this.requires('Multiway');
		},
		
		leftControls: function(speed) {
			this.multiway(speed, {W: -90, S: 90, D: 0, A: 180})
			return this;
		}
		
	});
	
	Crafty.c('Ape', {
		Ape: function() {
				//setup animations
				this.requires("SpriteAnimation, Collision, Grid")
				.animate("walk_left", 6, 3, 8)
				.animate("walk_right", 9, 3, 11)
				.animate("walk_up", 3, 3, 5)
				.animate("walk_down", 0, 3, 2)
				//change direction when a direction change event is received
				.bind("NewDirection",
					function (direction) {
						if (direction.x < 0) {
							if (!this.isPlaying("walk_left"))
								this.stop().animate("walk_left", 10, -1);
						}
						if (direction.x > 0) {
							if (!this.isPlaying("walk_right"))
								this.stop().animate("walk_right", 10, -1);
						}
						if (direction.y < 0) {
							if (!this.isPlaying("walk_up"))
								this.stop().animate("walk_up", 10, -1);
						}
						if (direction.y > 0) {
							if (!this.isPlaying("walk_down"))
								this.stop().animate("walk_down", 10, -1);
						}
						if(!direction.x && !direction.y) {
							this.stop();
						}
				})
				.bind('Moved', function(from) {
					if(this.hit('solid')){
						this.attr({x: from.x, y:from.y});
					}
					if(this.x === 0 || this.y === 0){
						this.attr({x: from.x, y:from.y});
					}
				});
				
				return this;
		}
	});
	
	
	//MAIN
	Crafty.scene("main", function () {
		generateWorld();
		//create our player entity with some premade components
		var player1 = Crafty.e("2D, DOM, Ape, player, LeftControls")
				.attr({ x: 16, y: 16, z: 10 })
				.leftControls(0.5)
				.Ape();

	});
	
	///START GAME

	//automatically play the loading scene
	Crafty.scene("loading");
});