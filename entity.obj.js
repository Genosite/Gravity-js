var Entity =  function(x, y, m, color) {
  Point.call(this, x, y);
  this.m = m;
  this.r = Math.abs(this.m) / 2;
  this.color = color;
  this.life = 0;
  this.onclick = function() { };
}

Entity.prototype.draw = function(context, image) {
  if (typeof context != "object" || !(context instanceof CanvasRenderingContext2D))
    return false;

  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.x, this.y, Math.abs(this.m) / 2, 0, 2 * Math.PI, false);
  context.fill();
  context.closePath();
  return true;
}