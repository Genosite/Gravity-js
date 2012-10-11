var World = function()
{
  this.entities = [ ];
  this.debug = false;
  this.pause = false;
  this.fpsMax = 25;
  this.g = 1;
  this.canvas = "";
  this.context = "";
  this.mousedown = false;
  this.quadtree = null;
}

World.prototype.init = function() {

  var _this;

  _this = this;

  this.canvas = document.getElementById("game");
  this.canvas.width = document.documentElement.clientWidth;
  this.canvas.height = document.documentElement.clientHeight;

  var bounds = {
    x: 0,
    y: 0,
    width: this.canvas.width,
    height: this.canvas.height
  }

  this.quadtree = new QuadTree(bounds, true);
  this.context = this.canvas.getContext("2d");

  // Events handlers

  // disable touchmove default behavior for scrolling
  document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false);

  var mouseUp   = function(e) { _this.mousedown = false; };
  var mouseDown = function(e) { _this.mousedown = true; };
  var mouseMove = function(e) {
    if (_this.mousedown)
    {
      var tmp = new Asteroid(
        e.clientX
      , e.clientY
      , Math.floor(Math.random() * 10) + 2
      , "#ff0"
      );
      _this.entities.push(tmp);
      _this.quadtree.insert(tmp);
    }
  }
  var touchMove = function(e) {
    if (_this.mousedown)
    {
      // for each touch events (for each finger at the same time)
      for (var i = 0; i < event.touches.length; i++) {
        var tmp = new Asteroid(
          e.touches[i].pageX
        , e.touches[i].pageY
        , Math.floor(Math.random() * 10) + 2
        , "#ff0"
        );
        _this.entities.push(tmp);
        _this.quadtree.insert(tmp);
      }
    }
  }

  // Generating planets
  for (var i = 0; i < 5; i++)
  {
    var tmp = new Planet(
        Math.floor(Math.random() * this.canvas.width) % (this.canvas.width - 200) + 100
      , Math.floor(Math.random() * this.canvas.height) % (this.canvas.height - 200) + 100
      , Math.floor(Math.random() * 100) + 20
      , "#f00"
    );
    this.entities.push(tmp);
    _this.quadtree.insert(tmp);
  }

  for (var i = 0; i < 5; i++)
  {
    var tmp = new Planet(
        Math.floor(Math.random() * this.canvas.width) % (this.canvas.width - 200) + 100
      , Math.floor(Math.random() * this.canvas.height) % (this.canvas.height - 200) + 100
      , Math.floor(Math.random() * -100) - 20
      , "#f0f"
    );
    this.entities.push(tmp);
    _this.quadtree.insert(tmp);
  }

  // Generating asteroids
  for (var i = 0; i < 50; i++)
  {
     var tmp = new Asteroid(
        Math.floor(Math.random() * this.canvas.width) % (this.canvas.width - 200) + 100
      , Math.floor(Math.random() * this.canvas.height) % (this.canvas.height - 200) + 100
      , Math.floor(Math.random() * 10) + 2
      , "#ff0"
    );
    this.entities.push(tmp);
    _this.quadtree.insert(tmp);
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

  this.entities.forEach(function(elem, index) {
    _this.quadtree.clear();
    _this.quadtree.insert(_this.entities);
    elem.run(_this);
    elem.draw(_this.context);
  });
  setTimeout(function() {
      _this.loop();
    }, 1000 / this.fpsMax
  );
  return true;
}