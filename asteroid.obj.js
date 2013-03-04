var Asteroid = function(x, y, m, color) {
  Entity.call(this, x, y, m, color);
  this.vx = 0;
  this.vy = 0;
  this.cos = NaN;
  this.sin = NaN;
}

for (var element in Entity.prototype ) {
  Asteroid.prototype[element] = Entity.prototype[element];
}

Asteroid.prototype.run = function(world)
{
  var vdist, d_x, d_y, tan, cos, sin, force_grav, _this, len, elem, a

  _this = this

  if (typeof world != "object" || !(world instanceof World) || world.pause)
    return false

  len = world.entities.length
  elem = world.entities
  for (var i = 0; i < len; i++) {
    if (elem[i] == undefined || elem[i] instanceof Planet)
      continue
    a = _this.r + elem[i].r
    if (elem[i].x < 0 || elem[i].y < 0 || elem[i].x > 2000 || elem[i].y > 2000)
      {
        elem[i] = undefined
        continue
      }
    vdist = Utils.dist(_this, elem[i])
    if (vdist == 0 || vdist >= a)
      continue
    pen = vdist - a
    cos = (-_this.x + elem[i].x) / vdist
    sin = (-_this.y + elem[i].y) / vdist
    _this.vx = _this.vx * 0.5 + cos * pen 
    _this.vy = _this.vy * 0.5 + sin * pen
  }

  for (var i = 0; i < len; i++) {
    if (elem[i] == undefined || elem[i] instanceof Asteroid)
      continue
    vdist = Utils.dist(_this, elem[i])
    if (vdist == 0)
      continue
    d_x = -_this.x + elem[i].x;
    d_y = -_this.y + elem[i].y;
    cos = d_x / vdist;
    sin = d_y / vdist;
    force_grav = world.g * (_this.m * elem[i].m) / Math.pow(vdist, 2);

    _this.vx = _this.vx + cos * force_grav;
    _this.vy = _this.vy + sin * force_grav;
    pen = vdist - (_this.r + elem[i].r);
    if (pen < 0)
    {
      _this.vx = _this.vx * 0.8 + (cos * pen);
      _this.vy = _this.vy * 0.8 + (sin * pen);
    }
  }

  d_x = -this.x + (this.x + this.vx);
  d_y = -this.y + (this.y + this.vy);

  vdist = Math.sqrt(d_x * d_x + d_y * d_y);

  this.cos = d_x / vdist;
  this.sin = d_y / vdist;
  this.x = this.x + this.vx;
  this.y = this.y + this.vy;
  return true;
}