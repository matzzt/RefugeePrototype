Crafty.c("Camera",{
		centerAndFollow: function() {
			scroll(this);
			
			this.bind("Moved", function() {
				scroll(this);
			});
			
			return this;
		}
});

function scroll(that) {
	var scrollX = -(that.x + (that.w / 2) - (Crafty.viewport.width / 2));	
	if (scrollX < 0 && scrollX > -(MAPWIDTH / 2 * TILESIZE))
		Crafty.viewport.scroll('_x', scrollX );
	
	var scrollY = -(that.y + (that.h / 2) - (Crafty.viewport.height / 2) );
	if (scrollY < 0 && scrollY > -(MAPHEIGHT / 2 * TILESIZE))
		Crafty.viewport.scroll('_y', scrollY);
}