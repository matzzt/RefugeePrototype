Crafty.c("Notifier", {
	init: function() {
		this.notifierQueue = new Array();
		this.notifierCoolDown = 0;		
		this.bind("EnterFrame", function() {
			if (this.notifierQueue.length > 0 && this.notifierCoolDown === 0) {
				this.animateNote(this.notifierQueue.shift());
			} else {
				if (this.notifierCoolDown > 0)
					this.notifierCoolDown--;
			}
		});
	},
	notify: function(text, top) {
		var length = this.notifierQueue.push(text);
		if (length === 1 && this.notifierCoolDown === 0) {
			if (top != undefined && top === true)
				this.animateNote(this.notifierQueue.shift(), true);
			else
				this.animateNote(this.notifierQueue.shift(), false);
		};
		
	},
	animateNote: function(text, top) {
		var notifierStartX;
		var notifierStartY;
		var notifierZ;
		if (top) {
			notifierStartX = -1 * Crafty.viewport.x + Math.floor(WIDTH / 2);
			notifierStartY = -1 * Crafty.viewport.y + Math.floor(HEIGHT / 2);
			notifierZ = 100000;
		} else {
			notifierStartX = this.x - Math.floor(TILESIZE/2);
			notifierStartY = this.y - 20;
			notifierZ = 10000;
		}
		Crafty.e("2D, DOM, Text, Tween")
							.attr({x: notifierStartX, y: notifierStartY, z: notifierZ, w: WIDTH })
							.css({"font": "15pt Impact", "color": "#FA0", "weight": "bold",
									"text-shadow": "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black"})			
							.text(text)
							.tween({alpha: 1, x: notifierStartX, y: notifierStartY - 50}, 75)
							.bind("TweenEnd", function() {
								this.destroy();
							});
		this.notifierCoolDown = 25;
	}
});