Crafty.c("Damage" , {
	init: function() {
		this.requires("Collision");
	},
	checkHit: function(damage) {
		var hitObj = this.hit("Destroyable");
		if (hitObj != false) {
			for(var i = 0; i < hitObj.length; i++) {
                        hitObj[i].obj.inflictDamage(damage);
			 }
		}
		return this;
	}
});