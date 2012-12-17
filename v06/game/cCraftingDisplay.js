Crafty.c("CraftingDisplay", {
	init: function() {
		this._craftOpen = false;
		this._craftBackground;
		this._craftBackgroundList;
		this._craftBackgroundDesc;
		this._craftRecipeHeader;
		this._craftDescHeader;
		this._craftCostHeader;
		this._craftCostListBorder;
		this._craftHeader;
		this._craftTip;
		this._recipeRowImages = new Array();
		this._recipeRows = new Array();
		this._recipeCostImages = new Array();
		this._recipeCosts = new Array();
		this._craftDesc;
		this._selectedRecipe = 0;
		this._craftBorder = 10;
		this._craftInnerBorder = 10;
		this._craftKeys;
		this._leftCraftSelecter;
		this._rightCraftSelecter;		
		this.requires('Keyboard, CraftingPlace').bind("KeyDown", function(e) {
			if (this.isDown('C')) {				
				if (this._craftOpen) {
					this.closeCraftingDisplay();
				}
			};
			
			if (this._craftOpen) {
				if (this.isDown("V")) { 
					this.craftStuff(this._selectedRecipe);
					this._drawCostsList();
					this._drawList();
				}
					
				if (this.isDown("W") || this.isDown("UP_ARROW")) {
					if (this._selectedRecipe > 0) {
						this._selectedRecipe--;
						this._drawDescription();
						this._drawCostsList();
						this._drawSelectionMarker();
					}
				};
				
				if (this.isDown("S") || this.isDown("DOWN_ARROW")) {
					if (this._selectedRecipe < (this._craftKeys.length - 1)) {
						this._selectedRecipe++;
						this._drawDescription();
						this._drawCostsList();
						this._drawSelectionMarker();
					}
				}
			};
			
		});
	},
	isCraftOpen: function() {
		return this._craftOpen;
	},
	displayCrafting: function() {
		var startX = Math.abs(Crafty.viewport.x) + this._craftBorder;
		var startY = Math.abs(Crafty.viewport.y) + this._craftBorder;
		this._craftBackground = Crafty.e("2D, DOM")
								.attr({x: startX, y: startY, w: WIDTH - (2 * this._craftBorder), h: HEIGHT - (2 * this._craftBorder), z: 50000})
								.css({	"background-color":"black",
										"border-style":"solid",
										"border-width":"2px",
										"border-color":"gray"});
		
		this._craftHeader = Crafty.e("2D, DOM, SpriteText")
							.attr({x: startX, y: startY + 20, w: WIDTH - (2 * this._craftBorder), h: 32, z: 50005})
							.registerFont("SyntaxError", 32, "game/fonts/OSDM_Fnt32x32_SyntaxTerror-Copy2.png")
							.align("center")
							.text(this._craftingName);
		this._craftKeys = new Array();								
		for (var key in this._recipes)
				this._craftKeys[this._craftKeys.length] = key;
					
		var columnWidth	= Math.floor((WIDTH - 2* this._craftBorder - 3 * this._craftInnerBorder) / 2);
		var listModifier = 80;
		var columnWidthList = columnWidth + listModifier;
		var columnWidthDesc = columnWidth - listModifier;
		if (this._craftKeys.length > 0 ) {		
			
			var borderToHeader = 70;
			this._craftCostHeader = Crafty.e("2D, DOM, SpriteText")
										.attr({	x: startX + this._craftInnerBorder, 
												y: startY + HEIGHT - borderToHeader - (2* this._craftBorder) - (5 * this._craftInnerBorder) - (1 * 16), 
												w: columnWidthList, 
												h: 16, z: 50005})
										.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
										.align("center")
										.text("Costs");	
			
			this._craftRecipeHeader = Crafty.e("2D, DOM, SpriteText")
										.attr({	x: startX + this._craftInnerBorder, 
												y: startY + borderToHeader, 
												w: columnWidthList, 
												h: 16, z: 50005})
										.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
										.align("center")
										.text("Recipes");
			
			this._craftCostListBorder = Crafty.e("2D, DOM")
											.attr({	x: startX + this._craftInnerBorder, 
													y: this._craftCostHeader.y + this._craftCostHeader.h + this._craftInnerBorder, 
													w: columnWidthList, 
													h: (5 * this._craftInnerBorder) + (3* 16),
													z: 50001})
											.css({	"background-color":"black",
													"border-style":"solid",
													"border-width":"2px",
													"border-color":"gray"});
													
			this._craftDescHeader = Crafty.e("2D, DOM, SpriteText")
										.attr({	x: startX + (2 * this._craftInnerBorder) + columnWidthList, 
												y: startY + borderToHeader, 
												w: columnWidthDesc, 
												h: 16, z: 50005})
										.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
										.align("center")
										.text("Description");
										
			this._craftBackgroundList = Crafty.e("2D, DOM")
									.attr({	x: startX + this._craftInnerBorder, 
											y: startY + borderToHeader + 16 + this._craftInnerBorder, 
											w: columnWidthList, 
											h: (this._craftCostHeader.y) - (this._craftRecipeHeader.h + this._craftRecipeHeader.y) - (3 * this._craftInnerBorder), 
											z: 50001})
									.css({	"background-color":"black",
											"border-style":"solid",
											"border-width":"2px",
											"border-color":"gray"});
			this._craftBackgroundDesc = Crafty.e("2D, DOM")
									.attr({	x: startX + (2 * this._craftInnerBorder) + columnWidthList, 
											y: this._craftDescHeader.y + this._craftDescHeader.h + this._craftInnerBorder, 
											w: columnWidthDesc, 
											h: HEIGHT - (2 * this._craftBorder + 2 * this._craftInnerBorder + borderToHeader + 16),
											z: 50001})
									.css({	"background-color":"black",
											"border-style":"solid",
											"border-width":"2px",
											"border-color":"gray"});
											
			this._craftTip = Crafty.e("2D, DOM, SpriteText2")
										.attr({	x: startX + this._craftInnerBorder, 
												y: startY + HEIGHT - borderToHeader - (2* this._craftBorder) - (9 * this._craftInnerBorder) - (1 * 16), 
												w: columnWidthList, 
												h: 16, z: 50006})
										.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
										.align("center")
										.text("Press \"V\" to craft");	
										
			this._drawCostsList();
			
			this._drawDescription();

			this._drawList();
			
			this._drawSelectionMarker();
				
		} else {
			this._craftEmpty = Crafty.e("2D, DOM, SpriteText2")
							.attr({x: startX, y: startY + 200, w: WIDTH - (2 * this._craftBorder), h: 96, z: 50005})
							.registerFont("SyntaxError", 32, "game/fonts/OSDM_Fnt32x32_SyntaxTerror-Copy2.png")
							.align("center")
							.text("No recipes...");
		}
		this._craftOpen = true;
		PLAYER.idle = true;
	},
	_drawSelectionMarker: function() {
			var selected = this._recipeRows[this._selectedRecipe];
			
			if (this._leftCraftSelecter != undefined)
				this._leftCraftSelecter._destroy();				
			this._leftCraftSelecter = Crafty.e("2D, DOM, SpriteText2")
								.attr({x: this._craftBackgroundList.x + 4, y: selected.y, w: 16, h: 16, z: 50010})
								.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
								.align("center")
								.text(">");
			
			if (this._rightCraftSelecter != undefined)
				this._rightCraftSelecter._destroy();
			this._rightCraftSelecter = Crafty.e("2D, DOM, SpriteText2")
								.attr({x: this._craftBackgroundList.x + this._craftBackgroundList.w - 16, y: selected.y, w: 16, h: 16, z: 50010})
								.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
								.align("center")
								.text("<");
	},
	_drawCostsList: function() {	
		for (var rowImage in this._recipeCostImages) {
			this._recipeCostImages[rowImage].destroy();
		}
		this._recipeCostImages = new Array();
		
		for (var row in this._recipeCosts) {
			this._recipeCosts[row]._destroy();
		}
		this._recipeCosts = new Array();
		
		var smallTile = 16;
		var recipe = this._recipes[this._craftKeys[this._selectedRecipe]];
		
		for (var i = 0; i < recipe.costs.length; i++) {	
		
				var costObj = recipe.costs[i];
				var rowY = this._craftCostListBorder.y + ((i+1)*this._craftInnerBorder) + (i * smallTile);
				this._recipeCostImages[i] = Crafty.e("2D, DOM, S" + costObj.sprite)
											.attr({	x: this._craftCostListBorder.x + this._craftInnerBorder,
													y: rowY,  
													w: smallTile, 
													h: smallTile, 
													z: 50005});
													
				var materialCount = 0;
				var playerMaterial = PLAYER.inventory[costObj.name];
				if (playerMaterial != undefined)
					materialCount = playerMaterial.lootQuantity;
				this._recipeCosts[i] = Crafty.e("2D, DOM, SpriteText")
							.attr({	x: this._recipeCostImages[i].x + this._craftInnerBorder + smallTile,
									y: rowY,  
									w: this._craftCostListBorder.w - (2 * this._craftInnerBorder + smallTile), 
									h: smallTile, 
									z: 50005})								
							.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
							.align("Left")								
							.text(costObj.name + " (" + materialCount + "/" + costObj.requiredQuantity + ")");
							
				
		}
	},
	_drawDescription: function() {
		var txt = this._recipes[this._craftKeys[this._selectedRecipe]].description;
		if (this._craftDesc != undefined)
				this._craftDesc._destroy();
		this._craftDesc = Crafty.e("2D, DOM, SpriteText2")
										.attr({	x: this._craftBackgroundDesc.x + this._craftInnerBorder,
												y: this._craftBackgroundDesc.y + this._craftInnerBorder,  
												w: this._craftBackgroundDesc.w - (2 * this._craftInnerBorder), 
												h: this._craftBackgroundDesc.h, 
												z: 50005})
										.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
										.align("center")
										.verticalAlign("center")
										.text(txt);
	},
	_drawList: function() {
		for (var row in this._recipeRows) {
			this._recipeRows[row]._destroy();
		}
		
		this._recipeRows = new Array();
		
		for (var rowImage in this._recipeRowImages) {
			this._recipeRowImages[rowImage].destroy();
		}
		
		this._recipeRowImages = new Array();
		
		var smallTile = 16;
		for (var i = 0; i <this._craftKeys.length; i++) {	
		
				var recipeObj = this._recipes[this._craftKeys[i]];
				var timesPossible = this.possibleCrafts(i);
				var rowY = this._craftBackgroundList.y + ((i+1)*this._craftInnerBorder) + (i * smallTile);
				this._recipeRowImages[i] = Crafty.e("2D, DOM, S" + recipeObj.craftSprite)
											.attr({	x: this._craftBackgroundList.x + 20,
													y: rowY,  
													w: smallTile, 
													h: smallTile, 
													z: 50005});
				this._recipeRows[i] = Crafty.e("2D, DOM, SpriteText")
							.attr({	x: this._recipeRowImages[i].x + this._craftInnerBorder + smallTile,
									y: rowY,  
									w: this._craftBackgroundList.w - (2 * this._craftInnerBorder + smallTile), 
									h: smallTile, 
									z: 50005})								
							.registerFont("SyntaxError16", 16, "game/fonts/OSDM_Fnt16x16_SyntaxTerror-Copy2.png")
							.align("Left")								
							.text(recipeObj.name + " (" + timesPossible + ")");
							
				
		}
	},
	closeCraftingDisplay: function() {
		if (this._craftBackground != undefined)
			this._craftBackground.destroy();
			
		if (this._craftBackgroundList != undefined)
			this._craftBackgroundList.destroy();
		
		if (this._craftBackgroundDesc != undefined)
			this._craftBackgroundDesc.destroy();
			
		if (this._craftHeader != undefined) 
			this._craftHeader._destroy();
			
		if (this._craftRecipeHeader != undefined)
			this._craftRecipeHeader._destroy();			
			
		if (this._craftEmpty != undefined)
			this._craftEmpty._destroy();
			
		if (this._craftTip != undefined)
			this._craftTip._destroy();
			
		for (var row in this._recipeRows) {
			this._recipeRows[row]._destroy();
		}
		this._recipeRows = new Array();
		
		for (var rowImage in this._recipeRowImages) {
			this._recipeRowImages[rowImage].destroy();
		}
		
		if (this._leftCraftSelecter != undefined)
			this._leftCraftSelecter._destroy();

		if (this._rightCraftSelecter != undefined)
			this._rightCraftSelecter._destroy(); 
			
		if (this._craftDesc != undefined)
			this._craftDesc._destroy();
			
		if (this._craftRecipeHeader != undefined)
			this._craftRecipeHeader._destroy();
			
		if (this._craftDescHeader != undefined)
			this._craftDescHeader._destroy();
		
		if (this._craftCostHeader != undefined)
			this._craftCostHeader._destroy();
			
		if (this._craftCostListBorder != undefined)
			this._craftCostListBorder.destroy();
			
		this._recipeRowImages = new Array();
		
		for (var rowImage in this._recipeCostImages) {
			this._recipeCostImages[rowImage].destroy();
		}
		this._recipeCostImages = new Array();
		
		for (var row in this._recipeCosts) {
			this._recipeCosts[row]._destroy();
		}
		this._recipeCosts = new Array();
		
		this._selectedRecipe = 0;
		
		this._craftOpen = false;
		PLAYER.idle = false;
	}
});