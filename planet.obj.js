Planet = function(x, y, m, color) {
  Entity.call(this, x, y, m, color);
}

Planet.prototype = Entity.prototype;

Planet.prototype.run = function() {
  return true;
}