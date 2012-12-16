Crafty.c("DropFactory", {
	createDrop: function(name, sprite, min, max, desc, prob) {
		return new Drop(name,sprite,min,max,desc,prob);
	},
	getApple: function() {
		var name = "Apple";
		var sprite = "apple";
		var min = 1;
		var max = 2;
		var desc = "A delicious apple, looks tasty. You should eat it when you're feeling hungry.";
		var prob = 0.3;
		return this.createDrop(name,sprite,min,max,desc,prob);
	},
	getWoodenLog: function() { 
		var name = "Wooden Log";
		var sprite = "woodenLog";
		var min = 1;
		var max = 3;
		var desc = "A simple wooden log. Can be processed with the help of a wood saw.";
		var prob = 1;
		return this.createDrop(name,sprite,min,max,desc,prob);
	},
	getAcorn: function() {
		var name = "Acorn";
		var sprite = "acorn";
		var min = 1;
		var max = 1;
		var desc = "An acorn from the local trees. Maybe you can use it to plant a tree somewhere.";
		var prob = 0.2;
		return this.createDrop(name,sprite,min,max,desc,prob);
	},
	getFlower: function() {
		var name = "Flower";
		var sprite = "blossom";
		var min = 1;
		var max = 1;
		var desc = "A beautiful flower just a little bit damaged from you hitting it. You have no idea what you can do with it...but it's beautiful!";
		var prob = 1;
		return this.createDrop(name,sprite,min,max,desc,prob);
	},
	getWoodenStick: function() {
		var name = "Wooden Stick";
		var sprite = "woodenStick";
		var min = 0;
		var max = 3;
		var desc = "A useful wooden stick, there should be plenty opportunities to use this one.";
		var prob = 1;
		return this.createDrop(name,sprite,min,max,desc,prob);
	},
	getLeaf: function() {
		var name = "Leaf";
		var sprite = "leaf";
		var min = 1;
		var max = 1;
		var desc = "A leaf. You have no idea why you picked it up. But well seems that you can carry quite a lot so why not.";
		var prob = 0.5;
		return this.createDrop(name,sprite,min,max,desc,prob);
	}
});