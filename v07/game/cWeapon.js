Crafty.c("Weapon", {
	init: function() {
		this.currentWeaponObj = Crafty.e("WeaponObject, LootObject")
								.setWeaponValues(1,2,20, "Fists")
								.setLootValues("Fists", "fists", 1, "Your fists..Not really the best weapons you can think of...");
		this.coolDown = this.currentWeaponObj._weaponCoolDown;
		this.cdTimer = 0;
		this.weaponDamageLow = this.currentWeaponObj._minWeaponDmg;
		this.weaponDamageMax = this.currentWeaponObj._maxWeaponDmg;
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
			if (this.isDown('X') && (!PLAYER.idle) && (!this.isInvOpen())) this.strike(); 
		});
		
		return this;
	},
	setWeapon: function(weapon) {
		this.currentWeaponObj.lootQuantity = 1;
		this.addToInventory(this.currentWeaponObj);
		this.currentWeaponObj = weapon;
		this.coolDown = this.currentWeaponObj._weaponCoolDown;
		this.weaponDamageLow = this.currentWeaponObj._minWeaponDmg;
		this.weaponDamageMax = this.currentWeaponObj._maxWeaponDmg;
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
			
			switch (PLAYERDIRECTION) {	
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
			var attackAnimation = Crafty.e("2D, Tween, DOM, Collision, Damage")
				.attr({alpha: 1.0, x: this.x + offX, y: this.y + offY, w: hitBoxX, h: hitBoxY, z : 5000})	
				.tween({alpha: 0.0}, 10)
				.checkHit(dmgDone)
				.bind("TweenEnd", function() { this.destroy() });			
				
		}
};