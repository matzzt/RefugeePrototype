Crafty.scene("main", function () {
		globalMap = generateWorld();
		//create our player entity with some premade components
		var player = Crafty.e("2D, DOM, Player, player, Fourway, RandomPosition, Camera, Weapon, solid")
				.randomPosition(globalMap)
				.fourway(1)
				.centerAndFollow(MAPWIDTH, MAPHEIGHT, TILESIZE)
				.Weapon()
				.Player();
				//;	
				
				
		var woodShop = Crafty.e("2D, DOM, RandomPosition, woodShop, solid")
				.randomPositionNear(globalMap, true, player.x, player.y, 3);

	});