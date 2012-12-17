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
	getWoodenSwordRecipe: function() {
		var name = "Wooden Sword";
		var description = "A simple wooden sword, not really sharp or durable but it should work better than your fists";
		var costs = new Array();
		costs[0] = new Costs("Plank", "plank", 5);
		var productFunction = function() {
			return Crafty.e("WeaponObject, LootObject")
					.setWeaponValues(2,5,50)
					.setLootValues(name,"woodenSword",1, description);
		}
		return this.createRecipe(name, "woodenSword", description, costs, productFunction);
	},
	getWoodenAxeRecipe: function() {
		var name = "Wooden Axe";
		var description = "A simple wooden axe, looks pretty crappy but if you hit something it sure will be damaged.";
		var costs = new Array();
		costs[0] = new Costs("Plank", "plank", 5);
		costs[1] = new Costs("Staff", "staff", 2);
		var productFunction = function() {
			return Crafty.e("WeaponObject, LootObject")
					.setWeaponValues(4,7,65)
					.setLootValues(name,"woodenAxe",1, description);
		}
		return this.createRecipe(name, "woodenAxe", description, costs, productFunction);
	}
});