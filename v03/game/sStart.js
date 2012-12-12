Crafty.scene("start", function () {

	var bg = Crafty.e("2D, Canvas, Color, Keyboard")
                .attr({w: WIDTH, h: HEIGHT})
                .color("#020");
				
	var refugeeText = Crafty.e("2D, DOM, Text").attr({ w: WIDTH, h: 50})
			.text("Refugee")
			.css({	"font": "50pt Impact", 
					"color": "#FFF", 
					"weight": "bold", 
					"text-align": "center"});	
					
	var controlsText = Crafty.e("2D, DOM, Text").attr({ w: WIDTH, h: 30, y: refugeeText.h + 50})
			.text("Controls")
			.css({	"font": "20pt Arial", 
					"color": "#FFF", 
					"weight": "bold", 
					"text-align": "center"});
	var movementText = Crafty.e("2D, DOM, Text").attr({ w: WIDTH, h: 20, y: controlsText.h + controlsText.y + 10})
			.text("Movement: W,A,S,D or Arrow Keys")
			.css({	"font": "15pt Arial", 
					"color": "#FFF", 
					"weight": "bold", 
					"text-align": "center"});
					
	var attackText = Crafty.e("2D, DOM, Text").attr({ w: WIDTH, h: 20, y: movementText.h + movementText.y + 10})
			.text("Attack: X")
			.css({	"font": "15pt Arial", 
					"color": "#FFF", 
					"weight": "bold", 
					"text-align": "center"});
					
	var startText = Crafty.e("2D, DOM, Text").attr({ w: WIDTH, h: 60,y: HEIGHT - 100 })
			.text("Press any key to start the game!")
			.css({	"font": "30pt Impact", 
					"color": "#FFF", 
					"weight": "bold", 
					"text-align": "center"});
					
	bg.bind("KeyDown", function() {
            Crafty.scene("loading");
        });
});