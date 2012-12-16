Crafty.c("Pause", {
	init: function() {
		this._pauseText; /* = Crafty.e("2D, DOM, HUD, Text")
									.attr({alpha: 0.0,x: WIDTH - 90, y: 10, z: 10000, h:50, w:100 })
									.css({"font": "20pt Impact", "color": "white",
											"text-shadow": "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"})	
									.text("Paused"); */
		this.requires("KeyBoard").bind("KeyDown", function() {
			if (this.isDown("P")) {
				Crafty.pause();
				
				/*if (Crafty.isPaused()) 
						this._pauseText.attr({alpha: 1.0});					
				else
					this._pauseText.attr({alpha: 0.0}); */
			} 
		});
	}
});