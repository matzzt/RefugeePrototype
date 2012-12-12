Crafty.c("Weapon", {
	init: function() {
		this.coolDown = 20;
		this.cdTimer = 0;
		this.weaponDamageLow = 1;
		this.weaponDamageMax = 2;
		this.isReady = true;
		this.strike = strike;
		this.bind("EnterFrame", function() {			
			if (!this.isReady && (this.cdTimer < this.coolDown) ) 
				this.cdTimer++;
			else {
				this.cdTimer = 0;
				this.isReady = true;
			}
		});
	},
	Weapon: function() {
		this.requires('Keyboard').bind('KeyDown', function () { 
			if (this.isDown('X')) this.strike(); 
		});
		
		return this;
	},
	setDamage: function(dmgLow, dmgMax) {
		this.weaponDamageLow = dmgLow;
		this.weaponDamageMax = dmgMax;
		return this;
	},
	setCoolDown: function(cd) {
		this.coolDown = cd;
		return this;
	}
});

function strike() {
		if (this.isReady) {
			this.isReady = false;
			
			var offsetBig = TILESIZE;
			var offsetSmall = Math.floor(TILESIZE/4);
			var hitBoxX = Math.floor(TILESIZE/2);
			var hitBoxY = Math.floor(TILESIZE/2);
			var offX = 0;
			var offY = 0;
			
			switch (this.playerDirection) {	
				case "left"	: { 
								offX = -hitBoxX;
								offY = offsetSmall;
								break;
							  };
				case "right": { 
								offX = offsetBig;
								offY = offsetSmall;
								break;
							  };
				case "up"	: { 
								offX = offsetSmall;
								offY = -hitBoxY;
								break;
							  };
				case "down" : { 
								offX = offsetSmall;
								offY = offsetBig;
								break;
							  };
			}
			
			var dmgDone = Crafty.math.randomInt(this.weaponDamageLow, this.weaponDamageMax);
			var attackAnimation = Crafty.e("2D, Tween, DOM, Collision, Damage, Color, ")
				.attr({alpha: 1.0, x: this.x + offX, y: this.y + offY, w: hitBoxX, h: hitBoxY, z : 5000})	
				.tween({alpha: 0.0}, 10)
				.checkHit(dmgDone)
				.bind("TweenEnd", function() { this.destroy() });			
				
		}
};