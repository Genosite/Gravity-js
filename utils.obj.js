var Utils = {
  dist : function (pl, dps) {
    return (Math.sqrt(Math.pow(pl.x - dps.x, 2) + Math.pow(pl.y - dps.y, 2)));
  }
}