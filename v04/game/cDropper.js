Crafty.c("Dropper", {
	init: function() {
		this.normalDrops;
		this.damageDrops;
	},
	setNormalDrops: function(drops) {
		this.normalDrops = drops;
		return this;
	},
	getNormalDrops: function() {
		return this.normalDrops;
	},
	setDamageDrops: function(drops) {
		this.damageDrops = drops;
		return this;
	},
	getDamageDrops: function() {
		return this.damageDrops;
	},
	dropAfterDeath: function() {
		if (this.normalDrops != undefined) {
			this.doDrop(this.normalDrops);
		}
	},
	dropAfterDamage: function() {
		if (this.damageDrops != undefined) {
			var rand = Math.random();
			if (rand <= this.damageDrops.probabilty)
				this.doDrop(this.damageDrops);
		}
	},
	doDrop: function(drop) {
		var countDrops = Crafty.math.randomInt(drop.lowDrop, drop.maxDrop);
		var lastAngle;
		
		var middle = Math.floor(TILESIZE/2);
		var offX = 0;
		var offY = 0;
		
		switch (this.playerDirection) {	
			case "left"	: { 
							offX = middle;
							offY = -middle;
							break;
						  };
			case "right": { 
							offX = -middle;
							offY = middle;
							break;
						  };
			case "up"	: { 
							offX = middle;
							offY = -middle;
							break;
						  };
			case "down" : { 
							offX = middle;
							offY = middle;
							break;
						  };
		}
		
		for (var i = 0; i < countDrops; i++) {
			
			var target = randomCoordsCircle(this.x, this.y, 8, lastAngle);
			lastAngle = target;
			Crafty.e("2D, Tween, DOM, Loot, "+ drop.sprite)
				.attr({x: this.x + offX, y: this.y + offY, z: 9})
				.setLoot(new Loot(drop.name, drop.sprite, 1))
				.tween({x: target.x, y: target.y}, 15);
		}
	}
});