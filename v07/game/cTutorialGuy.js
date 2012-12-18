Crafty.c("TutorialGuy", {
	init: function() {
		this.tutOpen;
		this._tutBackground;
		this._tutBorder = 25;
		this._tutInnerBorder = 15;
		this._tutHeader;
		this._tutTip;
		this._tutNote;
		this._tutObjects = new Array();
		this._tutImages = new Array();
		this.tutorialStage = -1;
		this.requires('Keyboard').bind("KeyDown", function() {
			if (this.isDown("C")) {
				if (this.tutOpen) {
					this.closeDialog();					
					}
			}
			});
			
		if (this.tutorialStage === -1) {
				var middle = Math.floor(TILESIZE/2);
				this._tutNote = Crafty.e("2D, DOM, Text, Tween")
									.attr({x: this.x + middle, y: this.y + middle, w: 100, z: 10000})
									.css({"font": "15pt Impact", "color": "#FFF", "weight": "bold",
											"text-shadow": "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black"})			
									.text("Hey there! Press \"X\" to talk to me!");
		}
	},
	openDialog: function() {
		if (this.tutorialStage === -1) {
			this.tutorialStage = 0;
			if (this._tutNote != undefined)
					this._tutNote.destroy();
		}
			
		var startX = Math.abs(Crafty.viewport.x) + this._tutBorder;
		var startY = Math.abs(Crafty.viewport.y) + this._tutBorder;
		this._tutBackground = Crafty.e("2D, DOM")
								.attr({x: startX, y: startY, w: WIDTH - (2 * this._tutBorder), h: HEIGHT - (2 * this._tutBorder), z: 50000})
								.css({	"background-color":"black",
										"border-style":"solid",
										"border-width":"2px",
										"border-color":"gray"});
										
		this._tutHeader = Crafty.e("2D, DOM, SpriteText")
							.attr({x: startX, y: startY + 20, w: WIDTH - (2 * this._tutBorder), h: 32, z: 50005})
							.registerFont("SyntaxError", 32, "game/fonts/OSDM_Fnt32x32_SyntaxTerror-Copy2.png")
							.align("center")
							.text("Mysterious Guy");
							
		this._tutTip = Crafty.e("2D, DOM, SpriteText")
							.attr({	x: startX,
									y: this._tutBackground .y + this._tutBackground.h - this._tutInnerBorder - 16, 
									w: WIDTH - (2 * this._tutBorder),
									h: 16, 
									z: 50005})
							.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
							.align("center")
							.text("Press \"C\" to close window");
		
		var borderToHeader = 20;
		
		switch (this.tutorialStage) {
			case 0: {
						this._tutObjects[0] = Crafty.e("2D, DOM, SpriteText2")
												.attr({	x: startX + this._tutInnerBorder,
														y: startY + borderToHeader ,  
														w: WIDTH - (2* this._tutBorder) - (2* this._tutInnerBorder), 
														h: HEIGHT - (2* this._tutBorder) - borderToHeader, 
														z: 50005})
												.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
												.align("center")
												.verticalAlign("center")
												.text("Hello there, you look confused, are you maybe in need for some help? I lived in these forest for a long time, I know them and their secrets. I would advise you to start collecting wood from the trees. Use \"X\" to attack them and run over the wood they drop to collect it. Then come back here for your next lesson.");
						break;
					}
		}
		
		this.tutOpen = true;
		PLAYER.idle = true;
	},
	closeDialog: function() {
		if (this._tutBackground != undefined)
			this._tutBackground.destroy();
			
		if (this._tutHeader != undefined)
			this._tutHeader._destroy();
			
		if (this._tutTip != undefined)
			this._tutTip._destroy();
			
		for (var obj in this._tutObjects) {
			this._tutObjects[obj]._destroy();
		}
		this._tutObjects = new Array();
		
		for (var obj in this._tutImages) {
			this._tutImages[obj]._destroy();
		}
		this._tutObjects = new Array();
		
		this.tutOpen = false;
		PLAYER.idle = false;
	}
});