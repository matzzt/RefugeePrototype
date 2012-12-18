Crafty.c("RecipeFactory" , {
	createRecipe: function(name, sprite, desc, costs, productFunction) {
		return new Recipe(name, sprite, desc, costs, productFunction);
	},
	getPlankRecipe: function() {
		var name = "Plank";
		var description = "Turns two wooden logs in are more useful form.";
		var costs = new Array();
		costs[0] = new Costs("Wooden Log", "woodenLog", 2);
		var productFunction = function() {
			return new Loot(name, "plank", 1, "A wooden plank, useful to build all kind wooden things"); 
		}
		return this.createRecipe(name, "plank", description, costs, productFunction);
	},
	getStaffRecipe: function() {
		var name = "Staff";
		var description = "Processes wooden sticks to become something need to build weapons.";
		var costs = new Array();
		costs[0] = new Costs("Wooden Stick", "woodenStick", 2);
		var productFunction = function() {
			return new Loot(name, "staff", 1, "A wooden staff, some weapons require those."); 
		}
		return this.createRecipe(name, "staff", description, costs, productFunction);
	},
	getBlockRecipe: function() {
		var name = "Stone Block";
		var description = "Processes stone boulder to a more useful form. But takes a lot to do so.";
		var costs = new Array();
		costs[0] = new Costs("Stone Boulder", "stoneBoulder", 4);
		var sprite = "stoneBlock";
		var productFunction = function() {
			return new Loot(name, sprite, 1, "A stone block. Used to create all kind of stone weapons. Also quite heavy."); 
		}
		return this.createRecipe(name, sprite, description, costs, productFunction);
	},
	getWoodenSwordRecipe: function() {
		var name = "Wooden Sword";
		var description = "A simple wooden sword, not really sharp or durable but it should work better than your fists";
		var costs = new Array();
		costs[0] = new Costs("Plank", "plank", 5);
		var productFunction = function() {
			return Crafty.e("WeaponObject, LootObject")
					.setWeaponValues(3, 5,40, "Sword")
					.setLootValues(name,"woodenSword",1, description);
		}
		return this.createRecipe(name, "woodenSword", description, costs, productFunction);
	},
	getWoodenPickRecipe: function() {
		var name = "Wooden Pick";
		var sprite = "woodenPick";
		var description = "A simple wooden pick, you are wondering how wood can damage stone but maybe it's better not to ask.";
		var costs = new Array();
		costs[0] = new Costs("Plank", "plank", 6);
		costs[1] = new Costs("Staff", "staff", 4);
		var productFunction = function() {
			return Crafty.e("WeaponObject, LootObject")
					.setWeaponValues(4,8,65, "Pick")
					.setLootValues(name,sprite,1, description);
		}
		return this.createRecipe(name, sprite, description, costs, productFunction);
	},
	getWoodenAxeRecipe: function() {
		var name = "Wooden Axe";
		var description = "A simple wooden axe, looks pretty crappy but if you hit something it sure will be damaged.";
		var costs = new Array();
		costs[0] = new Costs("Plank", "plank", 5);
		costs[1] = new Costs("Staff", "staff", 2);
		var productFunction = function() {
			return Crafty.e("WeaponObject, LootObject")
					.setWeaponValues(4,8,55, "Axe")
					.setLootValues(name,"woodenAxe",1, description);
		}
		return this.createRecipe(name, "woodenAxe", description, costs, productFunction);
	},
	getStoneSwordRecipe: function() {
		var name = "Stone Sword";
		var sprite = "stoneSword";
		var description = "A mediocre stone sword, this one actually looks like it could hurt somebody.";
		var costs = new Array();
		costs[0] = new Costs("Stone Block", "stoneBlock", 4);
		costs[1] = new Costs("Plank", "plank", 2);
		costs[1] = new Costs("Staff", "staff", 1);
		var productFunction = function() {
			return Crafty.e("WeaponObject, LootObject")
					.setWeaponValues(7,14,45, "Sword")
					.setLootValues(name,sprite,1, description);
		}
		return this.createRecipe(name, sprite, description, costs, productFunction);
	},
	getStonePickRecipe: function() {
		var name = "Stone Pick";
		var sprite = "stonePick";
		var description = "A stone pick. Fight stone with stone!";
		var costs = new Array();
		costs[0] = new Costs("Stone Block", "stoneBlock", 3);
		costs[1] = new Costs("Plank", "plank", 3);
		costs[2] = new Costs("Staff", "staff", 2);
		var productFunction = function() {
			return Crafty.e("WeaponObject, LootObject")
					.setWeaponValues(8,12,70, "Pick")
					.setLootValues(name,sprite,1, description);
		}
		return this.createRecipe(name, sprite, description, costs, productFunction);
	},
	getStoneAxeRecipe: function() {
		var name = "Stone Axe";
		var sprite = "stoneAxe";
		var description = "A simple stone axe. This one looks badass, finally a nice weapon.";
		var costs = new Array();
		costs[0] = new Costs("Stone Block", "stoneBlock", 6);
		costs[1] = new Costs("Plank", "plank", 1);
		costs[2] = new Costs("Staff", "staff", 2);
		var productFunction = function() {
			return Crafty.e("WeaponObject, LootObject")
					.setWeaponValues(10,17,65, "Axe")
					.setLootValues(name,sprite,1, description);
		}
		return this.createRecipe(name,sprite, description, costs, productFunction);
	}
});