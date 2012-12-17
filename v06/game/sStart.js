Crafty.scene("start", function () {

	var bg = Crafty.e("2D, Canvas, Color, Keyboard")
                .attr({w: WIDTH, h: HEIGHT})
                .color("#000");
				
	var refugeeText = Crafty.e("2D, DOM, SpriteText")
			.attr({ x: 0, y: 70, w: WIDTH, h: 32})
			.registerFont("SyntaxError", 32, "game/fonts/OSDM_Fnt32x32_SyntaxTerror-Copy2.png")
			.align("center")
			.text("Refugee");
			
	var font1 = "Palatino Linotype";
	var size1 = "10pt";
	var size2 = "15pt";
	var padding2 = 3;
	var padding = 0;
	var marginBorder = 170;
	var startSecondColumn = marginBorder + 190;
	var color1 = "gray";
	var color2 = "white";
			
	var byText = Crafty.e("2D, DOM, Text").attr({ w: WIDTH, h: 60,y: 110 })
			.text("by Mats Necker")
			.css({	"font": font1, 
					"color": color1, 
					"weight": "bold",
					"font-style":"italic",
					"text-align": "center"});
	
	
	var controlsText = Crafty.e("2D, DOM, Text")
			.attr({ x: 0, y: 190, w: WIDTH, h: 30})
			.text("Controls")
			.css({	"font": size2 + " " + font1,
					"color": color2, 
					"weight": "bold", 
					"text-align": "center"});
					
	var movementText = Crafty.e("2D, DOM, Text")
			.attr({ x: marginBorder, y: controlsText.h + controlsText.y + padding2, w: WIDTH, h: 20})
			.text("Movement")
			.css({	"font": size1 + " " + font1,
					"color": color1, 
					"text-align": "left"});
	var movementKeyText = Crafty.e("2D, DOM, Text")
			.attr({ x: startSecondColumn, y: controlsText.h + controlsText.y + padding2, w: WIDTH, h: 20})
			.text("W,A,S,D or Arrow Keys")
			.css({	"font": size1 + " " + font1,
					"color": color1, 
					"text-align": "left"});
					
	var attackText = Crafty.e("2D, DOM, Text")
			.attr({x: marginBorder, y: movementText.h + movementText.y + padding, w: WIDTH, h: 20})
			.text("Attack:")
			.css({	"font": size1 + " " + font1, 
					"color": color1, 
					"text-align": "left"});
	var attackKeyText = Crafty.e("2D, DOM, Text")
			.attr({x: startSecondColumn, y: movementText.h + movementText.y + padding, w: WIDTH, h: 20})
			.text("X")
			.css({	"font": size1 + " " + font1, 
					"color": color1, 
					"text-align": "left"});
					
	var invText = Crafty.e("2D, DOM, Text")
			.attr({x: marginBorder, y: attackText.h + attackText.y + padding, w: WIDTH, h: 20})
			.text("Inventory:")
			.css({	"font": size1 + " " + font1, 
					"color": color1, 
					"text-align": "left"});
	var invKeyText = Crafty.e("2D, DOM, Text")
			.attr({x: startSecondColumn, y: attackText.h + attackText.y + padding, w: WIDTH, h: 20})
			.text("C")
			.css({	"font": size1 + " " + font1, 
					"color": color1, 
					"text-align": "left"});
					
	var craftText = Crafty.e("2D, DOM, Text")
			.attr({x: marginBorder, y: invText.h + invText.y + padding, w: WIDTH, h: 20})
			.text("Craft:")
			.css({	"font": size1 + " " + font1, 
					"color": color1, 
					"text-align": "left"});
	var craftKeyText = Crafty.e("2D, DOM, Text")
			.attr({x: startSecondColumn, y: invText.h + invText.y + padding, w: WIDTH, h: 20})
			.text("V")
			.css({	"font": size1 + " " + font1, 
					"color": color1, 
					"text-align": "left"});
					
	var pauseText = Crafty.e("2D, DOM, Text")
			.attr({x: marginBorder, y: craftText.h + craftText.y + padding, w: WIDTH, h: 20})
			.text("Pause:")
			.css({	"font": size1 + " " + font1, 
					"color": color1, 
					"text-align": "left"});
	var pauseKeyText = Crafty.e("2D, DOM, Text")
			.attr({x: startSecondColumn, y: craftText.h + craftText.y + padding, w: WIDTH, h: 20})
			.text("P")
			.css({	"font": size1 + " " + font1, 
					"color": color1, 
					"text-align": "left"});
					
	var startText = Crafty.e("2D, DOM, Text").attr({ w: WIDTH, h: 60,y: HEIGHT - 50 })
			.text("Press any key to start the game!")
			.css({	"font": "10pt Times News Roman", 
					"color": color2, 
					"weight": "bold", 
					"text-align": "center"});
					
	bg.bind("KeyDown", function() {
            Crafty.scene("loading");
        });
});