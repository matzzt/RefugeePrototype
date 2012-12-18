Crafty.c("DamageReduction", {
	init: function() {
		this.damageReduction = 0;
		this.penetrationType = "Fists";
	},
	setDamageReduction: function(red) {
		this.damageReduction = red;
		
		return this;
	},
	setPenetrationType: function(pen) {
		this.penetrationType = pen;
		
		return this;
	}
});