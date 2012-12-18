Crafty.c("Destroyable", {
	init: function() {		
		this.healthPoints = 1;
	},
	setLife: function(health) {		
		this.healthPoints = health;
		return this;
	},
	inflictDamage: function(damage) {
		var effectiveDmg;
		if (this.has("DamageReduction")) {
			var weaponType = PLAYER.currentWeaponObj._type;
			if (weaponType !== this.penetrationType) {
				effectiveDmg = damage - this.damageReduction;
				if (effectiveDmg < 0)
					effectiveDmg = 0;
			} else {
				effectiveDmg = damage;
			}
		} else {
			effectiveDmg = damage;
		}
		Crafty.audio.play("hit", 1 , 1.0);
		this.healthPoints -= effectiveDmg;
		
		var dmgEffect = Crafty.e("2D, DOM, Tween, swoosh")
							.attr({x: this.x, y: this.y, z: 10000 , alpha: 0.7})
							.tween({alpha: 0}, 30);
		dmgEffect.bind("TweenEnd", function() {
			this.destroy();
		});
		
		if (this.has("Dropper") && effectiveDmg > 0)
			this.dropAfterDamage();
		
		var middle = Math.floor(TILESIZE/2);
		var offX = middle - 5;
		var offY = middle - 10;
		
		var target = randomCoordsCircle(this.x + offX, this.y + offY, 32 + (effectiveDmg * Math.ceil(damage/4)));
		var dmgNumber = Crafty.e("2D, DOM, Text, Tween")
							.attr({x: this.x + offX, y: this.y + offY, z: 10001 })
							.css({"font": "15pt Impact", "color": "#F00",
									"text-shadow": "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black"})			
							.text(effectiveDmg)
							.tween({alpha: 1, x: target.x, y: target.y}, 75); 
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

