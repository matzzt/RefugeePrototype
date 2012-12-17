Crafty.c("Inventory", {
	init: function() {
		this.inventory = new Array();
		this.bind("Moved", function() {
			var hitObj = this.hit("Loot");
			if (hitObj != false) {
				for(var i = 0; i < hitObj.length; i++) {
							this.addToInventory(hitObj[i].obj.getLoot());
							hitObj[i].obj.destroy();
				};
			};
		});
	},
	takeFromInventory: function(name, quantity) {
		var loot = this.inventory[name];
		if (loot != undefined) {
			loot.lootQuantity -= quantity;
			if (loot.lootQuantity <= 0) {
				//var idx = this.inventory.indexOf(name); // Find the index
				//this.inventory.splice(name, 1);
				delete this.inventory[name];
			}
		}
	},
	addToInventory: function(loot, notify) {
		if (notify === undefined)
			notify = true;
			
		if (this.has("Notifier") && notify)
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