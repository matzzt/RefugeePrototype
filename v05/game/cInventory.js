Crafty.c("Inventory", {
	init: function() {
		this.inventory = new Array();
		this.bind("EnterFrame", function() {
			var hitObj = this.hit("Loot");
			if (hitObj != false) {
				for(var i = 0; i < hitObj.length; i++) {
							this.addToInventory(hitObj[i].obj.getLoot());
							hitObj[i].obj.destroy();
				};
			};
		});
	},
	addToInventory: function(loot) {
		if (this.has("Notifier"))
			this.notify("Collected " + loot.lootName + " (" + loot.lootQuantity + ")");
			
		var invValue = this.inventory[loot.lootName];
			
		if (invValue != undefined) {
				invValue.lootQuantity += loot.lootQuantity;
				if (invValue.lootQuantity <= 0)
					this.inventory[loot.lootName] = undefined;
		} else {
			this.inventory[loot.lootName] = loot;
		};
			
		return this;
	},
	inventoryHas: function(name) {
		if (this.inventory[name] != undefined)
			return true
		else
			return false;
	}
});