Crafty.c("Camera",{
		init: function() {
			this.scaleFactor = 1;
		},
		centerAndFollow: function() {
			scroll(this);
			
			this.bind("Moved", function() {
				scroll(this);
			});
			
			return this;
		},
		cameraZoom: function(factor) {
			this.scaleFactor = factor;
			Crafty.viewport.scale(this.scaleFactor);
			return this;
		}
});

function scroll(that) {
	
	var scrollX = -(that.x + (that.w / 2) - (Crafty.viewport.width / 2));	
	if (scrollX < 0 && scrollX > -1 * (MAPWIDTH * TILESIZE - WIDTH)) {
		//Crafty.viewport.x = scrollX;
		Crafty.viewport.scroll('_x', scrollX );	
	}
	
	var scrollY = -(that.y + (that.h / 2) - (Crafty.viewport.height / 2));
	if (scrollY < 0 && scrollY > -1 * (MAPHEIGHT  * TILESIZE - HEIGHT)) {
		//console.log(scrollY);
		//Crafty.viewport.y = scrollY;
		Crafty.viewport.scroll('_y', scrollY);
	}
	
}