Crafty.c("Damage" , {
	init: function() {
		this.requires("Collision");
	},
	checkHit: function(damage) {
		var hitObj = this.hit("TutorialGuy");
		if (hitObj != false) {
			for(var i = 0; i < hitObj.length; i++) {
                        hitObj[i].obj.openDialog();
			 }
			return this;
		}
		
		if (!PLAYER.isInvOpen() && !PLAYER.idle) {
			var hitObj = this.hit("CraftingPlace");
			if (hitObj != false) {
				for(var i = 0; i < hitObj.length; i++) {
							hitObj[i].obj.openCraftingDisplay();
				 }
				 return this;
			}
		}
		
		
		var hitObj = this.hit("Destroyable");
		if (hitObj != false) {
			for(var i = 0; i < hitObj.length; i++) {
                        hitObj[i].obj.inflictDamage(damage);
			 }
			return this;
		}
		
		return this;
	}
});