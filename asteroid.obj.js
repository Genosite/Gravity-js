var Asteroid = function(x, y, m, color) {
  Entity.call(this, x, y, m, color);
  this.vx = 0;
  this.vy = 0;
  this.cos = NaN;
  this.sin = NaN;
}

Asteroid.prototype = Entity.prototype;

Asteroid.prototype.run = function(world)
{
  var vdist, d_x, d_y, tan, cos, sin, force_grav, d_angle, _this;

  _this = this;

  if (typeof world != "object" || !(world instanceof World) || world.pause)
    return false;

  world.entities.planet.forEach(function(elem, index) {
    vdist = Utils.dist(_this, elem);
    d_x = -_this.x + elem.x;
    d_y = -_this.y + elem.y;
    tan = d_x / d_y;
    cos = d_x / vdist;
    sin = d_y / vdist;

    force_grav = world.g * (_this.m * elem.m) / Math.pow(vdist, 2);

    _this.vx += cos * force_grav;
    _this.vy += sin * force_grav;
  })

  d_x = -this.x + (this.x + this.vx);
  d_y = -this.y + (this.y + this.vy);

  vdist = Math.sqrt(Math.pow(d_x, 2) + Math.pow(d_y, 2));

  cos = d_x / vdist;
  sin = d_y / vdist;

  d_angle = 0;
  if (this.cos != NaN)
    d_angle = Math.acos(cos) - Math.acos(this.cos);

  this.cos = cos;
  this.sin = sin;
  this.x += this.vx;
  this.y += this.vy;
  return true;
}