Crafty.c("WeaponObject", {
	init: function() {
		this._minWeaponDmg = 0;
		this._maxWeaponDmg = 0;
		this._weaponCoolDown = 0;
	},
	setWeaponValues: function(min, max, cd) {
		this._minWeaponDmg = min;
		this._maxWeaponDmg = max;
		this._weaponCoolDown = cd;
		
		return this;
	}
});