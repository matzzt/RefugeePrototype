Crafty.c("CraftingPlace", {
	init: function() {
		this.addComponent("CraftingDisplay");
		this._recipes = new Array();	
		this._craftingName;		
	},
	setCraftingName: function(name) {
		this._craftingName = name;
		return this;
	},
	openCraftingDisplay: function() {
		this.displayCrafting();
	},
	addRecipe: function(recipe) {
		this._recipes[this._recipes.length] = recipe;
		return this;
	},
	craftStuff: function(recipeNo) {
		if (this.checkMaterial(recipeNo)) {
			var product = this._recipes[recipeNo].createProduct();
			PLAYER.addToInventory(product, false);
			Crafty.audio.play("craft", 1, 1.0);
			PLAYER.notify("Crafted " + product.lootName + " (" + product.lootQuantity + ")", true); 
			var recipe = this._recipes[recipeNo];
			for (var i = 0; i < recipe.costs.length; i++) {					
				var recipeCosts = recipe.costs[i];
				PLAYER.takeFromInventory(recipeCosts.name, recipeCosts.requiredQuantity);
			}
		}
	},
	checkMaterial: function(recipeNo) {
		var possible = this.possibleCrafts(recipeNo);
		
		if (possible > 0)
			return true;
		else 
			return false;
	},
	possibleCrafts: function(recipeNo) {
		var recipe = this._recipes[recipeNo];
		if (recipe != undefined) {
			if (PLAYER.has("Inventory")) {
				var inv = PLAYER.inventory;
				
				var materialFor;
				for (var i = 0; i < recipe.costs.length; i++) {					
					var recipeCosts = recipe.costs[i];
					var playerMaterial = inv[recipeCosts.name];
					if (playerMaterial !== undefined) {
						var timesMat = Math.floor(playerMaterial.lootQuantity / recipeCosts.requiredQuantity);
						if (materialFor === undefined || materialFor > timesMat)
						 materialFor = timesMat;
					} else {
						materialFor = 0;
					}
				}
				if (materialFor === undefined)
					return 0
				else
					return materialFor;
			} 
		}
	}
});