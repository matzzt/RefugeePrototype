Crafty.c("InventoryDisplay" , {
	init: function() {
		this._invOpen = false;
		this._invBackground;
		this._invHeader;
		this._invRowImages = new Array();
		this._invRows = new Array();
		this.requires('Keyboard, Inventory').bind("KeyDown", function() {
			if (this.isDown('C')) {
				if (this._invOpen)
					this.closeInventoryDisplay()
				else
					this.displayInventory(this.inventory);
			};
		});
	},
	displayInventory: function(inv) {
		var border = 25;
		var innerBorder = 10;
		var startX = Math.abs(Crafty.viewport.x) + border;
		var startY = Math.abs(Crafty.viewport.y) + border;
		this._invBackground = Crafty.e("2D, DOM, Color")
								.attr({x: startX, y: startY, w: WIDTH - (2 * border), h: HEIGHT - (2 * border), z: 50000})
								.color("black");
								
		this._invHeader = Crafty.e("2D, DOM, Text")
							.attr({x: startX, y: startY + innerBorder,  w: WIDTH- (2 * border), h: 20, z: 50001})
							.text("Inventory")
							.css({	"font": "20pt Impact", 
									"color": "#FFF", 
									"weight": "bold", 
									"text-align": "center"});
		var keys = new Array();
		for (var key in inv)
			keys[keys.length] = key;
		
		var rowHeight = TILESIZE;
		var rowWidth = Math.floor((WIDTH - (2* border + 2*innerBorder + TILESIZE )) / 2);
		for (var i = 0; i <keys.length; i++) {			
				var invObj = inv[keys[i]];
				var rowY = startY + border + 10 + ((2 + i) * innerBorder) + (i * rowHeight);
				this._invRowImages[i] = Crafty.e("2D, DOM, " + invObj.lootSprite)
											.attr({	x: startX + innerBorder,
													y: rowY,  
													w: TILESIZE, 
													h: TILESIZE, 
													z: 50001});
				this._invRows[i] = Crafty.e("2D, DOM, Text")
							.attr({	x: startX + innerBorder + TILESIZE,
									y: rowY,  
									w: rowWidth, 
									h: rowHeight, 
									z: 50001})
							.text(invObj.lootName + "   (" + invObj.lootQuantity + ")")
							.css({	"font": "10pt Impact", 
									"color": "#FFF",  
									"text-align": "left"});
		}
		this._invOpen = true;
	},
	closeInventoryDisplay: function() {
		if (this._invBackground != undefined)
			this._invBackground.destroy();
			
		if (this._invHeader != undefined)
			this._invHeader.destroy();
			
		for (var row in this._invRows) {
			this._invRows[row].destroy();
		}
		this._invRows = new Array();
		
		for (var rowImage in this._invRowImages) {
			this._invRowImages[rowImage].destroy();
		}
		this._invRowImages = new Array();
		
		this._invOpen = false;
	}
});