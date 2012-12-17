Crafty.c('Player', {
		Player: function() {
				PLAYERDIRECTION = "down";
				//setup animations
				this.requires("SpriteAnimation, Collision, Grid")
				.animate("walk_left", 6, 3, 8)
				.animate("walk_right", 9, 3, 11)
				.animate("walk_up", 3, 3, 5)
				.animate("walk_down", 0, 3, 2)
				//change direction when a direction change event is received
				.bind("NewDirection",
					function (direction) {						
						if (direction.x < 0) {
							PLAYERDIRECTION = "left";
							if (!this.isPlaying("walk_left"))
								this.stop().animate("walk_left", 1, -1);
						}
						if (direction.x > 0) {
							PLAYERDIRECTION = "right";
							if (!this.isPlaying("walk_right"))
								this.stop().animate("walk_right", 1, -1);
						}
						if (direction.y < 0) {
							PLAYERDIRECTION = "up";
							if (!this.isPlaying("walk_up"))
								this.stop().animate("walk_up", 1, -1);
						}
						if (direction.y > 0) {
							PLAYERDIRECTION = "down";
							if (!this.isPlaying("walk_down"))
								this.stop().animate("walk_down", 1, -1);
						}
						if(!direction.x && !direction.y) {
							this.stop();
						} 
				})
				.bind('Moved', function(from) {
					if (this.has("InventoryDisplay") && this.isInvOpen()) {
						this.attr({x: from.x, y:from.y});
					}
					if (PLAYER.idle) {
						this.attr({x: from.x, y:from.y});
					}
					if(this.hit('solid')){
						this.attr({x: from.x, y:from.y});
					}
					if(this.x < 0 || this.y < 0 || this.x >= (MAPWIDTH-1) * TILESIZE || this.y >= (MAPHEIGHT - 1) * TILESIZE ){
						this.attr({x: from.x, y:from.y});
					}
				});
				
				return this;
		}
	});	