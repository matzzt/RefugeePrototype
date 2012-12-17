Crafty.c("InventoryDisplay" , {
	init: function() {		
		this._invOpen = false;
		this._inv;
		this._invBackground;
		this._invBackgroundList;
		this._invBackgroundDesc;
		this._invHeader;
		this._invRowImages = new Array();
		this._invRows = new Array();
		this._invDesc;
		this._selectedLoot = 0;
		this._invBorder = 25;
		this._invInnerBorder = 10;
		this._leftSelecter;
		this._rightSelecter;
		this.requires('Keyboard, Inventory').bind("KeyDown", function() {
			if (!PLAYER.idle) {
				if (this.isDown('C')) {				
					if (this._invOpen)
						this.closeInventoryDisplay()
					else
						this.displayInventory(this.inventory);
				};
				
				if (this._invOpen) {
				
					if (this.isDown('X')) {	
						var currentObj = this._inv[this._invKeys[this._selectedLoot]];
						if (currentObj.has("WeaponObject")) {
							this.setWeapon(currentObj);
							this.takeFromInventory(currentObj.lootName, 1);
							/*this._drawList();
							this._drawDescription();
							this._drawSelectionMarker(); */
							this.closeInventoryDisplay();
							this.notify("Equipped " + currentObj.lootName, false);
						}
					};
					
					if (this.isDown("W") || this.isDown("UP_ARROW")) {
						if (this._selectedLoot > 0) {
							this._selectedLoot--;
							this._drawDescription();
							this._drawSelectionMarker();
						}
					};
					
					if (this.isDown("S") || this.isDown("DOWN_ARROW")) {
						if (this._selectedLoot < (this._invKeys.length - 1)) {
							this._selectedLoot++;
							this._drawDescription();
							this._drawSelectionMarker();
						}
					}
				};
			};
		});
	},
	isInvOpen: function() {
		return this._invOpen;
	},
	displayInventory: function(inv) {	
		this._inv = inv;
		var startX = Math.abs(Crafty.viewport.x) + this._invBorder;
		var startY = Math.abs(Crafty.viewport.y) + this._invBorder;
		this._invBackground = Crafty.e("2D, DOM")
								.attr({x: startX, y: startY, w: WIDTH - (2 * this._invBorder), h: HEIGHT - (2 * this._invBorder), z: 50000})
								.css({	"background-color":"black",
										"border-style":"solid",
										"border-width":"2px",
										"border-color":"gray"});
		
		this._invHeader = Crafty.e("2D, DOM, SpriteText")
							.attr({x: startX, y: startY + 20, w: WIDTH - (2 * this._invBorder), h: 32, z: 50005})
							.registerFont("SyntaxError", 32, "game/fonts/OSDM_Fnt32x32_SyntaxTerror-Copy2.png")
							.align("center")
							.text("Inventory");
		this._invKeys = new Array();								
		for (var key in this._inv)
				this._invKeys[this._invKeys.length] = key;
					
		var columnWidth	= Math.floor((WIDTH - 2* this._invBorder - 3 * this._invInnerBorder) / 2);
		var listModifier = 50;
		var columnWidthList = columnWidth + listModifier;
		var columnWidthDesc = columnWidth - listModifier;
		if (this._invKeys.length > 0 ) {		
			
			var borderToHeader = 70;
			this._invBackgroundList = Crafty.e("2D, DOM")
									.attr({	x: startX + this._invInnerBorder, 
											y: startY + borderToHeader, 
											w: columnWidthList, 
											h: HEIGHT - (2 * this._invBorder + this._invInnerBorder + borderToHeader), 
											z: 50001})
									.css({	"background-color":"black",
											"border-style":"solid",
											"border-width":"2px",
											"border-color":"gray"});
			this._invBackgroundDesc = Crafty.e("2D, DOM")
									.attr({	x: startX + (2 * this._invInnerBorder) + columnWidthList, 
											y: startY + borderToHeader, 
											w: columnWidthDesc, 
											h: HEIGHT - (2 * this._invBorder + this._invInnerBorder + borderToHeader),
											z: 50001})
									.css({	"background-color":"black",
											"border-style":"solid",
											"border-width":"2px",
											"border-color":"gray"});
										
			this._drawDescription();

			this._drawList();
			
			this._drawSelectionMarker();
				
		} else {
			this._invEmpty = Crafty.e("2D, DOM, SpriteText2")
							.attr({x: startX, y: startY + 200, w: WIDTH - (2 * this._invBorder), h: 96, z: 50005})
							.registerFont("SyntaxError", 32, "game/fonts/OSDM_Fnt32x32_SyntaxTerror-Copy2.png")
							.align("center")
							.text("Is Empty...");
		}
		this._invOpen = true;
	},
	_drawSelectionMarker: function() {
			
			var selected = this._invRows[this._selectedLoot];
			
			if (this._leftSelecter != undefined)
				this._leftSelecter._destroy();				
			this._leftSelecter = Crafty.e("2D, DOM, SpriteText2")
								.attr({x: this._invBackgroundList.x + 4, y: selected.y, w: 16, h: 16, z: 50010})
								.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
								.align("center")
								.text(">");
			
			if (this._rightSelecter != undefined)
				this._rightSelecter._destroy();
			this._rightSelecter = Crafty.e("2D, DOM, SpriteText2")
								.attr({x: this._invBackgroundList.x + this._invBackgroundList.w - 16, y: selected.y, w: 16, h: 16, z: 50010})
								.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
								.align("center")
								.text("<");
	},
	_drawDescription: function() {
		var txt = this._inv[this._invKeys[this._selectedLoot]].lootDescription;
		if (this._invDesc != undefined)
				this._invDesc._destroy();
		this._invDesc = Crafty.e("2D, DOM, SpriteText2")
										.attr({	x: this._invBackgroundDesc.x + this._invInnerBorder,
												y: this._invBackgroundDesc.y + this._invInnerBorder,  
												w: this._invBackgroundDesc.w - (2 * this._invInnerBorder), 
												h: this._invBackgroundDesc.h, 
												z: 50005})
										.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
										.align("center")
										.verticalAlign("center")
										.text(txt);
	},
	_drawList: function() {
	for (var row in this._invRows) {
			this._invRows[row]._destroy();
		}
		this._invRows = new Array();
		
		for (var rowImage in this._invRowImages) {
			this._invRowImages[rowImage].destroy();
		}
		this._invRowImages = new Array();
		
		var smallTile = 16;
		for (var i = 0; i <this._invKeys.length; i++) {	
		
				var invObj = this._inv[this._invKeys[i]];
				var rowY = this._invBackgroundList.y + ((i+1)*this._invInnerBorder) + (i * smallTile);
				this._invRowImages[i] = Crafty.e("2D, DOM, S" + invObj.lootSprite)
											.attr({	x: this._invBackgroundList.x + 20,
													y: rowY,  
													w: smallTile, 
													h: smallTile, 
													z: 50005});
				this._invRows[i] = Crafty.e("2D, DOM, SpriteText")
							.attr({	x: this._invRowImages[i].x + this._invInnerBorder + smallTile,
									y: rowY,  
									w: this._invBackgroundList.w - (2 * this._invInnerBorder + smallTile), 
									h: smallTile, 
									z: 50005})								
							.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
							.align("Left")								
							.text(invObj.lootName + " (" + invObj.lootQuantity + ")");
							
				
		}
	},
	closeInventoryDisplay: function() {
		if (this._invBackground != undefined)
			this._invBackground.destroy();
			
		if (this._invBackgroundList != undefined)
			this._invBackgroundList.destroy();
		
		if (this._invBackgroundDesc != undefined)
			this._invBackgroundDesc.destroy();
			
		if (this._invHeader != undefined) 
			this._invHeader._destroy();
			
		if (this._invEmpty != undefined)
			this._invEmpty._destroy();
			
		for (var row in this._invRows) {
			this._invRows[row]._destroy();
		}
		this._invRows = new Array();
		
		for (var rowImage in this._invRowImages) {
			this._invRowImages[rowImage].destroy();
		}
		
		if (this._leftSelecter != undefined)
			this._leftSelecter._destroy();

		if (this._rightSelecter != undefined)
			this._rightSelecter._destroy(); 
			
		if (this._invDesc != undefined)
			this._invDesc._destroy();
			
		this._invRowImages = new Array();
		
		this._selectedLoot = 0;
		
		this._invOpen = false;
	}
});