Crafty.scene("main", function () {
		globalMap = generateWorld();
		//create our player entity with some premade components
		var player = Crafty.e("2D, DOM, Collision, Player, player, Fourway, " +
							  "RandomPosition, Camera, Inventory, InventoryDisplay, " +
							  "Weapon, solid, Notifier")
				.randomPosition(globalMap)
				.fourway(1)
				.centerAndFollow(MAPWIDTH, MAPHEIGHT, TILESIZE)
				.Weapon()
				.Player();
		
		var playerX = Math.floor(player.x / TILESIZE);
		var playerY = Math.floor(player.y / TILESIZE);
		var layer = globalMap[playerX][playerY].length;
		globalMap[playerX][playerY][layer] = player;
				
				
		var woodShop = Crafty.e("2D, DOM, RandomPosition, woodShop, solid")
				.randomPositionNear(globalMap, true, player.x, player.y, 3);

	});