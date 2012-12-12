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
					obj = Crafty.e("2D, DOM, solid, Destroyable, tree" + Crafty.math.randomInt(1, 2))
							.attr({x: i * TILESIZE, y: j * TILESIZE, z: 2000})
							.setLife(3 * Crafty.math.randomInt(2,4));
				} else if (random <= TREES + FLOWERS) {
					obj = Crafty.e("2D, DOM, flower, SpriteAnimation, Destroyable")
							.attr({ x: i * TILESIZE, y: j * TILESIZE, z: 5 })
							.animate("wind", 0, 1, 3)
							.animate('wind', 80, -1)
							.setLife(1 + Crafty.math.randomInt(0,2));
				} else if (random <= TREES + BUSHES + FLOWERS) {
					obj = Crafty.e("2D, DOM, solid, Destroyable, bush" + Crafty.math.randomInt(1, 2))
								.attr({x: i * TILESIZE, y: j * TILESIZE, z: 2000})
								.setLife(2 * Crafty.math.randomInt(1,4));
				}
				
				if (obj !== null && obj !== undefined) {	
					var layer = map[i][j].length;
					map[i][j][layer] = obj;
				}
								
			}
		}
		
		return map;
	};	