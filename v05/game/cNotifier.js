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
	notify: function(text) {
		var length = this.notifierQueue.push(text);
		if (length === 1 && this.notifierCoolDown === 0) {
			this.animateNote(this.notifierQueue.shift());
		};
		
	},
	animateNote: function(text) {
		var notifierStartX = this.x - Math.floor(TILESIZE/2);
		var notifierStartY = this.y - 20;
		Crafty.e("2D, DOM, Text, Tween")
							.attr({x: notifierStartX, y: notifierStartY, z: 10000, w: WIDTH })
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