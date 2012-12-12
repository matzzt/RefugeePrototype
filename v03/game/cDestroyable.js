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
		
		var middle = Math.floor(TILESIZE/4);
		var target = randomCoordsCircle(this.x, this.y, damage * 8);
		var dmgNumber = Crafty.e("2D, DOM, Text, Tween")
							.attr({x: this.x + middle, y: this.y + middle, z: 10000 })
							.css({"font": "10pt Impact", "color": "#F00", "weight": "bold"})			
							.text(damage)
							.tween({alpha: 1, x: target.x, y: target.y}, 100);
		dmgNumber.bind("TweenEnd", function() {
			this.destroy();
		});
		
		if (this.healthPoints <= 0)
			this.destroy();
	}
});

function randomCoordsCircle (cx, cy, radius) {  
  var angle = 2*Math.PI*Math.random();
  return {
    x: (radius * Math.cos(angle) + cx),
    y: (radius * Math.sin(angle) + cy)
  }
};