function generateWorld() {
		var TREES = 20;
		var BUSHES = 10;
		var FLOWERS = 5;
		
		//init map variable
		var map = new Array();
		
		//loop through all tiles
		for (var i = 0; i < MAPWIDTH; i++) {
			map[i] = new Array();
			for (var j = 0; j < MAPHEIGHT; j++) {
				map[i][j] = new Array();
				
				//place grass on all tiles
				grassType = Crafty.math.randomInt(1, 4);
				var tile = Crafty.e("2D, DOM, grass" + grassType)
							.attr({ x: i * TILESIZE, y: j * TILESIZE, z:1 });				
				
				map[i][j][0]= tile;
				
				//Place stuff
				var random = Crafty.math.randomInt(0, 100);
				
				var obj = null;
				if (random <= TREES) {
					obj = Crafty.e("2D, DOM, solid, tree" + Crafty.math.randomInt(1, 2))
							.attr({x: i * 16, y: j * 16, z: 2000})
				} else if (random <= TREES + BUSHES) {
					obj = Crafty.e("2D, DOM, flower, SpriteAnimation, explodable")
							.attr({ x: i * 16, y: j * 16, z: 5 })
							.animate("wind", 0, 1, 3)
							.animate('wind', 80, -1)
							.bind('explode', function() {
								this.destroy();
							});
				} else if (random <= TREES + BUSHES + FLOWERS) {
					obj = Crafty.e("2D, DOM, solid, bush" + Crafty.math.randomInt(1, 2))
								.attr({x: i * 16, y: j * 16, z: 2000})
				}
				
				if (obj !== null) {	
					var layer = map[i][j].length;
					map[i][j][layer] = obj;
				}
								
			}
		}
		
		return map;
	};	