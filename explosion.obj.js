var Explosion = function () {
  Entity.call(this);
}

Explision.prototype.run = function() {
  this.r = this.r - 1;
  return true;
};