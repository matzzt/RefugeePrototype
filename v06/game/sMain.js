Crafty.scene("main", function () {		
		var fpsText = Crafty.e("2D,DOM,FPS,Text, HUD")
			.attr({maxValues:10, x: WIDTH - 40, y: HEIGHT - 20, z: 10000, h:10, w:50 })
			.css({"font": "10pt Impact", "color": "white",
					"text-shadow": "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"})	
			.bind("MessureFPS",function(fps){
				this.text("FPS: "+fps.value); //Display Current FPS
				//console.log(this.values); // Display last x Values
		})
		globalMap = generateWorld();
		//create our player entity with some premade components
		PLAYER = Crafty.e("2D, DOM, Collision, Player, player, Fourway, " +
							  "RandomPosition, Camera, Inventory, InventoryDisplay, " +
							  "Weapon, solid, Notifier, Pause")
				.randomPosition(globalMap)
				.fourway(1.5)
				.centerAndFollow()				
				.Weapon()
				.Player();
		
		var playerX = Math.floor(PLAYER.x / TILESIZE);
		var playerY = Math.floor(PLAYER.y / TILESIZE);
		var layer = globalMap[playerX][playerY].length;
		globalMap[playerX][playerY][layer] = PLAYER;
				
		var recipeFactory = Crafty.e("RecipeFactory");
		
		var woodShop = Crafty.e("2D, DOM, RandomPosition, woodShop, CraftingPlace, solid")
				.randomPositionNear(globalMap, true, PLAYER.x, PLAYER.y, 3)
				.setCraftingName("Wood Saw")
				.addRecipe(recipeFactory.getPlankRecipe())
				.addRecipe(recipeFactory.getStaffRecipe());
				
		var craftTable = Crafty.e("2D, DOM, RandomPosition, craftTable, CraftingPlace, solid")
							.randomPositionNear(globalMap, true, PLAYER.x, PLAYER.y, 5)
							.setCraftingName("Craft Table")
							.addRecipe(recipeFactory.getWoodenSwordRecipe())
							.addRecipe(recipeFactory.getWoodenAxeRecipe());
	});