var World = function()
{
  this.entities = [ ];
  this.entitiesLength = 0;
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
  this.canvas.width = 800;//document.documentElement.clientWidth;
  this.canvas.height = 600;//document.documentElement.clientHeight;
  this.context = this.canvas.getContext("2d");
  this.image = this.context.createImageData(this.canvas.width, this.canvas.height);
  this.camera = document.querySelector("#video-frame");


  // Events handlers

  // disable touchmove default behavior for scrolling
  document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false);

  /*for (var i = 0; i < 3; i++)
  {
    var tmp = new Planet(
        Math.floor(Math.random() * this.canvas.width) % (this.canvas.width - 200) + 100
      , Math.floor(Math.random() * this.canvas.height) % (this.canvas.height - 200) + 100
      , Math.floor(Math.random() * -100) - 20
      , "#f0f"
    );
    this.entities.push(tmp);
  }*/

  // Generating asteroids
  for (var i = 0; i < 0; i++)
  {
     var tmp = new Asteroid(
        Math.floor(Math.random() * this.canvas.width) % (this.canvas.width - 200) + 100
      , Math.floor(Math.random() * this.canvas.height) % (this.canvas.height - 200) + 100
      , 15
      , "#f0f"
    );
    this.entities.push(tmp);
  }

  this.entitiesLength = this.entities.length;

  this.loop();
}

World.prototype.getBlob = function(blobArray)
{
  var _visited, _isSafe, _this, _count, _offset;

  _this = this;
  _count = 0;
  _isSafe = function(x, y)
  {
    _offset = (y * this.canvas.width + x);
    return (x > 0 && x < _this.canvas.width &&
            y > 0 && y < _this.canvas.height &&
            blobArray[_offset] && !visitedArray[_offset])
  }

  DFS = function(x, y)
  {
    _offset = (y * this.canvas.width + x);
    rowNbr = [-1, -1, -1,  0, 0,  1, 1, 1];
    colNbr = [-1,  0,  1, -1, 1, -1, 0, 1];

    _visited[_offset] = true;
    for (var i = 0; i < 8; i++)
      if (_isSafe(x + rowNbr[i], y + colNbr[i]))
        this(x + rowNbr[i], y + colNbr[i]);
  }

  _visited = new Array(this.canvas.width * this.canvas.height);

  for (var x = 0; x < this.canvas.width; x++)
  {
    for (var y = 0; y < this.canvas.height; y++)
    {
      DFS(x, y);
      count++;
    }
  }
  console.log(count);
}

World.prototype.loop = function() {
  var _this, _pixel, _colorData, _nPixel, _maxtrixDepth;

  _this = this;
  _maxtrixDepth = new Array(this.canvas.width * this.canvas.height);

  this.context.fillStyle = "#f0f";
  //this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.drawImage(this.camera, 0, 0, this.canvas.width, this.canvas.height);
  _pixels = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
  _colorData = _pixels.data;

  for (var x = 0; x < this.canvas.width; x+=12)
  {
    for(var y = 0; y < this.canvas.height; y+=12)
    {
      var offset = (y * this.canvas.width + x) * 4;
      r = _colorData[offset];
      g = _colorData[offset+1];
      b = _colorData[offset+2];

      gray = r * 0.2126 + g * 0.7152 + b * 0.0722;
      if (gray > 254)
        {
          this.context.fillRect(x, y, 2, 2);
          _maxtrixDepth[offset] = 1;
        }
    }
  }
  this.getBlob(_maxtrixDepth);


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
      elem.life++;
      elem.run(_this);
      elem.draw(_this.context);
    }
  });
  requestAnimationFrame(function() {
    _this.loop();
  });
  return true;
}