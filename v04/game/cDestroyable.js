Crafty.c("Destroyable", {
	init: function() {		
		this.healthPoints = 1;
	},
	setLife: function(health) {		
		this.healthPoints = health;
		return this;
	},
	inflictDamage: function(damage) {
		this.healthPoints -= damage;
		
		if (this.has("Dropper"))
			this.dropAfterDamage();
		
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
		var target = randomCoordsCircle(this.x, this.y, damage * 8);
		var dmgNumber = Crafty.e("2D, DOM, Text, Tween")
							.attr({x: this.x + offX, y: this.y + offY, z: 10000 })
							.css({"font": "10pt Impact", "color": "#F00", "weight": "bold",
									"text-shadow": "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"})			
							.text(damage)
							.tween({alpha: 1, x: target.x, y: target.y}, 100);
		dmgNumber.bind("TweenEnd", function() {
			this.destroy();
		});
		
		if (this.healthPoints <= 0) {
			if (this.has("Dropper"))
				this.dropAfterDeath();
			this.destroy();
		}
	}
});

