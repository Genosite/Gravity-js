Planet = function(x, y, m, color) {
  Entity.call(this, x, y, m, color);
}

for (var element in Entity.prototype ) {
  Planet.prototype[element] = Entity.prototype[element];
}

Planet.prototype.run = function() {
  return true;
}
Planet.prototype.draw = function() {
}