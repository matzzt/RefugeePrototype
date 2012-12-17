Crafty.c("Loot", {
	init: function() {
		this.lootObject;
	},
	setLoot: function(loot) {
		this.lootObject = loot;
		return this;
	},
	getLoot: function() {
		return this.lootObject;
	}
});