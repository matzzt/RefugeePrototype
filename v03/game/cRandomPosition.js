Crafty.c('RandomPosition', {
		randomPositionNear: function (map, strict, nearX, nearY, radius) {
			return this.ranPosStrict(map, true, nearX, nearY,  radius)
		},
		randomPosition: function (map) {
			return this.ranPosStrict(map, false);			
		}, 
		ranPosStrict: function (map, strict, nearX, nearY, radius) {
			this.requires("2D");
			
			var foundPos = false;
			var maxIt = 100;
			
			while (!foundPos && maxIt > 0) {
				maxIt--;
				var rX;
				var rY;
				var tilesWidth = WIDTH / TILESIZE - 1;
				var tilesHeight = HEIGHT / TILESIZE - 1;
				if (nearX != undefined && nearY != undefined && radius != undefined && radius > 0) {
					var targetX = Math.floor(nearX/TILESIZE);
					var lowerX = targetX - radius >= 0 ? targetX - radius : 0;
					var upperX = targetX + radius < tilesWidth ? targetX + radius : tilesWidth;
					rX = Crafty.math.randomInt(lowerX, upperX);
					
					targetY = Math.floor(nearY/TILESIZE);
					var lowerY = targetY - radius >= 0 ? targetY - radius : 0;
					var upperY = targetY + radius < tilesHeight ? targetY + radius : tilesHeight;
					rY = Crafty.math.randomInt(lowerY, upperY);
				} else {
					rX = Crafty.math.randomInt(0, WIDTH / TILESIZE - 1);
					rY = Crafty.math.randomInt(0, HEIGHT / TILESIZE - 1);
				}
				
				foundPos = true;
				var eCount = map[rX][rY].length;
				for (var i = 0; i < eCount; i++) {
						var obj = map[rX][rY][i];
						if (obj.has("solid") || ((strict === true) && (eCount > 1))) {
							foundPos = false;							
						}
				}	
				
				if (foundPos) {
					this.attr({ 
								x: rX * TILESIZE,
								y: rY * TILESIZE,
								z: 10
							});
				}
			}
			
			return this;
		} 
	});