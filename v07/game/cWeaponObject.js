Crafty.c("WeaponObject", {
	init: function() {
		this._minWeaponDmg = 0;
		this._maxWeaponDmg = 0;
		this._weaponCoolDown = 0;
		this._type;
	},
	setWeaponValues: function(min, max, cd, type) {
		this._minWeaponDmg = min;
		this._maxWeaponDmg = max;
		this._weaponCoolDown = cd;
		this._type = type;
		
		return this;
	}
});