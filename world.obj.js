var World = function()
{
  this.entities = [ ];
  this.debug = false;
  this.pause = false;
  this.fpsMax = 60;
  this.g = 1;
  this.canvas = "";
  this.context = "";
  this.mousedown = false;
}

var n_tmp;

World.prototype.init = function() {

  var _this;

  _this = this
  n_tmp = undefined

  this.canvas = document.getElementById("game");
  this.canvas.width = document.documentElement.clientWidth;
  this.canvas.height = document.documentElement.clientHeight;
  this.context = this.canvas.getContext("2d");

  // Events handlers

  // disable touchmove default behavior for scrolling
  document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false);

  var mouseUp = function(e) {
    var tmp = new Asteroid(
        n_tmp.x
      , n_tmp.y
      , 15
      , "#0f0"
      )
    var tmp_x = (n_tmp.x - n_tmp.xp)
    var tmp_y = (n_tmp.y - n_tmp.yp)
    var dist = Math.min(Math.sqrt(tmp_x * tmp_x + tmp_y * tmp_y), 50);
    if (dist != 0)
    {
      tmp.vx = tmp_x / dist * (dist / 10)
      tmp.vy = tmp_y / dist * (dist / 10)
    }
    _this.entities.push(tmp);
    _this.mousedown = false
    n_tmp = undefined 
 };
  var mouseDown = function(e) { 
    _this.mousedown = true;
    n_tmp = {
      x : e.clientX,
      y : e.clientY,
      xp : undefined,
      yp : undefined
    }
  };
  var mouseMove = function(e) {
    if (_this.mousedown && n_tmp)
    {
      n_tmp.xp = e.clientX
      n_tmp.yp = e.clientY
    }
  }
  var touchMove = function(e) {
    if (_this.mousedown && n_tmp)
    {
      n_tmp.xp = e.touches[0].pageX
      n_tmp.yp = e.touches[0].pageY
    }
  }

  // Generating planets
  for (var i = 0; i < 1; i++)
  {
    var tmp = new Planet(
        Math.floor(Math.random() * this.canvas.width) % (this.canvas.width - 200) + 100
      , Math.floor(Math.random() * this.canvas.height) % (this.canvas.height - 200) + 100
      , Math.floor(Math.random() * 100) + 20
      , "#f00"
    );
    this.entities.push(tmp);
  }

  for (var i = 0; i < 3; i++)
  {
    var tmp = new Planet(
        Math.floor(Math.random() * this.canvas.width) % (this.canvas.width - 200) + 100
      , Math.floor(Math.random() * this.canvas.height) % (this.canvas.height - 200) + 100
      , Math.floor(Math.random() * -100) - 20
      , "#f0f"
    );
    this.entities.push(tmp);
  }

  // Generating asteroids
  for (var i = 0; i < 20; i++)
  {
     var tmp = new Asteroid(
        Math.floor(Math.random() * this.canvas.width) % (this.canvas.width - 200) + 100
      , Math.floor(Math.random() * this.canvas.height) % (this.canvas.height - 200) + 100
      , 15
      , "#ff0"
    );
    this.entities.push(tmp);
  }

  this.canvas.addEventListener("mousedown", mouseDown);
  this.canvas.addEventListener("mouseup", mouseUp);
  this.canvas.addEventListener("mousemove", mouseMove);
  this.canvas.addEventListener("touchstart", mouseDown);
  this.canvas.addEventListener("touchend", mouseUp);
  this.canvas.addEventListener("touchmove", touchMove);

  this.loop();
}

World.prototype.loop = function() {
  var _this;

  _this = this;

  this.context.fillStyle = "#000";
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

  if (n_tmp)
  {
    this.context.save()
    this.context.strokeStyle = "rgb(0,0,255)"
    this.context.beginPath()
    this.context.moveTo(n_tmp.x, n_tmp.y)
    this.context.lineTo(n_tmp.xp, n_tmp.yp)
    this.context.stroke()
    this.context.closePath()
    this.context.restore()
  }

  this.entities.forEach(function(elem, index) {
    if (elem != undefined)
    {
      elem.run(_this); 
      elem.draw(_this.context);
    }
  });
  setTimeout(function() {
      _this.loop();
    }, 1000 / this.fpsMax
  );
  return true;
}