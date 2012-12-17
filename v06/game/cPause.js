Crafty.c("Pause", {
	init: function() {
		this._pauseText; 
		this._pauseBG;
		
		this.requires("KeyBoard").bind("KeyDown", function() {
			if (this.isDown("P")) {			
				
				if (!Crafty.isPaused())  {
						var currX = -1 * Crafty.viewport.x;
						var currY = -1 * Crafty.viewport.y;
						this._pauseBG = Crafty.e("2D, DOM, Color")
										.attr({alpha: 0.5, x: currX , y: currY, z: 10000, h: HEIGHT, w: WIDTH })
										.color("Black"); 	
						this._pauseText = Crafty.e("2D, DOM, Text")
										.attr({x: currX, y: currY, z: 10005, h: HEIGHT, w: WIDTH })
										.css({"font": "20pt Impact", "color": "white",
												"text-shadow": "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
												"line-height":HEIGHT,
												"text-align":"center"})	
										.text("Paused"); 			
				} else {
					if (this._pauseText != undefined)
						this._pauseText.destroy();
					if (this._pauseBG != undefined)
						this._pauseBG.destroy();
				}
				
				Crafty.pause();
			} 
		});
	}
});