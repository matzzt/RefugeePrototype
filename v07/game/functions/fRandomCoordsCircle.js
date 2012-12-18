function randomCoordsCircle (cx, cy, radius, lastAngle) {  
  var angle = 2*Math.PI*Math.random();
  while (lastAngle != undefined && (Math.abs(lastAngle - angle)) < 45)
	angle = 2*Math.PI*Math.random();
	
  return {
	angle: angle,
    x: (radius * Math.cos(angle) + cx),
    y: (radius * Math.sin(angle) + cy)
  }
};