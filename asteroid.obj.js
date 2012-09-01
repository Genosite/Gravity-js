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
  var vdist, d_x, d_y, tan, cos, sin, force_grav, _this;

  _this = this;

  if (typeof world != "object" || !(world instanceof World) || world.pause)
    return false;

  world.entities.asteroid.forEach(function(elem, index) {
    vdist = Utils.dist(_this, elem);
    if (vdist == 0 || vdist > 10)
      return false;
    pen = vdist - (_this.r + elem.r);
    if (pen < 0)
    {
      d_x = -_this.x + elem.x;
      d_y = -_this.y + elem.y;
      cos = d_x / vdist;
      sin = d_y / vdist;
      _this.x = _this.x + cos * pen;
      _this.y = _this.y + sin * pen;
      _this.vx = _this.vx + cos * pen;
      _this.vy = _this.vy + sin * pen;
      _this.vx = _this.vx * 0.5;
      _this.vy = _this.vy * 0.5;
    }
    return true;
  });

  world.entities.planet.forEach(function(elem, index) {
    vdist = Utils.dist(_this, elem);
    if (vdist == 0)
      return false;
    d_x = -_this.x + elem.x;
    d_y = -_this.y + elem.y;
    tan = d_x / d_y;
    cos = d_x / vdist;
    sin = d_y / vdist;
    force_grav = world.g * (_this.m * elem.m) / Math.pow(vdist, 2);

    _this.vx = _this.vx + cos * force_grav;
    _this.vy = _this.vy + sin * force_grav;
    pen = vdist - (_this.r + elem.r);
    if (pen < 0)
    {
      _this.x = _this.x + cos * pen;
      _this.y = _this.y + sin * pen;
      _this.vx = _this.vx + cos * pen;
      _this.vy = _this.vy + sin * pen;
      _this.vx = _this.vx * 0.8;
      _this.vy = _this.vy * 0.8;
    }
  });

  d_x = -this.x + (this.x + this.vx);
  d_y = -this.y + (this.y + this.vy);

  vdist = Math.sqrt(d_x * d_x + d_y * d_y);

  this.cos = d_x / vdist;
  this.sin = d_y / vdist;
  this.x = this.x + this.vx;
  this.y = this.y + this.vy;
  return true;
}