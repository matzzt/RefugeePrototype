Crafty.c("LootObject", {
	init: function() {
		this.lootName;
		this.lootSprite;
		this.lootQuantity;
		this.lootDescription;
	},
	setLootValues: function(name, sprite, quantity, description) {
		this.lootName = name;
		this.lootSprite = sprite;
		this.lootQuantity = quantity;
		this.lootDescription = description;
		
		return this;
	}
});